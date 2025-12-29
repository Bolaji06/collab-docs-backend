import { Router } from 'express';
import authController from '../controllers/auth-controller.js';
import { validate } from '../middleware/validator.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rate-limiter.js';
import { registerSchema, loginSchema, refreshTokenSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, resendOTPSchema, } from '../utils/validators.js';
const router = Router();
// Public routes
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/google', authController.googleLogin);
router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/resend-otp', authLimiter, validate(resendOTPSchema), authController.resendOTP);
router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/profile', authenticate, authController.updateProfile);
router.put('/change-password', authenticate, authController.changePassword);
router.post('/logout', authenticate, authController.logout);
router.post('/onboarding/complete', authenticate, authController.completeOnboarding);
export default router;
//# sourceMappingURL=auth.route.js.map