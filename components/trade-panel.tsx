"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { TrendingUp, TrendingDown, Zap } from "lucide-react"

export function TradePanel() {
  const [amount, setAmount] = useState("")
  const [leverage, setLeverage] = useState("1x")

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" fill="currentColor" />
          QUICK TRADE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="buy" className="data-[state=active]:bg-chart-1 data-[state=active]:text-black">
              <TrendingUp className="w-4 h-4 mr-2" />
              BUY/LONG
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-destructive data-[state=active]:text-white">
              <TrendingDown className="w-4 h-4 mr-2" />
              SELL/SHORT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="buy-amount" className="text-xs font-mono">
                AMOUNT (USD)
              </Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono">LEVERAGE</Label>
              <div className="grid grid-cols-5 gap-2">
                {["1x", "2x", "5x", "10x", "25x"].map((lev) => (
                  <Button
                    key={lev}
                    variant={leverage === lev ? "default" : "outline"}
                    size="sm"
                    className="font-mono font-bold"
                    onClick={() => setLeverage(lev)}
                  >
                    {lev}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Est. Entry</span>
                <span className="font-bold">$43,782.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Position Size</span>
                <span className="font-bold">
                  {amount ? `$${(Number.parseFloat(amount) * Number.parseFloat(leverage)).toLocaleString()}` : "$0"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Liq. Price</span>
                <span className="font-bold text-destructive">$39,804.00</span>
              </div>
            </div>

            <Button className="w-full h-12 text-lg font-bold bg-chart-1 hover:bg-chart-1/90 text-black">
              <TrendingUp className="w-5 h-5 mr-2" />
              SEND IT
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sell-amount" className="text-xs font-mono">
                AMOUNT (USD)
              </Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono">LEVERAGE</Label>
              <div className="grid grid-cols-5 gap-2">
                {["1x", "2x", "5x", "10x", "25x"].map((lev) => (
                  <Button
                    key={lev}
                    variant={leverage === lev ? "default" : "outline"}
                    size="sm"
                    className="font-mono font-bold"
                    onClick={() => setLeverage(lev)}
                  >
                    {lev}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Est. Entry</span>
                <span className="font-bold">$43,782.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Position Size</span>
                <span className="font-bold">
                  {amount ? `$${(Number.parseFloat(amount) * Number.parseFloat(leverage)).toLocaleString()}` : "$0"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-mono">Liq. Price</span>
                <span className="font-bold text-destructive">$47,760.00</span>
              </div>
            </div>

            <Button className="w-full h-12 text-lg font-bold bg-destructive hover:bg-destructive/90">
              <TrendingDown className="w-5 h-5 mr-2" />
              SHORT IT
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
