"use client"

import { Check, XMark } from "@/components/ui/Checks"

const stripePriceIds = {
  basic: process.env.NEXT_PUBLIC_PRICE_BASIC,
  standard: process.env.NEXT_PUBLIC_PRICE_STANDARD,
  premium: process.env.NEXT_PUBLIC_PRICE_PREMIUM,
} as const

export default function Pricing() {

  async function handleBuy(priceId: string) {
    console.log("Using priceId:", priceId)

    if (!priceId) {
      console.error("Missing Stripe price ID")
      return
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      })

      if (!res.ok) {
        const error = await res.json().catch(() => null)
        console.error("Stripe checkout error:", error ?? res.statusText)
        return
      }

      const data = await res.json()

      if (data?.url) {
        window.location.assign(data.url)
      } else {
        console.error("Stripe error:", data)
      }
    } catch (err) {
      console.error("Checkout request failed:", err)
    }
  }

  return (
    <section id="pricing" className="py-2 px-6">

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-18">
        Simple Pricing. Fast Delivery.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* BASIC */}
        <div className="bg-card border border-border rounded-xl p-8 flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
            Basic — $50
          </h3>

          <p className="text-white/40 text-sm mb-4">
            For brands needing quick & punchy ads.
          </p>

<ul className="text-white/60 mb-6 space-y-2">
  <li><Check /> Up to 15 seconds</li>
  <li><Check /> (1) Ad only </li>  
  <li><Check /> UGC‑Style AI Product Ad</li>
  <li><Check /> Hyper‑realistic AI actor</li>
  <li><Check /> Perfect lip‑sync or voiceover</li>
  <li><Check /> Pro video editing</li>
  <li><Check /> Music & SFX (when needed)</li>
  <li><Check /> Vertical or horizontal (9:16 / 16:9)</li>
  <li><Check /> 48‑Hour delivery</li>
  <li><Check /> 1 revision</li>
</ul>


          <button
            type="button"
            onClick={() => handleBuy(stripePriceIds.basic ?? "")}
            className="mt-auto bg-accent hover:bg-accent-hover text-center py-3 px-4 rounded-xl shadow-glow transition"
          >
            Get BASIC Now
          </button>
        </div>

        {/* STANDARD */}
        <div className="bg-card/90 border border-accent rounded-xl p-8 pt-12 shadow-[0_0_40px_rgba(139,92,246,0.35)] flex flex-col relative overflow-visible">

          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-semibold px-4 py-1.5 rounded-full z-20">
            Most Popular
          </div>

          <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
            Standard — $90
          </h3>

          <p className="text-white/40 text-sm mb-4">
            Best for a FULL attention grabbing ad.
          </p>

<ul className="text-white/60 mb-6 space-y-2">
  <li><Check /> Up to 30 seconds</li>
  <li><Check /> (1) 30 sec Ad OR (2) 15 sec Ads </li>  
  <li><Check /> UGC‑Style AI Product Ad</li>
  <li><Check /> Hyper‑realistic AI actor</li>
  <li><Check /> Perfect lip‑sync or voiceover</li>
  <li><Check /> Pro video editing</li>
  <li><Check /> Music & SFX (when needed)</li>
  <li><Check /> Vertical or horizontal (9:16 / 16:9)</li>
  <li><Check /> 48‑Hour delivery</li>
  <li><Check /> 2 revisions</li>
</ul>

          <button
            type="button"
            onClick={() => handleBuy(stripePriceIds.standard ?? "")}
            className="mt-auto bg-accent hover:bg-accent-hover text-center py-3 px-4 rounded-xl transition"
          >
            Get STANDARD Now
          </button>
        </div>

        {/* PREMIUM */}
        <div className="bg-card border border-border rounded-xl p-8 flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
            Premium — $130
          </h3>

          <p className="text-white/40 text-sm mb-4">
            For brands needing longer video ads.
          </p>

<ul className="text-white/60 mb-6 space-y-2">
  <li><Check /> Up to 60 seconds</li>
  <li><Check /> (1) 60 sec OR upto (3) seperate ads </li>    
  <li><Check /> UGC‑Style AI Product Ad</li>
  <li><Check /> Hyper‑realistic AI actor</li>
  <li><Check /> Perfect lip‑sync or voiceover</li>
  <li><Check /> Pro video editing</li>
  <li><Check /> Music & SFX (when needed)</li>
  <li><Check /> Vertical or horizontal (9:16 / 16:9)</li>
  <li><Check /> 72‑Hour delivery</li>
  <li><Check /> 2 revisions</li>
</ul>

          <button
            type="button"
            onClick={() => handleBuy(stripePriceIds.premium ?? "")}
            className="mt-auto bg-accent hover:bg-accent-hover text-center py-3 px-4 rounded-xl transition"
          >
            Get PREMIUM Now
          </button>
        </div>

      </div>

      <div className="max-w-xl mx-auto text-center mt-22 bg-card border border-border rounded-xl p-12">
        <h3 className="text-xl font-semibold mb-2">
          Influencer Boost 🚀
        </h3>

        <p className="text-white/60 mb-4">
          Expand your reach with our in‑house marketing strategy.
        </p>

        <p className="text-white/40 text-sm mb-7">
          Get your ad in front of 1M+ shoppers.
        </p>

        <a className="bg-accent hover:bg-accent-hover text-center py-3 px-14 rounded-xl shadow-glow transition">
          DM for More Info
        </a>
      </div>

    </section>
  )
}
