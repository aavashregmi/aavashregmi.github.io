import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request - Aavash Regmi Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h2 style="color: #d4af37; margin: 0;">Password Reset</h2>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <p style="color: #333; font-size: 16px;">Hi ${email},</p>
          <p style="color: #555; font-size: 14px;">You requested to reset your password. Please use the verification code below:</p>
          <div style="background: #000; color: #d4af37; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h3 style="margin: 0; font-size: 24px; letter-spacing: 2px;">${resetToken.substring(0, 6).toUpperCase()}</h3>
          </div>
          <p style="color: #555; font-size: 14px;">This code expires in 1 hour.</p>
          <p style="color: #555; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
        <div style="background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="margin: 0; font-size: 12px;">© 2026 Aavash Regmi. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  return transporter.sendMail(mailOptions);
};

export const sendContactConfirmationEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Message Received - Aavash Regmi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h2 style="color: #d4af37; margin: 0;">Thank You for Reaching Out!</h2>
        </div>
        <div style="padding: 30px; background: #f5f5f5;">
          <p style="color: #333; font-size: 16px;">Hi ${name},</p>
          <p style="color: #555; font-size: 14px;">I've received your message and will get back to you as soon as possible.</p>
          <p style="color: #555; font-size: 14px;">Thank you for your interest in connecting with me!</p>
        </div>
        <div style="background: #1a1a1a; color: #d4af37; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="margin: 0; font-size: 12px;">© 2026 Aavash Regmi. All rights reserved.</p>
        </div>
      </div>
    `
  };
  
  return transporter.sendMail(mailOptions);
};
