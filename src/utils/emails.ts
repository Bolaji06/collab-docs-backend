
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (to: string, resetLink: string) => {
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

export const sendOTPEmail = async (to: string, otp: string) => {
  const sendEmail = await resend.emails.send({
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
  console.log(sendEmail)
};
