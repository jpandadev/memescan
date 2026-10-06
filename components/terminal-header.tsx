"use client"

import { Settings, Menu, ExternalLink, Gamepad2, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { useTelegram } from "./telegram-provider"

export function TerminalHeader() {
  const { user, isInTelegram } = useTelegram()

  return (
    <header className="border-b-2 border-primary bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border-2 border-primary neon-glow">
                <Image
                  src="/images/profile-20picture-20memescanton-bot-400x400-20-282-29.png"
                  alt="MemeScan"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight font-[family-name:var(--font-orbitron)]">
                  <span className="text-primary text-glow">MEME</span>
                  <span className="text-accent">SCAN</span>
                </h1>
                <div className="text-[8px] sm:text-[10px] font-mono text-muted-foreground tracking-wider flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  BLOOMBERG FOR MEMES
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 ml-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="font-bold text-primary">
                  SCANNER
                </Button>
              </Link>
              <Link href="/cryptokart">
                <Button variant="ghost" size="sm" className="font-bold text-chart-5 flex items-center gap-1">
                  <Gamepad2 className="h-4 w-4" />
                  CRYPTOKART
                </Button>
              </Link>
              <Link href="/rewards">
                <Button variant="ghost" size="sm" className="font-bold text-destructive flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  REWARDS
                </Button>
              </Link>
              <Link href="/crypto">
                <Button variant="ghost" size="sm" className="font-bold">
                  TRENDING
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost" size="sm" className="font-bold">
                  WATCHLIST
                </Button>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1 ml-4">
              <div className="px-2 sm:px-3 py-1 bg-chart-5/20 border border-chart-5/50 rounded text-[10px] sm:text-xs font-bold text-chart-5">
                PREVIEW
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Social Links */}
            <a
              href="https://x.com/MemeSealTON"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Button>
            </a>
            <a
              href="https://notaryton.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full">
                    SCANNER
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cryptokart" className="w-full flex items-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-chart-5" />
                    CRYPTOKART
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/rewards" className="w-full flex items-center gap-2">
                    <Flame className="h-4 w-4 text-destructive" />
                    REWARDS
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/crypto" className="w-full">
                    TRENDING
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portfolio" className="w-full">
                    WATCHLIST
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://x.com/MemeSealTON" target="_blank" rel="noopener noreferrer">
                    Twitter/X
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://notaryton.com/" target="_blank" rel="noopener noreferrer">
                    NotaryTON
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex h-8 w-8 opacity-50 cursor-not-allowed"
              disabled
              title="Settings coming soon"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {/* User display for Telegram Mini App */}
            {isInTelegram && user ? (
              <div className="flex items-center gap-2 px-2 py-1 bg-primary/20 border border-primary/50 rounded">
                <span className="text-xs font-mono text-primary truncate max-w-[80px]">
                  {user.username || user.first_name}
                </span>
              </div>
            ) : (
              <Link href="/rewards">
                <Button variant="default" size="sm" className="font-bold text-xs h-8">
                  CONNECT
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
