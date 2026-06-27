export default function Hero() {
  return (
    <section className="pt-30 pb-2 flex flex-col items-center text-center px-6">

      <h1 className="text-4xl md:text-6xl font-bold mb-2">
        High-Converting Video Ads for
      </h1>

      <h2 className="
        text-4xl
        md:text-6xl
        font-extrabold
        bg-gradient-to-r
        from-[#4f2e9c]
        via-purple-500
        to-pink-500
        bg-clip-text
        text-transparent
        drop-shadow-glow
        mb-6
      ">
        TikTok, Reels & Shorts
      </h2>

      <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10">
        Turn any product photo into an AMAZING video ad using AI motion, hooks, pacing, and platform‑native editing.
      </p>

      <div className="flex gap-4">
        <a
          href="#pricing"
          className="bg-accent hover:bg-accent-hover px-8 py-3 rounded-xl shadow-glow transition"
        >
          Get Your First Video
        </a>

        <a
          href="#samples"
          className="border border-accent/40 hover:border-accent px-8 py-3 rounded-xl transition"
        >
          View Samples
        </a>
      </div>

      <p className="text-white/40 text-sm mt-6">
        No meetings. No scripts. No hassle. Just results.
      </p>

    </section>
  );
}
