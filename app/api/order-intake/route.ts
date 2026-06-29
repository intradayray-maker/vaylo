import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // STRIPE META
    const productName = String(formData.get("productName") || "")
    const packageTier = String(formData.get("packageTier") || "")
    const priceAmountRaw = formData.get("priceAmount")
    const priceCurrencyRaw = formData.get("priceCurrency")
    const orderId = String(formData.get("orderId") || "")
    const customerEmail = String(formData.get("customerEmail") || "")
    const purchaseTimestampRaw = formData.get("purchaseTimestamp")

    // FORM FIELDS
    const productDescription = String(formData.get("productDescription") || "")
    const audience = String(formData.get("audience") || "")
    const hook = String(formData.get("hook") || "")
    const style = String(formData.get("style") || "")
    const cta = String(formData.get("cta") || "")
    const notes = String(formData.get("notes") || "")
    const musicGenre = String(formData.get("musicGenre") || "")
    const voiceover = String(formData.get("voiceover") || "")
    const videoLength = String(formData.get("videoLength") || "")

    const photos = formData.getAll("photos") as File[]
    const audioFile = formData.get("audio") as File | null

    // PRICE FORMAT
    const priceAmountNum = Number(priceAmountRaw || 0)
    const pricePaid = Math.round(priceAmountNum / 100)
    const priceCurrencyStr =
      typeof priceCurrencyRaw === "string"
        ? priceCurrencyRaw.toUpperCase()
        : ""

    // PURCHASE TIME FORMAT
    let purchaseTimeFormatted = ""
    if (purchaseTimestampRaw) {
      const ts = Number(purchaseTimestampRaw)
      const date = new Date(ts * 1000)
      purchaseTimeFormatted = date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/New_York"
      })
    }

    // EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // INTERNAL EMAIL (to you)
    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px; color:#000;">
        <h2 style="
          margin:0 0 12px 0;
          font-size:22px;
          font-weight:600;
          background:linear-gradient(to right, #8B5CF6, #4ADE80);
          -webkit-background-clip:text;
          color:transparent;
        ">
          Stripe Order Details
        </h2>

        <p><strong>Package Ordered:</strong> ${packageTier || productName}</p>
        <p><strong>Price Paid:</strong> $${pricePaid} ${priceCurrencyStr}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Purchase Time:</strong> ${purchaseTimeFormatted}</p>

        <hr style="margin:25px 0;" />

        <h2 style="
          margin:0 0 12px 0;
          font-size:20px;
          font-weight:600;
          background:linear-gradient(to right, #8B5CF6, #4ADE80);
          -webkit-background-clip:text;
          color:transparent;
        ">
          Client Submission Details
        </h2>

        <p><strong>Product Description:</strong> ${productDescription}</p>
        <p><strong>UGC Actor:</strong> ${audience}</p>
        <p><strong>Video Length:</strong> ${videoLength} seconds</p>
        <p><strong>Audio Preference:</strong> ${voiceover}</p>

        ${musicGenre ? `<p><strong>Music Genre:</strong> ${musicGenre}</p>` : ""}

        <p><strong>Hook Style:</strong> ${hook}</p>
        <p><strong>Video Style:</strong> ${style}</p>
        <p><strong>CTA:</strong> ${cta}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      </div>
    `

    // ATTACHMENTS
    const attachments = await Promise.all(
      photos.map(async (file, index) => ({
        filename: file.name || `photo-${index + 1}.jpg`,
        content: Buffer.from(await file.arrayBuffer())
      }))
    )

    if (audioFile) {
      attachments.push({
        filename: audioFile.name || "audio-file",
        content: Buffer.from(await audioFile.arrayBuffer())
      })
    }

    // SEND INTERNAL EMAIL (to you)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "support.vaylo@gmail.com",
      subject: `New Vaylo Order Intake — ${productName}`,
      html,
      attachments
    })

    // ⭐ SEND AUTOMATED CLIENT EMAIL ⭐
    if (customerEmail) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Your Assets Are In — Production Started 🎬",
        text: `
Hi there,

Your assets have been successfully received — thank you for sending everything over.
Your video is now in the production queue and our team has started working on it.

What happens next:
• Your video will be fully produced within 48 hours
• You’ll receive a private delivery link via email
• If anything is missing or unclear, we’ll reach out immediately

Thanks again — excited to bring your product to life.

– Vaylo Team
        `
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Order intake error:", err)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
