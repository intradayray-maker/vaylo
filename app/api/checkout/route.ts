import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json()

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: new URL("/thank-you?session_id={CHECKOUT_SESSION_ID}", siteUrl).toString(),
      cancel_url: new URL("/pricing", siteUrl).toString()
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err)
    const message = err instanceof Error ? err.message : "Failed to create checkout session"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
