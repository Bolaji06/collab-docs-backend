export declare const sendResetPasswordEmail: (to: string, resetLink: string) => Promise<void>;
export declare const sendOTPEmail: (to: string, otp: string) => Promise<void>;
export declare const sendNudgeEmail: (to: string, senderName: string, documentTitle: string, documentId: string) => Promise<void>;
export declare const sendMentionEmail: (to: string, senderName: string, documentTitle: string, documentId: string) => Promise<void>;
export declare const sendShareEmail: (to: string, senderName: string, documentTitle: string, documentId: string, role: string) => Promise<void>;
//# sourceMappingURL=emails.d.ts.map