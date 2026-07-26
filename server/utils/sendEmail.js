// /server/utils/sendEmail.js
const { Resend } = require("resend");

const sendEmail = async (options) => {

  // ─────────────────────────────────────────────────────────
  // Option A: Brevo API (primary — works on Render, any email)
  // ─────────────────────────────────────────────────────────
  const brevoKey = (process.env.BREVO_API_KEY || "").trim();
  if (brevoKey) {
    try {
      const senderEmail = (process.env.BREVO_FROM_EMAIL || "contact.skytechmakers@gmail.com").trim();
      const senderName  = (process.env.FROM_NAME || "Sky Tech Makers").trim();

      const payload = {
        sender:      { name: senderName, email: senderEmail },
        to:          [{ email: options.email }],
        subject:     options.subject,
        textContent: options.message,
        htmlContent:
          options.html ||
          `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4f46e5;">Sky Tech Makers</h2>
            <p style="font-size: 16px;">${options.message.replace(/\n/g, "<br/>")}</p>
          </div>`,
      };

      if (options.replyTo) {
        payload.replyTo = { email: options.replyTo };
      }

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":      brevoKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn(`⚠️ [Brevo Error]: ${data?.message || JSON.stringify(data)}`);
        // Fall through to Resend
      } else {
        console.log(`✅ [Brevo Success] Email sent to ${options.email}. MessageId: ${data?.messageId || "sent"}`);
        return data;
      }
    } catch (brevoErr) {
      console.warn("⚠️ [Brevo Exception]:", brevoErr?.message || brevoErr);
      // Fall through to Resend
    }
  }

  // ─────────────────────────────────────────────────────────
  // Option B: Resend API (secondary fallback)
  // ─────────────────────────────────────────────────────────
  const resendKey = (process.env.RESEND_API_KEY || "").trim();
  if (resendKey) {
    try {
      const resend   = new Resend(resendKey);
      const fromName = (process.env.FROM_NAME || "Sky Tech Makers").trim();
      const from     = `${fromName} <onboarding@resend.dev>`;

      const payload = {
        from,
        to:      [options.email],
        subject: options.subject,
        text:    options.message,
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
        console.warn(`⚠️ [Resend Error]: ${msg}`);
        // No more fallbacks — log and return gracefully
        console.log(`[Email Simulation] Could not deliver email to ${options.email}.`);
        return { failed: true, error: msg };
      } else {
        console.log(`✅ [Resend Success] Email dispatched to ${options.email}. ID: ${response?.data?.id || "sent"}`);
        return response;
      }
    } catch (resendErr) {
      console.warn("⚠️ [Resend Exception]:", resendErr?.message || resendErr);
    }
  }

  // ─────────────────────────────────────────────────────────
  // No providers configured
  // ─────────────────────────────────────────────────────────
  console.log("=================================================");
  console.log("[Email Notice] No email provider configured.");
  console.log(`[Email Simulation] To: ${options.email}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Content:\n${options.message}`);
  console.log("=================================================");
  return { simulated: true };
};

module.exports = sendEmail;
