import "./globals.css"

export const metadata = {
  title: "Vaylo",
  description: "AI product video ads",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text antialiased">

        <img
          src="/logo.png"
          alt="Vaylo"
          className="h-8 w-auto absolute top-9 left-6 z-50"
        />

        <main>
          {children}
        </main>

      </body>
    </html>
  )
}
