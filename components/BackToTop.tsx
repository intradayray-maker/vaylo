"use client"
import { useEffect, useState } from "react"

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed
        bottom-6
        right-6
        h-12
        w-12
        rounded-full
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-purple-600
        to-fuchsia-900
        shadow-[0_0_20px_rgba(168,85,247,0.45)]
        hover:shadow-[0_0_30px_rgba(168,85,247,0.65)]
        text-white
        text-xl
        z-50
        transition-all
        duration-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      ↑
    </button>
  )
}
