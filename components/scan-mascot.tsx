"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTelegram } from "./telegram-provider"

export function ScanMascot() {
  const { showAlert, hapticFeedback } = useTelegram()

  return (
    <Card className="border-2 border-primary/30 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary neon-glow flex-shrink-0">
            <Image
              src="/images/memscan2brandingasset-20-281-29.png"
              alt="SCAN - MemeScan Mascot"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black font-[family-name:var(--font-orbitron)] mb-2">
              <span className="text-primary">MEET SCAN</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your tech-savvy frog guide to this preview. The charts and tokens SCAN shows you are samples; real token checks are not live yet.
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a href="https://x.com/MemeSealTON" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="font-bold text-xs" onClick={() => hapticFeedback("light")}>
                  FOLLOW ON X
                </Button>
              </a>
              <a href="https://notaryton.com/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-bold text-xs border-primary text-primary bg-transparent"
                  onClick={() => hapticFeedback("light")}
                >
                  NOTARYTON
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
