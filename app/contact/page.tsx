"use client"
import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      handle: e.target.handle.value,
      message: e.target.message.value,
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    setLoading(false)
    if (res.ok) setSent(true)
  }

  if (sent) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-3xl font-bold mb-4">Message Sent</h1>
        <p className="text-white/60">
          Thanks for reaching out — I’ll reply shortly.
        </p>
      </div>
    )
  }

  return (
    <section className="py-20 px-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Your Name" className="input" required />
        <input name="email" placeholder="Email" className="input" required />
        <input name="handle" placeholder="TikTok Handle" className="input" />
        <textarea name="message" placeholder="Message" className="input h-32" required />

        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover py-3 rounded-xl shadow-glow transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  )
}
