i have 27 UGC style 15 sec clips uploaded to YT. they are set as unlisted.

instead of loading only 6 large videos i want to load more..but much smaller display..i dont want a huge vertical scroll

i think i can fit 6 videos per column.

so lets try 18 videos total.

3 rows..

if i have any duplicates..just delete it

https://youtube.com/shorts/X1IlJutIX7Q?feature=share

https://youtube.com/shorts/3Iq6obnUeS4?feature=share

https://youtube.com/shorts/oycB4YMt6Gc?feature=share

https://youtube.com/shorts/EOiUYXg3B3Y?feature=share

https://youtube.com/shorts/HQm6ImdBRBs?feature=share

https://youtube.com/shorts/g-1k6NvYpe0?feature=share

https://youtube.com/shorts/NrI6pqeBbco?feature=share

https://youtube.com/shorts/3rlMU_HPmo4?feature=share

https://youtube.com/shorts/4NnOn9kflF4?feature=share

https://youtube.com/shorts/QQpyoXpbl9k?feature=share

https://youtube.com/shorts/SrKVbeDYEaQ?feature=share

https://youtube.com/shorts/A16kV9wPDRk?feature=share

https://youtube.com/shorts/pLtN-jdPqas?feature=share

https://youtube.com/shorts/eaUpfhWL_wE?feature=share


https://youtube.com/shorts/CLkwXQEiaO4?feature=share


https://youtube.com/shorts/PRFBOilvFTM?feature=share

https://youtube.com/shorts/4NnOn9kflF4?feature=share

https://youtube.com/shorts/Wa27j2zTWNw?feature=share

https://youtube.com/shorts/527Ssqy6uAY?feature=share

https://youtube.com/shorts/E4v0cWfxkYY?feature=share

https://youtube.com/shorts/SMcfoaQYwpI?feature=share

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

