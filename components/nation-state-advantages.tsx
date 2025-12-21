"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { fetchInterestRates, fetchForexRates } from "@/lib/api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, Zap, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface InterestRateData {
  central_bank_rates: Array<{
    country: string
    rate_pct: number
  }>
}

export function NationStateAdvantages() {
  const [interestRates, setInterestRates] = useState<InterestRateData | null>(null)
  const [forexRate, setForexRate] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const [rates, forex] = await Promise.all([fetchInterestRates(), fetchForexRates()])
      setInterestRates(rates)
      setForexRate(forex)
      setLoading(false)
    }

    loadData()
    const interval = setInterval(loadData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const borrowingCostData =
    interestRates?.central_bank_rates?.map((rate) => ({
      country: rate.country,
      rate: rate.rate_pct,
    })) || []

  const electricityData = [
    { country: "NK", cost: 15, source: "State" },
    { country: "RU", cost: 35, source: "Est." },
    { country: "JP", cost: 120, source: "JEPX" },
    { country: "USA", cost: 85, source: "EIA" },
    { country: "DE", cost: 140, source: "EPEX" },
  ]

  if (loading) {
    return (
      <Card className="border-2 border-primary/30">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-xl font-bold flex items-center gap-2">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="truncate">NATION-STATE ALPHA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="text-muted-foreground text-sm">Loading real data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/30 overflow-hidden">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-base sm:text-xl font-bold flex flex-wrap items-center gap-2">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <span>NATION-STATE ALPHA</span>
          <Badge variant="outline" className="text-chart-1 border-chart-1 text-[10px] sm:text-xs">
            LIVE DATA
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-muted/50 border border-primary/30 rounded-lg p-3 sm:p-4">
          <div className="relative w-full sm:w-32 h-32 sm:h-24 rounded-lg overflow-hidden border-2 border-primary flex-shrink-0">
            <Image
              src="/images/sister2.jpeg"
              alt="Sister Sledge - Drift Gangster"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-bold text-primary text-sm sm:text-base">SISTER SLEDGE</h3>
              <Badge className="bg-chart-1 text-[10px]">ADVISOR</Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
              "Yen carry trade is free money. Borrow at 0.25% in Japan, deploy to BTC mining in low-cost energy zones.
              This is how nation-states print money - and now you can too."
            </p>
          </div>
        </div>

        {/* Forex Rates - improved responsive */}
        <div className="bg-muted/50 border border-primary/30 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <h3 className="text-sm sm:text-lg font-bold">FOREX RATES</h3>
          </div>
          {forexRate && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate">USD/JPY</div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary truncate">
                  {forexRate.rates?.JPY?.toFixed(1) || "157.4"}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate">USD/EUR</div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-chart-4 truncate">
                  {forexRate.rates?.EUR?.toFixed(2) || "0.92"}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate">USD/CNY</div>
                <div className="text-lg sm:text-2xl md:text-3xl font-bold text-chart-3 truncate">
                  {forexRate.rates?.CNY?.toFixed(2) || "7.24"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cost of Capital Chart - improved responsive */}
        <div>
          <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
            <span className="text-primary">◆</span>
            <span className="truncate">COST OF CAPITAL (%)</span>
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={borrowingCostData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="country"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industrial Electricity Costs Chart - improved responsive */}
        <div>
          <h3 className="text-sm sm:text-lg font-bold mb-2 sm:mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-chart-1 flex-shrink-0" />
            <span className="truncate">MINING POWER COST (USD/MWh)</span>
          </h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={electricityData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="country"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="cost" fill="hsl(var(--chart-1))" name="Cost" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground">
            * NK and RU costs are estimates. Low energy = high mining margins.
          </div>
        </div>

        {/* Carry Trade Insight - improved responsive */}
        {forexRate && borrowingCostData.length > 0 && (
          <div className="bg-chart-1/10 border border-chart-1 rounded-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm font-bold text-chart-1 mb-1 sm:mb-2">YEN CARRY TRADE ALPHA</div>
            <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
              USD/JPY at {forexRate.rates?.JPY?.toFixed(1) || "157.4"} with BOJ rates near zero = free leverage for BTC
              accumulation. This is the drift gangster way.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
