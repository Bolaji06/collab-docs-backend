declare class AuthController {
    register: (req: any, res: any, next: any) => void;
    verifyEmail: (req: any, res: any, next: any) => void;
    resendOTP: (req: any, res: any, next: any) => void;
    login: (req: any, res: any, next: any) => void;
    refreshToken: (req: any, res: any, next: any) => void;
    getCurrentUser: (req: any, res: any, next: any) => void;
    updateProfile: (req: any, res: any, next: any) => void;
    changePassword: (req: any, res: any, next: any) => void;
    forgotPassword: (req: any, res: any, next: any) => void;
    resetPassword: (req: any, res: any, next: any) => void;
    logout: (req: any, res: any, next: any) => void;
    googleLogin: (req: any, res: any, next: any) => void;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=auth-controller.d.ts.map