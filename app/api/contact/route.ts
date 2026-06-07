import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Digitiva Contact" <${process.env.GMAIL_USER}>`,
      to: "digitivaa@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0d1a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #3B82F6; margin: 0 0 24px;">New inquiry via Digitiva website</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; width: 110px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #06B6D4;">${email}</a></td>
            </tr>
            ${service ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Service</td>
              <td style="padding: 10px 0;">${service}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1e293b; color: #475569; font-size: 12px;">
            Sent from digitivaa.com contact form
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
