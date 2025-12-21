"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Gift, Clock, Zap, Trophy } from "lucide-react"

export function DailyStreak() {
  const [streak, setStreak] = useState(7)
  const [claimed, setClaimed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 })

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const claimReward = () => {
    setClaimed(true)
    setStreak((s) => s + 1)
  }

  const streakRewards = [
    { day: 1, points: 10, claimed: true },
    { day: 2, points: 20, claimed: true },
    { day: 3, points: 30, claimed: true },
    { day: 4, points: 50, claimed: true },
    { day: 5, points: 75, claimed: true },
    { day: 6, points: 100, claimed: true },
    { day: 7, points: 200, claimed: claimed, bonus: "Mystery Box" },
  ]

  return (
    <Card className="border-destructive/50 overflow-hidden">
      <div className="bg-gradient-to-r from-destructive/30 via-destructive/10 to-chart-5/30 p-1">
        <CardContent className="p-4 sm:p-6 bg-card rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-destructive/20 border-4 border-destructive flex items-center justify-center">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
                </div>
                <Badge className="absolute -bottom-1 -right-1 bg-chart-5 text-background font-bold">{streak}</Badge>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <span className="text-destructive">{streak} DAY</span> STREAK
                </h2>
                <p className="text-sm text-muted-foreground">Keep it going! Next reward in:</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="font-mono text-accent">
                    {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={claimReward}
              disabled={claimed}
              className={`h-12 px-6 ${claimed ? "" : "bg-destructive hover:bg-destructive/90 animate-pulse"}`}
            >
              <Gift className="w-5 h-5 mr-2" />
              {claimed ? "CLAIMED TODAY" : "CLAIM REWARD"}
            </Button>
          </div>

          {/* Streak calendar */}
          <div className="grid grid-cols-7 gap-2">
            {streakRewards.map((day) => (
              <div
                key={day.day}
                className={`relative p-2 sm:p-3 rounded-lg border text-center ${
                  day.claimed
                    ? "bg-destructive/20 border-destructive"
                    : day.day === 7
                      ? "bg-chart-5/20 border-chart-5 border-dashed"
                      : "bg-muted/50 border-border"
                }`}
              >
                <div className="text-[10px] text-muted-foreground mb-1">DAY {day.day}</div>
                <div className={`font-bold ${day.claimed ? "text-destructive" : "text-muted-foreground"}`}>
                  {day.bonus ? (
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-chart-5" />
                  ) : (
                    <span className="text-xs sm:text-sm">+{day.points}</span>
                  )}
                </div>
                {day.claimed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-background" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Streak multiplier */}
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Streak Multiplier</span>
              <Badge variant="outline" className="border-chart-5 text-chart-5 font-bold">
                {streak >= 30 ? "3.0x" : streak >= 14 ? "2.0x" : streak >= 7 ? "1.5x" : "1.0x"} POINTS
              </Badge>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-destructive to-chart-5"
                style={{ width: `${Math.min(100, (streak / 30) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>7 days = 1.5x</span>
              <span>14 days = 2x</span>
              <span>30 days = 3x</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
