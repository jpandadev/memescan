"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap, Shield, Gauge } from "lucide-react"

interface Racer {
  id: string
  name: string
  title: string
  avatar: string
  speed: number
  luck: number
  defense: number
  special: string
  unlocked: boolean
  unlockCost?: number
}

const RACERS: Racer[] = [
  {
    id: "donny",
    name: "Donny Pump",
    title: "The Golden Bull",
    avatar: "/images/donnypump.jpeg",
    speed: 85,
    luck: 95,
    defense: 60,
    special: "PUMP IT - 2x speed for 3 seconds",
    unlocked: true,
  },
  {
    id: "elon",
    name: "Rocket Man",
    title: "Mars or Bust",
    avatar: "/elon-musk-cartoon-racer.jpg",
    speed: 95,
    luck: 70,
    defense: 50,
    special: "TO THE MOON - Instant boost",
    unlocked: true,
  },
  {
    id: "pepe",
    name: "Lord Pepe",
    title: "Meme King",
    avatar: "/images/profile-20picture-20memescanton-bot-400x400-20-282-29.png",
    speed: 70,
    luck: 100,
    defense: 70,
    special: "RARE PEPE - Random power-up",
    unlocked: true,
  },
  {
    id: "whale",
    name: "Whale Daddy",
    title: "Deep Pockets",
    avatar: "/crypto-whale-cartoon-racer.jpg",
    speed: 60,
    luck: 80,
    defense: 100,
    special: "MARKET BUY - Slows all opponents",
    unlocked: false,
    unlockCost: 1000,
  },
  {
    id: "degen",
    name: "Max Leverage",
    title: "100x or Nothing",
    avatar: "/gambling-degen-cartoon-racer.jpg",
    speed: 100,
    luck: 50,
    defense: 30,
    special: "LIQUIDATION - All or nothing bet",
    unlocked: false,
    unlockCost: 2500,
  },
  {
    id: "diamond",
    name: "Diamond Hands",
    title: "Never Selling",
    avatar: "/diamond-hands-cartoon-racer.jpg",
    speed: 75,
    luck: 75,
    defense: 90,
    special: "HODL - Immune to attacks for 5s",
    unlocked: false,
    unlockCost: 5000,
  },
]

export function RacerSelect() {
  const [selectedRacer, setSelectedRacer] = useState<string>("donny")

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-mono flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          SELECT YOUR RACER
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {RACERS.map((racer) => (
            <button
              key={racer.id}
              onClick={() => racer.unlocked && setSelectedRacer(racer.id)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                selectedRacer === racer.id
                  ? "border-primary bg-primary/20 neon-glow"
                  : racer.unlocked
                    ? "border-border hover:border-primary/50 bg-card"
                    : "border-border/50 bg-card/50 opacity-60"
              }`}
            >
              {!racer.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
                  <div className="text-center">
                    <Lock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <span className="text-[10px] text-primary font-mono">{racer.unlockCost} PTS</span>
                  </div>
                </div>
              )}
              <img
                src={racer.avatar || "/placeholder.svg"}
                alt={racer.name}
                className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full border-2 border-primary/30 object-cover"
                crossOrigin="anonymous"
              />
              <div className="mt-2 text-center">
                <div className="text-xs font-bold truncate">{racer.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{racer.title}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Racer Stats */}
        {selectedRacer && (
          <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
            {(() => {
              const racer = RACERS.find((r) => r.id === selectedRacer)!
              return (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={racer.avatar || "/placeholder.svg"}
                      alt={racer.name}
                      className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                      crossOrigin="anonymous"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{racer.name}</h3>
                      <p className="text-sm text-muted-foreground">{racer.title}</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Zap className="h-3 w-3" /> SPEED
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${racer.speed}%` }} />
                      </div>
                      <div className="text-xs font-mono text-right mt-1">{racer.speed}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <span className="text-xs">7</span> LUCK
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-chart-5" style={{ width: `${racer.luck}%` }} />
                      </div>
                      <div className="text-xs font-mono text-right mt-1">{racer.luck}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Shield className="h-3 w-3" /> DEF
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${racer.defense}%` }} />
                      </div>
                      <div className="text-xs font-mono text-right mt-1">{racer.defense}</div>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <Badge variant="outline" className="border-primary text-primary">
                      {racer.special}
                    </Badge>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
