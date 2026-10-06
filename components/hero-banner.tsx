"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Zap } from "lucide-react"
import { useTelegram } from "./telegram-provider"

export function HeroBanner() {
  const { hapticFeedback } = useTelegram()

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden border-2 border-primary">
      <Image
        src="/images/bot-20welcome-20image16x9-1280x720-20-281-29.png"
        alt="MemeScan - Your Bloomberg for Meme Coins"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
          <Badge className="bg-primary text-primary-foreground text-[10px] sm:text-xs">
            <Zap className="w-3 h-3 mr-1" />
            TON BLOCKCHAIN
          </Badge>
          <Badge variant="outline" className="border-accent text-accent text-[10px] sm:text-xs">
            <Shield className="w-3 h-3 mr-1" />
            DESIGN PREVIEW
          </Badge>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-4xl font-black font-[family-name:var(--font-orbitron)] mb-1 sm:mb-2 text-balance">
          <span className="text-primary text-glow">YOUR BLOOMBERG</span>
          <br />
          <span className="text-accent">FOR MEME COINS</span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mb-3 sm:mb-4 line-clamp-2">
          A preview of a TON meme coin dashboard. Every token and number here is sample data.
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a href="https://t.me/MemeScanTON_bot" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="font-bold text-xs" onClick={() => hapticFeedback("medium")}>
              <TrendingUp className="w-3 h-3 mr-1" />
              TELEGRAM BOT
            </Button>
          </a>
          <a href="https://x.com/MemeSealTON" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="font-bold text-xs border-primary text-primary bg-transparent"
            >
              FOLLOW US
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
