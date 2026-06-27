export default function ThankYouPage() {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">
        Payment Confirmed 🎉
      </h1>

      <p className="text-white/70 text-lg mb-6">
        Thanks for your order! Your video is now in the queue.
      </p>

      <p className="text-white/50 mb-10">
        Delivery ETA: <span className="text-accent font-semibold">within 24 hours</span>.
      </p>

      <div className="bg-card border border-border rounded-xl p-8 text-left">
        <h2 className="text-xl font-semibold mb-4">
          What Happens Next
        </h2>

        <ul className="space-y-3 text-white/60">
          <li>• Send your product photos to <span className="text-accent">support.vaylo@gmail.com</span></li>
          <li>• Include any notes, hooks, or style preferences</li>
          <li>• We’ll confirm once your assets are received</li>
          <li>• Your final video will be delivered within 24 hours</li>
        </ul>
      </div>

      <a
        href="mailto:support.vaylo@gmail.com"
        className="inline-block mt-10 bg-accent hover:bg-accent-hover px-10 py-3 rounded-xl shadow-glow transition"
      >
        Send Product Photos
      </a>
    </section>
  )
}
