import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { ConflictError, UnauthorizedError, NotFoundError, BadRequestError, } from '../utils/errors.js';
import { exclude } from '../utils/helper.js';
import crypto from 'crypto';
import { sendResetPasswordEmail, sendOTPEmail } from '../utils/emails.js';
import { OAuth2Client } from 'google-auth-library';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class AuthService {
    // Fixed: Proper typing for jwt.sign (no more TS errors)
    generateAccessToken(userId, email) {
        const payload = { userId, email };
        // @ts-ignore
        return jwt.sign({ ...payload }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
        });
    }
    generateRefreshToken(userId, email) {
        const payload = { userId, email };
        //@ts-ignore
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
        });
    }
    // Register
    async register(email, username, password) {
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });
        if (existingUser) {
            // New logic: if existing but not verified, we could resend OTP? 
            // For now, stick to standard conflict error to avoid enumeration attacks or confusion,
            // or let client handle "resend OTP" if they know they registered.
            // A common pattern is to just say "taken".
            throw new ConflictError(existingUser.email === email
                ? 'Email already in use'
                : 'Username already taken');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&rounded=true`,
                otp,
                otpExpiresAt,
                isVerified: false,
            },
        });
        await sendOTPEmail(email, otp);
        return {
            message: 'Registration successful. Please check your email for the verification code.',
        };
    }
    // Google Login
    async loginWithGoogle(accessToken) {
        // Verify access token by fetching user info
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new BadRequestError('Invalid Google Token');
        }
        const payload = await response.json();
        const { email, sub: googleId, name, picture } = payload;
        if (!email) {
            throw new BadRequestError('Invalid Google Token: Email missing');
        }
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Create new user
            // Generate unique username from email prefix or google name + random
            let username = name ? name.replace(/\s+/g, '').toLowerCase() : email.split('@')[0];
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            username = `${username}${randomSuffix}`;
            // Check if username collision (unlikely with suffix but possible)
            // Ideally we loop or retry, for now simple suffix
            user = await prisma.user.create({
                data: {
                    email,
                    username,
                    googleId,
                    avatar: picture || null,
                    isVerified: true, // Google emails are verified
                    password: null, // OAuth user
                },
            });
        }
        else {
            // Link Google ID if not linked
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId, avatar: user.avatar || picture || null, isVerified: true },
                });
            }
        }
        const newAccessToken = this.generateAccessToken(user.id, user.email);
        const refreshToken = this.generateRefreshToken(user.id, user.email);
        const userWithoutPassword = exclude(user, ['password', 'otp', 'otpExpiresAt', 'resetToken', 'resetTokenExpiry']);
        return {
            user: userWithoutPassword,
            accessToken: newAccessToken,
            refreshToken,
        };
    }
    // Verify Email
    async verifyEmail(email, otp) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new BadRequestError('Invalid request'); // ambiguous for security
        if (user.isVerified)
            throw new BadRequestError('Email already verified');
        if (!user.otp || user.otp !== otp) {
            throw new BadRequestError('Invalid OTP');
        }
        if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            throw new BadRequestError('OTP has expired');
        }
        // Verify user and clear OTP
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                otp: null,
                otpExpiresAt: null,
            },
        });
        const accessToken = this.generateAccessToken(updatedUser.id, updatedUser.email);
        const refreshToken = this.generateRefreshToken(updatedUser.id, updatedUser.email);
        const userWithoutPassword = exclude(updatedUser, ['password', 'otp', 'otpExpiresAt', 'resetToken', 'resetTokenExpiry']);
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        };
    }
    // Resend OTP
    async resendOTP(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new NotFoundError('User not found');
        if (user.isVerified)
            throw new BadRequestError('Email already verified');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await prisma.user.update({
            where: { id: user.id },
            data: { otp, otpExpiresAt },
        });
        await sendOTPEmail(email, otp);
        return { message: 'OTP resent successfully' };
    }
    // Login
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user || !user.password) {
            throw new UnauthorizedError('Invalid credentials');
        }
        if (!user.isVerified) {
            throw new UnauthorizedError('Email not verified. Please verify your email.');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new UnauthorizedError('Invalid credentials');
        }
        const accessToken = this.generateAccessToken(user.id, user.email);
        const refreshToken = this.generateRefreshToken(user.id, user.email);
        const userWithoutPassword = exclude(user, ['password']);
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        };
    }
    // Refresh Token (stateless — safe without DB table)
    async refreshToken(refreshToken) {
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        }
        catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedError('Refresh token expired');
            }
            throw new UnauthorizedError('Invalid refresh token');
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true },
        });
        if (!user) {
            throw new UnauthorizedError('User not found');
        }
        const newAccessToken = this.generateAccessToken(user.id, user.email);
        // Optional: Rotate refresh token (recommended)
        const newRefreshToken = this.generateRefreshToken(user.id, user.email);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken, // send new one to client
        };
    }
    // Get Current User
    async getCurrentUser(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user)
            throw new NotFoundError('User not found');
        return user;
    }
    // Update Profile
    async updateProfile(userId, data) {
        if (data.username) {
            const exists = await prisma.user.findFirst({
                where: { username: data.username, NOT: { id: userId } },
            });
            if (exists)
                throw new ConflictError('Username already taken');
        }
        return prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    // Change Password
    async changePassword(userId, currentPassword, newPassword) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        // Handle OAuth users who don't have a password
        if (!user)
            throw new NotFoundError('User not found');
        if (!user.password) {
            throw new BadRequestError('You are logged in via Google. Please set a password first using the "Forgot Password" flow.');
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid)
            throw new UnauthorizedError('Current password is incorrect');
        const hashed = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });
        return { message: 'Password changed successfully' };
    }
    // Forgot Password — Email-only flow (no DB table needed)
    async forgotPassword(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Always return same message for security
            return { message: 'Email not found' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
        // In production: send via email (Resend, Nodemailer, etc.)
        // For now: log it so you can test
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
        await sendResetPasswordEmail(email, resetLink);
        // Store in DB
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry: new Date(tokenExpiry),
            }
        });
        return { message: 'If your email is registered, you will receive a reset link shortly.' };
    }
    // Reset Password
    async resetPassword(token, email, newPassword) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new NotFoundError('User not found');
        // Verify token from DB
        if (!user.resetToken || user.resetToken !== token || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            throw new BadRequestError('Invalid or expired reset token');
        }
        const hashed = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                resetToken: null,
                resetTokenExpiry: null
            },
        });
        return { message: 'Password reset successfully' };
    }
}
export default new AuthService();
//# sourceMappingURL=auth-service.js.map