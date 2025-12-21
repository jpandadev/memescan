"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Zap, Sparkles } from "lucide-react"

const traders = [
  {
    name: "DONNY PUMP",
    title: "Gold Standard Oracle",
    image: "/images/donnypump.jpeg",
    pnl: "+847%",
    specialty: "PUMP CALLS",
    status: "BULLISH",
    isUp: true,
  },
  {
    name: "SISTER SLEDGE",
    title: "Drift Gangster",
    image: "/images/sister.jpeg",
    pnl: "+1,247%",
    specialty: "STEALTH OPS",
    status: "DIAMOND",
    isUp: true,
  },
  {
    name: "LIL' ROCKET",
    title: "Hash Rate Supreme",
    image: "/images/lilrocket.jpeg",
    pnl: "+2,891%",
    specialty: "BTC MINING",
    status: "NUCLEAR",
    isUp: true,
  },
  {
    name: "VLAD THE IMPALA",
    title: "Energy Arbitrage",
    image: "/images/vladman.jpeg",
    pnl: "+456%",
    specialty: "GAS PLAYS",
    status: "COLD GAINS",
    isUp: true,
  },
]

export function TraderCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-lg sm:text-xl font-black font-[family-name:var(--font-orbitron)]">TOP DRIFT GANGSTERS</h2>
        <Badge variant="outline" className="text-chart-1 border-chart-1">
          LIVE
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {traders.map((trader, index) => (
          <Card
            key={trader.name}
            className="overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={trader.image || "/placeholder.svg"}
                alt={trader.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-chart-1/90 text-chart-1-foreground text-[10px] sm:text-xs font-bold">
                  {trader.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {trader.pnl}
                </Badge>
              </div>
            </div>
            <CardContent className="p-2 sm:p-3 space-y-1">
              <h3 className="font-black text-xs sm:text-sm truncate text-primary">{trader.name}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{trader.title}</p>
              <div className="flex items-center justify-between gap-1 pt-1">
                <Badge variant="secondary" className="text-[9px] sm:text-[10px] px-1 sm:px-2 truncate">
                  <Zap className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1 flex-shrink-0" />
                  <span className="truncate">{trader.specialty}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[9px] sm:text-[10px] text-chart-2 border-chart-2 px-1 sm:px-2 truncate"
                >
                  {trader.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
