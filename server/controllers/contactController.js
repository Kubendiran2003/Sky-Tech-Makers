// /server/controllers/contactController.js
const sendEmail = require("../utils/sendEmail");

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Please fill out all required fields" });
    }

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.EMAIL_FROM ||
      process.env.EMAIL_USERNAME ||
      "kubendiranpalani289@gmail.com";

    const emailSubject = `[Sky Tech Makers Contact] ${subject || "General Inquiry"} from ${name}`;

    const textContent = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nCategory: ${subject}\n\nMessage:\n${message}`;

    const htmlContent = `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 25px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Sky Tech Makers</h1>
          <p style="color: #e0e7ff; margin-top: 4px; font-size: 14px;">New Contact Us Inquiry</p>
        </div>
        <div style="padding: 30px; color: #334155; line-height: 1.6;">
          <h3 style="color: #1e293b; margin-top: 0;">You have received a new contact message:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">From:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${name} (${email})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Category:</td>
              <td style="padding: 8px 0; color: #4f46e5; font-weight: 600;">${subject || "General"}</td>
            </tr>
          </table>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #4f46e5; margin-top: 15px;">
            <p style="margin: 0; font-size: 14px; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin-top: 25px;">This message was submitted via the Sky Tech Makers Contact Us form.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: receiverEmail,
      replyTo: email,
      subject: emailSubject,
      message: textContent,
      html: htmlContent,
    });

    res.status(200).json({
      success: true,
      msg: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({ msg: error.message || "Failed to send contact message" });
  }
};
