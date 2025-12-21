"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Rocket, Flame, Bitcoin, TrendingUp } from "lucide-react"

export function HeroBanner() {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-xl overflow-hidden border-2 border-primary">
      <Image src="/images/winner.jpeg" alt="Blockchain Burnout - To The Moon" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
          <Badge className="bg-primary text-primary-foreground text-[10px] sm:text-xs">
            <Rocket className="w-3 h-3 mr-1" />
            MOON MISSION
          </Badge>
          <Badge variant="outline" className="border-chart-1 text-chart-1 text-[10px] sm:text-xs">
            <Flame className="w-3 h-3 mr-1" />
            HOT
          </Badge>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-4xl font-black font-[family-name:var(--font-orbitron)] mb-1 sm:mb-2 text-balance">
          <span className="text-primary">BLOCKCHAIN</span> <span className="text-chart-5">BURNOUT</span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mb-3 sm:mb-4 line-clamp-2">
          Nation-state arbitrage. Zero-cost energy. Maximum gains.
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-1 text-chart-1">
            <Bitcoin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>BTC +12.4%</span>
          </div>
          <div className="flex items-center gap-1 text-chart-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>$2.8M P/L</span>
          </div>
        </div>
      </div>
    </div>
  )
}
