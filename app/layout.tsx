import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TelegramProvider } from "@/components/telegram-provider"
import { MatrixRain } from "@/components/matrix-rain"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "MemeScan - Your Bloomberg for Meme Coins | CryptoKart",
  description:
    "The ultimate meme coin scanner for TON blockchain. Track trending tokens, detect rug pulls, find 100x gems, and race in CryptoKart!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MemeScan",
  },
  openGraph: {
    title: "MemeScan - Your Bloomberg for Meme Coins",
    description: "The ultimate meme coin scanner for TON blockchain",
    images: [
      {
        url: "/images/memescanwide2-20-281-29.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemeScan - Your Bloomberg for Meme Coins",
    description: "The ultimate meme coin scanner for TON blockchain",
    images: ["/images/memescanwide2-20-281-29.png"],
  },
  icons: {
    icon: [
      {
        url: "/images/profile-20picture-20memescanton-bot-400x400-20-282-29.png",
        sizes: "192x192",
      },
    ],
    apple: "/images/profile-20picture-20memescanton-bot-400x400-20-282-29.png",
  },
    generator: 'v0.app'
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
          <div className="relative z-10">{children}</div>
        </TelegramProvider>
        <Analytics />
      </body>
    </html>
  )
}
