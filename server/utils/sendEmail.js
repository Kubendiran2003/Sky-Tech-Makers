// /server/utils/sendEmail.js
const nodemailer = require("nodemailer");
const { Resend } = require("resend");

/**
 * sendEmail(options)
 *
 * options.email        – recipient address
 * options.subject      – email subject
 * options.message      – plain text body
 * options.html         – optional HTML body
 * options.replyTo      – optional reply-to address
 * options.useNodemailer – if true, skip Resend and use Nodemailer directly
 *                         (used for password reset so any inbox can receive it)
 */
const sendEmail = async (options) => {

  // ─────────────────────────────────────────────────────────────
  // PATH A: Nodemailer (forced or used as only option)
  //   Used by: Password Reset emails (options.useNodemailer = true)
  //   Also used as Resend fallback when Resend is not configured
  // ─────────────────────────────────────────────────────────────
  const sendViaNodemailer = async () => {
    const mailUser = (process.env.EMAIL_USERNAME || process.env.SMTP_MAIL || "").trim();
    const mailPass = (process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || "").trim();
    const fromEmail = (process.env.EMAIL_FROM || mailUser).trim();
    const fromName  = (process.env.FROM_NAME || "Sky Tech Makers").trim();

    if (!mailUser || !mailPass) {
      console.warn("[sendEmail] No Nodemailer credentials in env. Email not sent.");
      return { simulated: true };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: mailUser, pass: mailPass },
      tls: { rejectUnauthorized: false },
    });

    const mailMessage = {
      from: `${fromName} <${fromEmail}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html:
        options.html ||
        `<div style="font-family:Arial,sans-serif;padding:20px;color:#333">
          <h2 style="color:#4f46e5">Sky Tech Makers</h2>
          <p style="font-size:16px">${options.message.replace(/\n/g, "<br/>")}</p>
        </div>`,
    };

    if (options.replyTo) mailMessage.replyTo = options.replyTo;

    const info = await transporter.sendMail(mailMessage);
    console.log(`✅ [Nodemailer] Email sent to ${options.email}. MessageId: ${info.messageId}`);
    return info;
  };

  // ─────────────────────────────────────────────────────────────
  // PATH B: Resend API
  //   Used by: Contact form emails (options.useNodemailer is NOT set)
  // ─────────────────────────────────────────────────────────────
  const sendViaResend = async () => {
    const resendKey = (process.env.RESEND_API_KEY || "").trim();
    if (!resendKey) return null; // Resend not configured

    const resend   = new Resend(resendKey);
    const fromName = (process.env.FROM_NAME || "Sky Tech Makers").trim();
    const from     = `${fromName} <onboarding@resend.dev>`;

    const payload = {
      from,
      to: [options.email],
      subject: options.subject,
      text: options.message,
      html:
        options.html ||
        `<div style="font-family:Arial,sans-serif;padding:20px;color:#333">
          <h2 style="color:#4f46e5">Sky Tech Makers</h2>
          <p style="font-size:16px">${options.message.replace(/\n/g, "<br/>")}</p>
        </div>`,
    };

    if (options.replyTo) payload.reply_to = options.replyTo;

    const response = await resend.emails.send(payload);

    if (response?.error) {
      const msg = response.error.message || JSON.stringify(response.error);
      console.warn(`⚠️ [Resend Error]: ${msg}`);
      return null; // signal failure
    }

    console.log(`✅ [Resend] Email dispatched to ${options.email}. ID: ${response?.data?.id || "sent"}`);
    return response;
  };

  // ─────────────────────────────────────────────────────────────
  // ROUTING LOGIC
  // ─────────────────────────────────────────────────────────────

  // Password Reset → always Nodemailer
  if (options.useNodemailer) {
    return await sendViaNodemailer();
  }

  // Contact Form → try Resend first, fall back to Nodemailer
  try {
    const resendResult = await sendViaResend();
    if (resendResult) return resendResult;
  } catch (resendErr) {
    console.warn("⚠️ [Resend Exception]:", resendErr?.message);
  }

  // Fallback to Nodemailer
  return await sendViaNodemailer();
};

module.exports = sendEmail;
