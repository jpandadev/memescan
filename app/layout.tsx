import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Orbitron } from "next/font/google"
import { TelegramProvider } from "@/components/telegram-provider"
import { MatrixRain } from "@/components/matrix-rain"
import { EcosystemFooter } from "@/components/ecosystem-footer"
import { DemoBanner } from "@/components/demo-banner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "MemeScan - Meme Coin Dashboard Preview for TON",
  description:
    "A design preview of a meme coin dashboard for TON, shown with sample data. Not live market data, not financial advice.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://memescan.ton.app"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MemeScan",
  },
  openGraph: {
    type: "website",
    siteName: "MemeScan",
    title: "MemeScan - Meme Coin Dashboard Preview for TON",
    description: "A design preview of a meme coin dashboard for TON, shown with sample data. Not live market data, not financial advice.",
    url: "https://memescan.ton.app",
    images: [
      {
        url: "/media/og/memescan-og.png",
        width: 1200,
        height: 630,
        alt: "MemeScan - Meme Coin Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MemeSealTON",
    creator: "@MemeSealTON",
    title: "MemeScan - Meme Coin Dashboard Preview for TON",
    description: "A design preview of a meme coin dashboard for TON, shown with sample data. Not financial advice.",
    images: ["/media/og/memescan-og.png"],
  },
  icons: {
    icon: [
      { url: "/media/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/media/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/media/icons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/media/icons/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/media/icons/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["memecoin", "TON", "blockchain", "crypto", "dashboard", "design preview", "CryptoKart"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0a1a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" />
      </head>
      <body className={`font-sans antialiased ${_orbitron.variable}`}>
        <MatrixRain />
        <TelegramProvider>
          <div className="relative z-10 min-h-screen flex flex-col">
            <div className="flex-1">{children}</div>
            <EcosystemFooter />
            <DemoBanner />
          </div>
        </TelegramProvider>
      </body>
    </html>
  )
}
