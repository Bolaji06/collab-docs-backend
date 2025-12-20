
import type { Request, Response } from 'express';
import authService from '../services/auth-service.js';
import { asyncHandler } from '../utils/helper.js';

class AuthController {
    // Register new user
    register = asyncHandler(async (req: Request, res: Response) => {
        const { email, username, password } = req.body;

        const result = await authService.register(email, username, password);

        res.status(201).json({
            success: true,
            message: result.message,
        });
    });

    // Verify Email
    verifyEmail = asyncHandler(async (req: Request, res: Response) => {
        const { email, otp } = req.body;

        const result = await authService.verifyEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            data: result,
        });
    });

    // Resend OTP
    resendOTP = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        const result = await authService.resendOTP(email);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    });

    // Login user
    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    });

    // Refresh access token
    refreshToken = asyncHandler(async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        const result = await authService.refreshToken(refreshToken);

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: result,
        });
    });

    // Get current user
    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const user = await authService.getCurrentUser(req.user!.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    });

    // Update profile
    updateProfile = asyncHandler(async (req: Request, res: Response) => {
        const { username, avatar } = req.body;

        const user = await authService.updateProfile(req.user!.id, {
            username,
            avatar,
        });

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user,
        });
    });

    // Change password
    changePassword = asyncHandler(async (req: Request, res: Response) => {
        const { currentPassword, newPassword } = req.body;

        const result = await authService.changePassword(
            req.user!.id,
            currentPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: result.message,
        });
    });

    // Forgot password
    forgotPassword = asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        const result = await authService.forgotPassword(email);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    });

    // Reset password
    resetPassword = asyncHandler(async (req: Request, res: Response) => {
        const { token, password, email } = req.body;

        await authService.resetPassword(token, password, email);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
    });

    // Logout (client-side token removal, optional backend blacklist)
    logout = asyncHandler(async (req: Request, res: Response) => {
        // In a more sophisticated system, you might:
        // 1. Blacklist the token in Redis
        // 2. Clear any session data

        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    });

    // Google Login
    googleLogin = asyncHandler(async (req: Request, res: Response) => {
        const { accessToken } = req.body;
        const result = await authService.loginWithGoogle(accessToken);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    });
}

export default new AuthController();