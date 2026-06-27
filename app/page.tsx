import Hero from "@/components/Hero"
import WhyItWorks from "@/components/WhyItWorks"
import SocialProof from "@/components/SocialProof"
import Samples from "@/components/Samples"
import HowItWorks from "@/components/HowItWorks"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"

export default function Home() {
  return (
    <main
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden
        bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_32%),linear-gradient(180deg,_#0a0a0a_0%,_#050505_100%)]
        text-text
      "
    >

      {/* GLOBAL BACKGROUND GLOWS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div className="absolute left-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-32 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">

        <div className="mb-10">
          <Hero />
        </div>

        <div className="mb-24" id="samples">
          <Samples />
        </div>

        <div className="mb-24">
          <WhyItWorks />
        </div>
        
        <div className="mb-24">
          <SocialProof />
        </div>

        <div className="mb-24">
          <HowItWorks />
        </div>

        <div className="mb-24" id="pricing">
          <Pricing />
        </div>

        <div className="mb-24">
          <Testimonials />
        </div>

        <div className="mb-24" id="faq">
          <FAQ />
        </div>

        <FinalCTA />
        <Footer />

      </div>

      <BackToTop />

    </main>
  )
}
