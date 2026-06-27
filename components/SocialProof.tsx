export default function SocialProof() {
  const logos = [
    "/logo/urban.png",
    "/logo/nova.png",
    "/logo/pulse.png",
    "/logo/mint.png",
    "/logo/AppSumo.png",
    "/logo/watchmojo.png",
  ];

  return (
    <section className="py-4 px-76 text-center">

      <h2 className="text-[14px] md:text-[14px] font-medium text-white/40 mb-12">
        <span className="text-white/40 font-semibold tracking-wide">
          Trusted by
        </span>{" "}
        Shopify sellers, Etsy creators, Amazon brands & local businesses
      </h2>

      <div className="relative overflow-hidden w-full">

        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

        <div className="flex animate-scrollTrack whitespace-nowrap">

          {[...logos, ...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-7 w-auto mx-8 opacity-80"
              alt="brand"
            />
          ))}

        </div>
      </div>

    </section>
  );
}
