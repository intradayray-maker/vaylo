"use client";


import { useState } from "react";

export default function Samples() {
  const [active, setActive] = useState<string | null>(null);

  const videos = [
    "X1IlJutIX7Q",
    "3Iq6obnUeS4",
    "oycB4YMt6Gc",
    "EOiUYXg3B3Y",
    "HQm6ImdBRBs",
    "g-1k6NvYpe0",
    "NrI6pqeBbco",
    "3rlMU_HPmo4",
    "4NnOn9kflF4",
    "QQpyoXpbl9k",
    "SrKVbeDYEaQ",
    "A16kV9wPDRk",
    "pLtN-jdPqas",
    "eaUpfhWL_wE",
    "CLkwXQEiaO4",
    "PRFBOilvFTM",
    "Wa27j2zTWNw",
    "527Ssqy6uAY",
  ];

  return (
    <section id="samples" className="py-1 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        See What Vaylo Can Do
      </h2>

      <p className="text-center text-white/60 mb-10">
        Real AI-generated product videos created from a single photo.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {videos.map((id, i) => (
          <button
            key={i}
            onClick={() => setActive(id)}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-glow-sm hover:shadow-glow transition cursor-pointer"
          >
            <div className="aspect-[9/16] bg-black/40">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?controls=0&modestbranding=1&playsinline=1&rel=0`}
                className="w-full h-full"
              />
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setActive(null)}
        >
          <div className="w-[90%] max-w-xl aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1&controls=1&modestbranding=1&playsinline=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}
    </section>
  );
}
