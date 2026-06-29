"use client"

import { useState, useEffect, useCallback } from "react"
import UltraSelect from "../components/UltraSelect"

type StripeMeta = {
  productName: string | null
  packageTier: string | null
  priceAmount: number | null
  priceCurrency: string | null
  orderId: string | null
  customerEmail: string | null
  purchaseTimestamp: string | null
}

type LocalPhoto = {
  file: File
  previewUrl: string
}

type LocalAudio = {
  file: File
  name: string
}

export default function ThankYouPage() {

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [stripeMeta, setStripeMeta] = useState<StripeMeta>({
    productName: "Loading...",
    packageTier: null,
    priceAmount: null,
    priceCurrency: null,
    orderId: null,
    customerEmail: null,
    purchaseTimestamp: null
  })

  const [photos, setPhotos] = useState<LocalPhoto[]>([])
  const [audio, setAudio] = useState<LocalAudio | null>(null)
  const maxPhotos = 5

  const [audioPref, setAudioPref] = useState<string>("")

  // FETCH STRIPE SESSION
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get("session_id")

    if (!sessionId) {
      setStripeMeta(prev => ({ ...prev, productName: "Unknown Package" }))
      return
    }

    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setStripeMeta({
          productName: data.productName ?? "Unknown Package",
          packageTier: data.packageTier ?? data.productName ?? null,
          priceAmount: data.priceAmount ?? null,
          priceCurrency: data.priceCurrency ?? null,
          orderId: data.orderId ?? null,
          customerEmail: data.customerEmail ?? null,
          purchaseTimestamp: data.purchaseTimestamp ?? null
        })
      })
      .catch(() => {
        setStripeMeta(prev => ({ ...prev, productName: "Unknown Package" }))
      })
  }, [])

  // HANDLE PHOTO FILES
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return

    const incoming = Array.from(files).slice(0, maxPhotos - photos.length)

    const newPhotos: LocalPhoto[] = incoming.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }))

    setPhotos(prev => [...prev, ...newPhotos])
  }, [photos.length])

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const copy = [...prev]
      const removed = copy.splice(index, 1)[0]
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl)
      return copy
    })
  }

  // AUDIO UPLOAD
  const handleAudioUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    setAudio({ file, name: file.name })
  }

  const removeAudio = () => {
    setAudio(null)
  }

  // IMAGE COMPRESSION
  async function compressImage(file: File, quality = 0.8, maxWidth = 1600): Promise<File> {
    const imageBitmap = await createImageBitmap(file)
    const canvas = document.createElement("canvas")
    const ratio = imageBitmap.width > maxWidth ? maxWidth / imageBitmap.width : 1

    canvas.width = imageBitmap.width * ratio
    canvas.height = imageBitmap.height * ratio

    const ctx = canvas.getContext("2d")
    if (!ctx) return file

    ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height)

    const blob: Blob = await new Promise(resolve =>
      canvas.toBlob(b => resolve(b || file), "image/jpeg", quality)
    )

    return new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
      type: "image/jpeg"
    })
  }

  // SUBMIT FORM
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // STRIPE META
    formData.append("packageTier", stripeMeta.packageTier || "")
    formData.append("priceAmount", stripeMeta.priceAmount?.toString() || "")
    formData.append("priceCurrency", stripeMeta.priceCurrency || "")
    formData.append("orderId", stripeMeta.orderId || "")
    formData.append("customerEmail", stripeMeta.customerEmail || "")
    formData.append("purchaseTimestamp", stripeMeta.purchaseTimestamp || "")

    // REMOVE OLD PHOTOS
    formData.delete("photos")

    // COMPRESS + RENAME PHOTOS
    for (let i = 0; i < photos.length; i++) {
      const compressed = await compressImage(photos[i].file)
      const safeName = `${stripeMeta.productName || "product"}-${i + 1}.jpg`
      formData.append("photos", new File([compressed], safeName, { type: "image/jpeg" }))
    }

    // AUDIO
    if (audio) {
      formData.append("audio", audio.file)
    }

    const res = await fetch("/api/order-intake", {
      method: "POST",
      body: formData
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
      photos.forEach(p => URL.revokeObjectURL(p.previewUrl))
      setPhotos([])
      setAudio(null)
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <section className="py-10 px-6 max-w-3xl mx-auto overflow-hidden">

      {/* GRADIENT HEADER */}
      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-4
          bg-gradient-to-r
          from-emerald-400
          to-purple-500
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_12px_rgba(0,255,180,0.35)]
        "
      >
        Payment Confirmed 🎉
      </h1>

      {/* FLOATING CONTINUE ARROW */}
      <div className="flex justify-center mb-6">
        <div
          className="
            animate-bounce
            text-white/70
            text-sm
            bg-black/30
            px-4
            py-2
            rounded-full
            border border-white/10
          "
        >
          Continue ↓
        </div>
      </div>

      {/* MINI PROGRESS BAR */}
      <div className="flex flex-col items-center mb-8">

        {/* CENTERED LABELS */}
        <div className="flex justify-center gap-24 text-xs mb-2">



          {/* ORDER PLACED — ALWAYS GRADIENT */}
          <span
            className="
              bg-gradient-to-r
              from-emerald-400
              to-purple-500
              bg-clip-text
              text-transparent
              font-semibold
            "
          >
            Order Placed
          </span>

          {/* IN PROGRESS — GRADIENT AFTER SUBMIT */}
          <span
            className={
              submitted
                ? "bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent font-semibold"
                : "text-white/40"
            }
          >
            In Progress
          </span>

          {/* COMPLETE — ALWAYS DIM */}
          <span className="text-white/40">
            Complete
          </span>

        </div>

        {/* PROGRESS BAR */}
        <div className="w-full max-w-md h-2 bg-black/30 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-gradient-to-r
              from-emerald-400
              to-purple-500
              rounded-full
              transition-all
              duration-1000
            "
            style={{ width: submitted ? "66%" : "33%" }}
          />
        </div>

      </div>

{/* SUCCESS MESSAGE */}
{submitted && (
  <div
    className="
      bg-black/20
      border border-white/10
      rounded-xl
      p-10
      text-center
      backdrop-blur-sm
    "
  >
    <h2
      className="
        text-2xl
        font-semibold
        mb-4
        bg-gradient-to-r
        from-emerald-400
        to-purple-500
        bg-clip-text
        text-transparent
      "
    >
      Assets Submitted 👍🏿
    </h2>

    <p className="text-white/60">
      Your video is now in the production queue 🚀
    </p>

    <p className="text-white/60 mt-2">
      Delivery ETA: within 48 hours ⏳
    </p>

    <p className="text-white/60 mt-2">
      Check your email for delivery 📬
    </p>
  </div>
)}


      {!submitted && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-10 space-y-6 overflow-hidden"
        >

          {/* FORM HEADER */}
          <h2
            className="
              text-center
              text-lg
              font-semibold
              mb-6
              bg-gradient-to-r
              from-emerald-400
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            ↓ FILL THIS OUT ↓
          </h2>
          {/* PRODUCT DESCRIPTION — REQUIRED */}
          <div className="flex flex-col">
            <label className="text-white/70 mb-1">
              Describe your product (what it does, key features) *
            </label>
            <textarea
              name="productDescription"
              required
              placeholder="Example: A portable blender with 6 stainless steel blades, USB‑C rechargeable, perfect for smoothies."
              className="bg-black/20 border border-border rounded-lg p-3 h-24"
            />
          </div>

          {/* UGC ACTOR */}
          <div className="flex flex-col">
            <label className="text-white/70 mb-1">
              Describe your UGC actor (age, vibe, ethnicity, etc.)
            </label>
            <input
              name="audience"
              className="bg-black/20 border border-border rounded-lg p-3"
            />
          </div>

          {/* VIDEO LENGTH — REQUIRED */}
          <UltraSelect
            label="Video Length *"
            name="videoLength"
            required={true}
            options={[
              { label: "15 seconds", value: "15" },
              { label: "30 seconds", value: "30" }
            ]}
          />

          {/* SCRIPT */}
          <div className="flex flex-col">
            <label className="text-white/70 mb-1">Script or Concept</label>
            <textarea
              name="script"
              placeholder="Describe the story, flow, or concept you want."
              className="bg-black/20 border border-border rounded-lg p-3 h-24"
            />
          </div>

          {/* AUDIO PREF — REQUIRED */}
          <UltraSelect
            label="Voiceover / Audio Preference *"
            name="voiceover"
            required={true}
            options={[
              { label: "Silent video", value: "silent" },
              { label: "Male Voice", value: "male" },
              { label: "Female Voice", value: "female" },
              { label: "No Voice – BUT I want background Music", value: "music" }
            ]}
            onChangeValue={(value) => setAudioPref(value)}
          />

          {/* MUSIC GENRE — CONDITIONAL */}
          {audioPref === "music" && (
            <div className="flex flex-col">
              <label className="text-white/70 mb-1">Music Genre</label>
              <input
                name="musicGenre"
                placeholder="Example: ambient, cinematic, upbeat, trap, lo-fi..."
                className="bg-black/20 border border-border rounded-lg p-3"
              />
            </div>
          )}

          {/* HOOK STYLE */}
          <UltraSelect
            label="Preferred Hook Style"
            name="hook"
            options={[
              { label: "Problem → Solution", value: "Problem → Solution" },
              { label: "Before / After", value: "Before / After" },
              { label: "Stop Scrolling", value: "Stop Scrolling" },
              { label: "POV", value: "POV" },
              { label: "TikTok Trend", value: "TikTok Trend" }
            ]}
          />

          {/* VIDEO STYLE */}
          <UltraSelect
            label="Video Style"
            name="style"
            options={[
              { label: "Clean + Modern", value: "Clean + Modern" },
              { label: "Fast + Punchy", value: "Fast + Punchy" },
              { label: "Emotional", value: "Emotional" },
              { label: "Story Driven", value: "Story Driven" },
              { label: "UGC Style", value: "UGC Style" }
            ]}
          />

          {/* CTA */}
          <UltraSelect
            label="Call To Action"
            name="cta"
            options={[
              { label: "Shop Now", value: "Shop Now" },
              { label: "Limited Time", value: "Limited Time" },
              { label: "Don’t Miss Out", value: "Don’t Miss Out" },
              { label: "Learn More", value: "Learn More" }
            ]}
          />

          {/* NOTES */}
          <div className="flex flex-col">
            <label className="text-white/70 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              className="bg-black/20 border border-border rounded-lg p-3 h-24"
            />
          </div>

          {/* PHOTOS — REQUIRED */}
          <div className="flex flex-col space-y-3">
            <label className="text-white/70 mb-1">
              Upload Product Photos (max {maxPhotos}) *
            </label>

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="
                border
                border-dashed
                border-[#8B5CF6]
                bg-black/20
                rounded-xl
                p-6
                flex
                flex-col
                items-center
                justify-center
                text-center
                cursor-pointer
                hover:border-[#7C3AED]
                hover:bg-black/30
                transition
              "
              onClick={() => {
                const input = document.getElementById("photo-input") as HTMLInputElement | null
                input?.click()
              }}
            >
              <p className="text-white/70 mb-2">
                Drag and drop up to {maxPhotos} photos here, or click to browse.
              </p>
              <p className="text-xs text-white/40">
                JPG / PNG, will be compressed for faster delivery.
              </p>
            </div>

            <input
              id="photo-input"
              type="file"
              multiple
              accept="image/*"
              onChange={onFileInputChange}
              className="hidden"
            />

            <div className="flex flex-wrap gap-3 mt-2">
              {photos.map((p, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-border"
                >
                  <img
                    src={p.previewUrl}
                    alt={`photo-${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="
                      absolute
                      top-1
                      right-1
                      bg-black/70
                      text-xs
                      px-2
                      py-1
                      rounded
                    "
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/50">
              {photos.length}/{maxPhotos} photos selected.
            </p>
          </div>

          {/* AUDIO UPLOAD */}
          <div className="flex flex-col space-y-3">
            <label className="text-white/70 mb-1">
              Upload Audio (voice or music) — max 1 file
            </label>

            <div
              className="
                border
                border-dashed
                border-[#8B5CF6]
                bg-black/20
                rounded-xl
                p-6
                flex
                flex-col
                items-center
                justify-center
                text-center
                cursor-pointer
                hover:border-[#7C3AED]
                hover:bg-black/30
                transition
              "
              onClick={() => {
                const input = document.getElementById("audio-input") as HTMLInputElement | null
                input?.click()
              }}
            >
              <p className="text-white/70 mb-2">
                Drag and drop or click to upload audio.
              </p>
              <p className="text-xs text-white/40">
                Accepted: MP3, WAV, AAC, M4A
              </p>
            </div>

            <input
              id="audio-input"
              type="file"
              accept="audio/*"
              onChange={(e) => handleAudioUpload(e.target.files)}
              className="hidden"
            />

            {audio && (
              <div className="flex items-center gap-3 mt-2 text-white/70">
                <span>{audio.name}</span>
                <button
                  type="button"
                  onClick={removeAudio}
                  className="text-xs bg-black/60 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* SMALL ORDER SUMMARY (subtle, italic) */}
          <div className="mt-10 mb-6 text-white/40 text-xs italic space-y-1">

            <p className="font-semibold text-white/50 mb-2">
              Order Summary
            </p>

            <p>Package Ordered: {stripeMeta.packageTier || stripeMeta.productName}</p>
            <p>
              Price Paid:{" "}
              {stripeMeta.priceAmount
                ? `${stripeMeta.priceAmount / 100} ${stripeMeta.priceCurrency?.toUpperCase()}`
                : "—"}
            </p>
            <p>Order ID: {stripeMeta.orderId || "—"}</p>
            <p>Customer Email: {stripeMeta.customerEmail || "—"}</p>
            <p>
              Purchase Time:{" "}
              {stripeMeta.purchaseTimestamp
                ? new Date(stripeMeta.purchaseTimestamp).toLocaleString()
                : "—"}
            </p>

          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || photos.length === 0}
            className="
              bg-[#8B5CF6]
              hover:bg-[#7C3AED]
              text-center
              py-3
              px-4
              rounded-xl
              shadow-glow
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Submitting..." : "Submit Assets"}
          </button>

        </form>
      )}

    </section>
  )
}
