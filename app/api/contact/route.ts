import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, handle, message } = await req.json()

    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,      // your Gmail address
        pass: process.env.EMAIL_PASS       // your Gmail App Password
      }
    })

    // Email to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Vaylo Contact",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>TikTok:</strong> ${handle}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `
    })

    // Email to CUSTOMER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Vaylo",
      html: `
        <p>Hey ${name},</p>
        <p>Thanks for reaching out — I’ll reply shortly.</p>
        <p>Your message:</p>
        <blockquote>${message}</blockquote>
        <p>Talk soon,<br/>Ray</p>
      `
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("Contact form error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
