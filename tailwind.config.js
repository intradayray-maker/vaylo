/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        card: "var(--card)",
        border: "var(--border)",
        text: "var(--text)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",

        // ⭐ Needed for gradient glow behind Standard card
        "accent-soft": "rgba(139, 92, 246, 0.18)",
      },

      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.4)",
        "glow-sm": "0 0 10px rgba(139, 92, 246, 0.3)",
      },

      borderRadius: {
        xl: "1rem",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      keyframes: {
        scrollTrack: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },

        pulseSlow: {
          "0%": { opacity: 0.6 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0.6 },
        },

        // ⭐ Pop‑in animation for checkmarks
        popIn: {
          "0%": { transform: "scale(0.4)", opacity: 0 },
          "60%": { transform: "scale(1.15)", opacity: 1 },
          "100%": { transform: "scale(1)" },
        },
      },

      animation: {
        scrollTrack: "scrollTrack 38s linear infinite",
        pulseSlow: "pulseSlow 2.2s ease-in-out infinite",
        popIn: "popIn 0.25s ease-out",
      },
    },
  },

  plugins: [],
};
