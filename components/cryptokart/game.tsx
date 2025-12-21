"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flag, Zap, Trophy, Coins, Play, RotateCcw } from "lucide-react"

interface RaceState {
  isRacing: boolean
  countdown: number | null
  positions: { [key: string]: number }
  winner: string | null
  betAmount: number
  potentialWin: number
}

const OPPONENTS = [
  { id: "elon", name: "Rocket Man", color: "bg-blue-500" },
  { id: "pepe", name: "Lord Pepe", color: "bg-green-500" },
  { id: "whale", name: "Whale Daddy", color: "bg-cyan-500" },
]

export function CryptoKartGame() {
  const [raceState, setRaceState] = useState<RaceState>({
    isRacing: false,
    countdown: null,
    positions: { player: 0, elon: 0, pepe: 0, whale: 0 },
    winner: null,
    betAmount: 100,
    potentialWin: 400,
  })
  const [userPoints, setUserPoints] = useState(1000)
  const [boostAvailable, setBoostAvailable] = useState(true)

  const startRace = useCallback(() => {
    if (userPoints < raceState.betAmount) return

    setUserPoints((prev) => prev - raceState.betAmount)
    setRaceState((prev) => ({
      ...prev,
      countdown: 3,
      positions: { player: 0, elon: 0, pepe: 0, whale: 0 },
      winner: null,
    }))
    setBoostAvailable(true)
  }, [raceState.betAmount, userPoints])

  // Countdown timer
  useEffect(() => {
    if (raceState.countdown === null) return
    if (raceState.countdown > 0) {
      const timer = setTimeout(() => {
        setRaceState((prev) => ({ ...prev, countdown: prev.countdown! - 1 }))
      }, 1000)
      return () => clearTimeout(timer)
    } else if (raceState.countdown === 0) {
      setRaceState((prev) => ({ ...prev, isRacing: true, countdown: null }))
    }
  }, [raceState.countdown])

  // Race simulation
  useEffect(() => {
    if (!raceState.isRacing) return

    const interval = setInterval(() => {
      setRaceState((prev) => {
        const newPositions = { ...prev.positions }

        // Move each racer with some randomness
        Object.keys(newPositions).forEach((racer) => {
          const baseSpeed = racer === "player" ? 3 : 2.5
          const randomBoost = Math.random() * 2
          newPositions[racer] = Math.min(100, newPositions[racer] + baseSpeed + randomBoost)
        })

        // Check for winner
        const winner = Object.entries(newPositions).find(([_, pos]) => pos >= 100)?.[0] || null

        if (winner) {
          // Award points if player won
          if (winner === "player") {
            setTimeout(() => {
              setUserPoints((p) => p + prev.potentialWin)
            }, 500)
          }
          return { ...prev, positions: newPositions, winner, isRacing: false }
        }

        return { ...prev, positions: newPositions }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [raceState.isRacing])

  const useBoost = () => {
    if (!boostAvailable || !raceState.isRacing) return
    setBoostAvailable(false)
    setRaceState((prev) => ({
      ...prev,
      positions: {
        ...prev.positions,
        player: Math.min(100, prev.positions.player + 15),
      },
    }))
  }

  const setBet = (amount: number) => {
    setRaceState((prev) => ({
      ...prev,
      betAmount: amount,
      potentialWin: amount * 4,
    }))
  }

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            RACE TRACK
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-chart-5 text-chart-5">
              <Coins className="h-3 w-3 mr-1" />
              {userPoints.toLocaleString()} PTS
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Race Track */}
        <div className="relative p-4 rounded-lg border border-border bg-card/50 space-y-3">
          {/* Finish line */}
          <div className="absolute right-4 top-0 bottom-0 w-1 bg-primary/30" />
          <div className="absolute right-2 top-2 text-xs font-mono text-primary">FINISH</div>

          {/* Player track */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono w-20 truncate text-primary">YOU</span>
              <div className="flex-1 h-8 bg-muted/50 rounded relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-primary/20 transition-all duration-100"
                  style={{ width: `${raceState.positions.player}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs transition-all duration-100"
                  style={{ left: `calc(${raceState.positions.player}% - 12px)` }}
                >
                  D
                </div>
              </div>
            </div>
          </div>

          {/* Opponent tracks */}
          {OPPONENTS.map((opp) => (
            <div key={opp.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono w-20 truncate text-muted-foreground">{opp.name}</span>
                <div className="flex-1 h-8 bg-muted/50 rounded relative overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 bottom-0 ${opp.color} opacity-20 transition-all duration-100`}
                    style={{ width: `${raceState.positions[opp.id]}%` }}
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 ${opp.color} rounded-full flex items-center justify-center text-xs text-white transition-all duration-100`}
                    style={{ left: `calc(${raceState.positions[opp.id]}% - 12px)` }}
                  >
                    {opp.name[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown overlay */}
        {raceState.countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-20">
            <div className="text-6xl font-bold text-primary text-glow animate-pulse">
              {raceState.countdown || "GO!"}
            </div>
          </div>
        )}

        {/* Winner announcement */}
        {raceState.winner && (
          <div
            className={`p-4 rounded-lg border ${raceState.winner === "player" ? "border-primary bg-primary/20" : "border-destructive bg-destructive/20"}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy className={`h-6 w-6 ${raceState.winner === "player" ? "text-primary" : "text-destructive"}`} />
              <span className="font-bold text-lg">
                {raceState.winner === "player" ? `YOU WON +${raceState.potentialWin} PTS!` : "REKT! TRY AGAIN"}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Bet selector */}
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-2">BET AMOUNT</div>
            <div className="flex gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  variant={raceState.betAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBet(amount)}
                  disabled={raceState.isRacing || raceState.countdown !== null}
                  className="flex-1"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Win potential */}
          <div className="text-center sm:text-right">
            <div className="text-xs text-muted-foreground mb-1">POTENTIAL WIN</div>
            <div className="text-2xl font-bold text-chart-5">{raceState.potentialWin}</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {!raceState.isRacing && raceState.countdown === null ? (
            <Button
              onClick={startRace}
              disabled={userPoints < raceState.betAmount}
              className="flex-1 h-12 text-lg"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2" />
              START RACE ({raceState.betAmount} PTS)
            </Button>
          ) : raceState.isRacing ? (
            <Button
              onClick={useBoost}
              disabled={!boostAvailable}
              variant="outline"
              className="flex-1 h-12 text-lg border-chart-5 text-chart-5 hover:bg-chart-5/20 bg-transparent"
              size="lg"
            >
              <Zap className="h-5 w-5 mr-2" />
              {boostAvailable ? "USE BOOST!" : "BOOST USED"}
            </Button>
          ) : raceState.winner ? (
            <Button onClick={startRace} className="flex-1 h-12 text-lg" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              RACE AGAIN
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
