import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY || 're_17UexMfu_7RPAy3zPsnfoiNdc7XN3W9hp');
export const sendResetPasswordEmail = async (to, resetLink) => {
    await resend.emails.send({
        from: "CollabDocs <onboarding@resend.dev>",
        to,
        subject: 'Reset your CollabDocs password',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2563eb;">Reset Your Password</h2>
        <p>We received a request to reset your CollabDocs password.</p>
        <p>Click the button below to set a new password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          This link expires in 15 minutes.<br>
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
    });
};
export const sendOTPEmail = async (to, otp) => {
    await resend.emails.send({
        from: "CollabDocs <onboarding@resend.dev>",
        to,
        subject: 'Verify your email code',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2563eb;">Verify Your Email</h2>
        <p>Use the code below to verify your email address:</p>
        <div style="font-size: 24px; font-weight: bold; background: #f3f4f6; padding: 12px; text-align: center; border-radius: 6px; letter-spacing: 2px;">
          ${otp}
        </div>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          This code expires in 15 minutes.<br>
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
    });
};
export const sendNudgeEmail = async (to, senderName, documentTitle, documentId) => {
    const docLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/doc/${documentId}`;
    await resend.emails.send({
        from: "CollabDocs Nudge <onboarding@resend.dev>",
        to,
        subject: `Nudge: ${senderName} is waiting for you in "${documentTitle}"`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #8b5cf6;">Alignment Nudge</h2>
        <p><strong>${senderName}</strong> is waiting for your alignment on decisions or tasks in <strong>"${documentTitle}"</strong>.</p>
        <p>Your input is critical to moving the team forward. Jump back in to resolve the pending items:</p>
        <a href="${docLink}" style="display: inline-block; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Open Document
        </a>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          You are receiving this because a teammate sent you an explicit nudged for alignment.
        </p>
      </div>
    `,
    });
};
export const sendMentionEmail = async (to, senderName, documentTitle, documentId) => {
    const docLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/doc/${documentId}`;
    await resend.emails.send({
        from: "CollabDocs <onboarding@resend.dev>",
        to,
        subject: `${senderName} mentioned you in "${documentTitle}"`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #6366f1;">New Mention</h2>
        <p><strong>${senderName}</strong> mentioned you in a document: <strong>"${documentTitle}"</strong>.</p>
        <p>Click below to see the context and reply:</p>
        <a href="${docLink}" style="display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          View Mention
        </a>
      </div>
    `,
    });
};
export const sendShareEmail = async (to, senderName, documentTitle, documentId, role) => {
    const docLink = `${process.env.CLIENT_URL || 'http://localhost:5173'}/doc/${documentId}`;
    await resend.emails.send({
        from: "CollabDocs <onboarding@resend.dev>",
        to,
        subject: `${senderName} shared "${documentTitle}" with you`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #10b981;">Shared with you</h2>
        <p><strong>${senderName}</strong> invited you to collaborate on <strong>"${documentTitle}"</strong> as a <strong>${role}</strong>.</p>
        <p>Click below to access the document:</p>
        <a href="${docLink}" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Access Document
        </a>
      </div>
    `,
    });
};
//# sourceMappingURL=emails.js.map