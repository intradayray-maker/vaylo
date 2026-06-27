export default function FAQ() {
  const faqs = [
    ["How fast is delivery?", "Most orders are delivered within 24 hours."],
    ["What platforms are videos optimized for?", "TikTok, Instagram Reels, YouTube Shorts, and paid ads."],
    ["Do you offer revisions?", "Yes — simple adjustments are included."],
    ["Can you add voiceover?", "Yes. We use high-quality AI voiceovers on request."],
    ["Can you make multiple variations?", "Yes — that’s what the Standard and Premium packages are for."],
    ["Do you offer influencer marketing?", "Yes — we can connect your product with creators."]
  ];

  return (
    <section className="py-2 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map(([q, a], i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">{q}</h3>
            <p className="text-white/60">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
