// /server/utils/sendEmail.js
const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const sendEmail = async (options) => {
  const errors = [];

  // ─────────────────────────────────────────────
  // Option A: Try Resend API
  // ─────────────────────────────────────────────
  const resendKey = (process.env.RESEND_API_KEY || "").trim();
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);

      // Resend free plan only allows onboarding@resend.dev as sender
      const from = `${process.env.FROM_NAME || "Sky Tech Makers"} <onboarding@resend.dev>`;

      const payload = {
        from,
        to: [options.email],
        subject: options.subject,
        text: options.message,
        html:
          options.html ||
          `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4f46e5;">Sky Tech Makers</h2>
            <p style="font-size: 16px;">${options.message.replace(/\n/g, "<br/>")}</p>
          </div>`,
      };

      if (options.replyTo) payload.reply_to = options.replyTo;

      const response = await resend.emails.send(payload);

      if (response?.error) {
        const msg = response.error.message || JSON.stringify(response.error);
        console.warn(`⚠️ [Resend API Error]: ${msg}`);
        errors.push(`Resend: ${msg}`);
        // Fall through to Nodemailer
      } else {
        console.log(
          `✅ [Resend Success] Email dispatched to ${options.email}. ID: ${response?.data?.id || "sent"}`
        );
        return response;
      }
    } catch (resendErr) {
      console.warn("⚠️ [Resend Exception]:", resendErr?.message || resendErr);
      errors.push(`Resend exception: ${resendErr?.message}`);
      // Fall through to Nodemailer
    }
  }

  // ─────────────────────────────────────────────
  // Option B: Nodemailer / Gmail SMTP fallback
  // ─────────────────────────────────────────────
  const mailUser = (process.env.EMAIL_USERNAME || process.env.SMTP_MAIL || "").trim();
  const mailPass = (process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || "").trim();
  const fromEmail = (process.env.EMAIL_FROM || mailUser).trim();

  if (!mailUser || !mailPass) {
    // No email provider configured – log and return gracefully (do NOT throw)
    console.log("=================================================");
    console.log("[Email Notice] No email provider configured in environment variables.");
    console.log(`[Email Simulation] To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content:\n${options.message}`);
    console.log("=================================================");
    return { simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailMessage = {
      from: `${process.env.FROM_NAME || "Sky Tech Makers"} <${fromEmail}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html:
        options.html ||
        `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">Sky Tech Makers</h2>
          <p style="font-size: 16px;">${options.message.replace(/\n/g, "<br/>")}</p>
        </div>`,
    };

    if (options.replyTo) mailMessage.replyTo = options.replyTo;

    const info = await transporter.sendMail(mailMessage);
    console.log(
      `✅ [Nodemailer Success] Email sent to ${options.email}. MessageId: ${info.messageId}`
    );
    return info;
  } catch (nodemailerErr) {
    console.error("❌ [Nodemailer Error]:", nodemailerErr.message || nodemailerErr);
    errors.push(`Nodemailer: ${nodemailerErr.message}`);

    // ── Final safety net: throw a clean error so authController
    //    can clear the reset token and return a proper 500 message
    throw new Error(`Email delivery failed: ${errors.join(" | ")}`);
  }
};

module.exports = sendEmail;
