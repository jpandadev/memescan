import { Settings, User, Bitcoin, Briefcase, Newspaper, Flame, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

export function TerminalHeader() {
  return (
    <header className="border-b-2 border-primary bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-primary neon-glow">
                <Image src="/images/winner.jpeg" alt="Blockchain Burnout Logo" fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight font-[family-name:var(--font-orbitron)]">
                  <span className="text-primary">BLOCKCHAIN</span>
                  <span className="text-chart-5 ml-1">BURNOUT</span>
                </h1>
                <div className="text-[9px] sm:text-[10px] font-mono text-muted-foreground tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-chart-3" />
                  DRIFT GANGSTER EDITION
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 ml-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="font-bold">
                  TERMINAL
                </Button>
              </Link>
              <Link href="/crypto">
                <Button variant="ghost" size="sm" className="font-bold">
                  <Bitcoin className="w-4 h-4 mr-2" />
                  CRYPTO
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost" size="sm" className="font-bold">
                  <Briefcase className="w-4 h-4 mr-2" />
                  PORTFOLIO
                </Button>
              </Link>
              <Link href="/news">
                <Button variant="ghost" size="sm" className="font-bold">
                  <Newspaper className="w-4 h-4 mr-2" />
                  NEWS
                </Button>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1 ml-4">
              <div className="px-2 sm:px-3 py-1 bg-chart-1/20 border border-chart-1/50 rounded text-[10px] sm:text-xs font-bold text-chart-1">
                MARKETS LIVE
              </div>
              <div className="px-2 sm:px-3 py-1 bg-muted rounded text-[10px] sm:text-xs font-mono text-muted-foreground">
                24/7 DEGEN
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full">
                    TERMINAL
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/crypto" className="w-full">
                    CRYPTO
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portfolio" className="w-full">
                    PORTFOLIO
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/news" className="w-full">
                    NEWS
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="default" size="sm" className="font-bold text-xs sm:text-sm">
              <User className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">WHALE</span> ACCESS
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
