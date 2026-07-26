// /server/utils/sendEmail.js
const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const sendEmail = async (options) => {
  // Option A: If RESEND_API_KEY is present, attempt Resend API first
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== "") {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY.trim());
      let from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      if (from.includes("@gmail.com")) {
        from = "onboarding@resend.dev";
      }
      
      const payload = {
        from: from.includes("<") ? from : `${process.env.FROM_NAME || "Sky Tech Makers"} <${from}>`,
        to: [options.email],
        subject: options.subject,
        text: options.message,
        html: options.html || `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">Sky Tech Makers</h2>
          <p style="font-size: 16px;">${options.message.replace(/\n/g, "<br/>")}</p>
        </div>`,
      };

      if (options.replyTo) {
        payload.reply_to = options.replyTo;
      }

      const response = await resend.emails.send(payload);

      if (response?.error) {
        console.warn(`⚠️ [Resend Notice]: ${response.error.message || JSON.stringify(response.error)}. Falling back to Nodemailer...`);
      } else {
        console.log(`✅ [Resend Success] Email dispatched to ${options.email}. ID: ${response?.data?.id || "sent"}`);
        return response;
      }
    } catch (resendErr) {
      console.warn("⚠️ [Resend Exception]. Falling back to Nodemailer...", resendErr?.message || resendErr);
    }
  }

  // Option B: Fallback to Nodemailer / SMTP
  const mailUser = process.env.EMAIL_USERNAME || process.env.SMTP_MAIL;
  const mailPass = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD;
  const service = process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || "gmail";
  const fromEmail = process.env.EMAIL_FROM || mailUser;

  // Check if email credentials are provided
  if (!mailUser || !mailPass) {
    console.log("=================================================");
    console.log("[Email Notice] RESEND_API_KEY or EMAIL_USERNAME not configured in .env");
    console.log(`[Email Simulation] To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content:\n${options.message}`);
    console.log("=================================================");
    return;
  }

  try {
    const transporterOptions = {
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
    };

    const transporter = nodemailer.createTransport(transporterOptions);

    const message = {
      from: `${process.env.FROM_NAME || "Sky Tech Makers"} <${fromEmail}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4f46e5;">Sky Tech Makers</h2>
        <p style="font-size: 16px;">${options.message.replace(/\n/g, "<br/>")}</p>
      </div>`,
    };

    if (options.replyTo) {
      message.replyTo = options.replyTo;
    }

    const info = await transporter.sendMail(message);
    console.log(`✅ [Nodemailer Success] Email sent to ${options.email}. MessageId: ${info.messageId}`);
    return info;
  } catch (nodemailerErr) {
    console.error("❌ [Nodemailer Error]:", nodemailerErr);
    throw nodemailerErr;
  }
};

module.exports = sendEmail;
