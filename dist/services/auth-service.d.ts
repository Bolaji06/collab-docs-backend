import type { AuthResponse } from '../types/index.js';
declare class AuthService {
    private generateAccessToken;
    private generateRefreshToken;
    register(email: string, username: string, password: string): Promise<{
        message: string;
    }>;
    loginWithGoogle(accessToken: string): Promise<AuthResponse>;
    verifyEmail(email: string, otp: string): Promise<AuthResponse>;
    resendOTP(email: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<AuthResponse>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken?: string;
    }>;
    getCurrentUser(userId: string): Promise<{
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        onboardingCompleted: boolean;
    }>;
    updateProfile(userId: string, data: {
        username?: string;
        avatar?: string;
    }): Promise<{
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        isPremium: boolean;
        onboardingCompleted: boolean;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, email: string, newPassword: string): Promise<{
        message: string;
    }>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth-service.d.ts.map