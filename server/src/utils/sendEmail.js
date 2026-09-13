const nodemailer = require('nodemailer');

/**
 * Sends support ticket notification email to admin (suraj40praj@gmail.com)
 * and an acknowledgement email to the customer.
 */
async function sendTicketEmail({ ticketId, customerName, customerEmail, phone, category, subject, description, relatedOrderNumber }) {
  const adminEmail = process.env.SUPPORT_RECEIVER_EMAIL || 'suraj40praj@gmail.com';
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // If email credentials are not configured yet, log detailed notice
  if (!emailUser || !emailPass) {
    console.warn(`[Email Service Notice] Real email was not sent because EMAIL_USER / EMAIL_PASS is not configured in server/.env.`);
    console.warn(`[Ticket Details] ID: ${ticketId} | Customer: ${customerName} (${customerEmail}) | Subject: ${subject}`);
    return {
      sent: false,
      reason: 'SMTP credentials missing. Please set EMAIL_USER and EMAIL_PASS in server/.env.'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass // Gmail 16-character App Password
      }
    });

    // 1. Send alert email to suraj40praj@gmail.com
    const adminMailOptions = {
      from: `"Robu Support Portal" <${emailUser}>`,
      to: adminEmail,
      subject: `[New Support Ticket ${ticketId}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h2 style="color: #380680; margin-top: 0;">New Support Ticket Received</h2>
          <p style="font-size: 14px; color: #4B5563;">A customer has submitted a new inquiry via the Customer Support desk:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13.5px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold; width: 140px;">Ticket Reference:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; color: #F36C21; font-weight: bold;">${ticketId}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6;">${customerName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Customer Email:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6;"><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Category:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6;">${category}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Related Order:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6;">${relatedOrderNumber || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">Subject:</td><td style="padding: 8px; border-bottom: 1px solid #F3F4F6; font-weight: bold;">${subject}</td></tr>
          </table>

          <div style="background-color: #F9FAFB; padding: 16px; border-radius: 6px; border-left: 4px solid #380680; margin-top: 16px;">
            <strong style="display: block; margin-bottom: 6px; color: #1E1E24;">Message Description:</strong>
            <p style="margin: 0; color: #374151; white-space: pre-wrap; font-size: 13.5px;">${description}</p>
          </div>

          <p style="font-size: 11.5px; color: #9CA3AF; margin-top: 24px;">This message was dispatched automatically by Robu.in Support System.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(adminMailOptions);
    console.log(`[Email Sent] Ticket email successfully sent to ${adminEmail}:`, info.messageId);

    // 2. Send acknowledgement to customer if valid email provided
    if (customerEmail && customerEmail.includes('@')) {
      try {
        await transporter.sendMail({
          from: `"Robu Support" <${emailUser}>`,
          to: customerEmail,
          subject: `[Received] Your Support Ticket #${ticketId}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 20px;">
              <h3 style="color: #380680;">We've received your request!</h3>
              <p>Hi ${customerName},</p>
              <p>Thank you for reaching out to Robu Support. Your ticket has been logged with reference <strong>#${ticketId}</strong>.</p>
              <p>Our electronics engineering team will review your query ("<em>${subject}</em>") and respond to you shortly.</p>
              <p style="margin-top: 20px; font-size: 12px; color: #6B7280;">Robu.in Customer Support Team</p>
            </div>
          `
        });
      } catch (err) {
        console.warn(`[Customer Confirmation Email Error]`, err.message);
      }
    }

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Send Error] Failed to send email via nodemailer:`, error);
    return { sent: false, error: error.message };
  }
}

module.exports = { sendTicketEmail };
