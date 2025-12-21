"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Coins, Sparkles, Zap, Crown, Gift } from "lucide-react"

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  icon: React.ReactNode
  type: "racer" | "boost" | "cosmetic" | "lootbox"
  stock?: number
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: "mystery-box",
    name: "Mystery Box",
    description: "Random reward inside!",
    price: 500,
    icon: <Gift className="w-6 h-6" />,
    type: "lootbox",
  },
  {
    id: "speed-boost",
    name: "Mega Boost x5",
    description: "5 extra race boosts",
    price: 200,
    icon: <Zap className="w-6 h-6" />,
    type: "boost",
  },
  {
    id: "whale-racer",
    name: "Whale Daddy",
    description: "Unlock legendary racer",
    price: 1000,
    icon: <Crown className="w-6 h-6" />,
    type: "racer",
  },
  {
    id: "golden-kart",
    name: "Golden Kart",
    description: "Cosmetic upgrade",
    price: 2500,
    icon: <Sparkles className="w-6 h-6" />,
    type: "cosmetic",
    stock: 10,
  },
]

export function RewardShop() {
  const [userPoints] = useState(1520)

  return (
    <Card className="border-chart-5/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-chart-5" />
            REWARD SHOP
          </CardTitle>
          <Badge variant="outline" className="border-chart-5 text-chart-5">
            <Coins className="h-3 w-3 mr-1" />
            {userPoints.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card/50">
            <div className="w-10 h-10 rounded-lg bg-chart-5/20 flex items-center justify-center text-chart-5">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">{item.name}</span>
                {item.stock && (
                  <Badge variant="outline" className="text-[10px] px-1">
                    {item.stock} left
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <Button size="sm" variant={userPoints >= item.price ? "default" : "outline"} className="h-8 text-xs">
              {item.price}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
