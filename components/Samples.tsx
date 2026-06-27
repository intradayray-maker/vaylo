export default function Samples() {
  const videos = [
    "https://youtube.com/shorts/PL0cR-C2wkg",
    "https://youtube.com/shorts/ZaGocDGiEQ4",
    "https://youtube.com/shorts/UP1Ova4bHIU",
    "https://youtube.com/shorts/3lB_bzp4cJE",
    "https://youtube.com/shorts/Dq7MELEfI1A",
    "https://youtube.com/shorts/ChZH0eyjPe0",
  ];

  return (
    <section id="samples" className="py-1 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        See What Vaylo Can Do
      </h2>

      <p className="text-center text-white/60 mb-12">
        Real AI-generated product videos created from a single photo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {videos.map((url, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-xl overflow-hidden shadow-glow-sm hover:shadow-glow transition cursor-pointer"
          >
            <div className="aspect-[9/16] bg-black/40">
              <iframe
                src={`${url.replace("youtube.com/shorts", "www.youtube.com/embed")}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
