/* --- STAR ICONS --- */

const FullStar = () => (
  <svg
    className="h-4 w-4 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const HalfStar = () => (
  <svg
    className="h-4 w-4 text-yellow-400"
    viewBox="0 0 20 20"
  >
    <defs>
      <linearGradient id="half">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#half)"
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
    />
  </svg>
);

const EmptyStar = () => (
  <svg
    className="h-4 w-4 text-yellow-400 opacity-30"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 00.95-.69l1.286-3.967z" />
  </svg>
);

/* --- STAR RENDERER --- */

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <FullStar key={`f-${i}`} />
      ))}
      {half && <HalfStar />}
      {Array.from({ length: empty }).map((_, i) => (
        <EmptyStar key={`e-${i}`} />
      ))}
    </div>
  );
}

/* --- TESTIMONIALS --- */

export default function Testimonials() {
  const reviews = [
    { text: "Got 3 sales in the first 24 hours. Didn’t expect it to work that fast.", name: "Margret", role: "Shopify Seller", rating: 5.0 },
    { text: "Cleanest product video I’ve ever had made. Ordering again this week.", name: "Yuhen", role: "Re-Seller", rating: 5.0 },
    { text: "Perfect for TikTok store. VERY FAST delivery.", name: "Leo", role: "Dropshipper", rating: 5.0 },
    { text: "The AI actor matched my brand vibe better than any UGC creator I’ve hired.", name: "Sothia", role: "E‑com Founder", rating: 5.0 },
    { text: "i finnaly got some sales - thanks bro", name: "David", role: "Amazon Seller", rating: 5.0 },
    { text: "Got 2 winning ads from the first batch. Ray was very professinal!.", name: "Hannah", role: "TikTok Shop Seller", rating: 5.0 },
    { text: "The variations just what i needed. very flexible team.", name: "Christine", role: "Etsy Seller", rating: 5.0 },
    { text: "im glad i found you guys. i dont know how to make these videos myself.", name: "Joe", role: "Brand Owner", rating: 4.8 },
    { text: "Fast, clean, and perfect for paid ads. Already seeing better engagement.", name: "Amara", role: "DTC Founder", rating: 5.0 }
  ];

  return (
    <section className="py-2 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Wall of Love 💜
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="
              bg-card
              border border-border
              rounded-xl
              p-6
              space-y-4
            "
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden">
                <img
                  src={`/reviews/${i + 1}.jpg`}
                  alt={r.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-white/90 font-semibold">{r.name}</p>
                <p className="text-white/40 text-xs">{r.role}</p>
              </div>
            </div>

            {/* Stars */}
            <StarRating rating={r.rating} />

            {/* Review */}
            <p className="text-white/70 text-sm leading-relaxed">
              “{r.text}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
