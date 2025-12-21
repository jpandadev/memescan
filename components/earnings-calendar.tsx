import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const earnings = [
  { symbol: "TSLA", name: "Tesla Inc", date: "Jan 24", time: "AMC", estimate: "$0.78", badge: "TODAY" },
  { symbol: "NFLX", name: "Netflix", date: "Jan 24", time: "AMC", estimate: "$2.17", badge: "TODAY" },
  { symbol: "MSFT", name: "Microsoft", date: "Jan 25", time: "AMC", estimate: "$2.78", badge: "TOMORROW" },
  { symbol: "AAPL", name: "Apple", date: "Jan 26", time: "AMC", estimate: "$2.10", badge: "" },
  { symbol: "META", name: "Meta", date: "Jan 26", time: "AMC", estimate: "$4.95", badge: "" },
  { symbol: "GOOGL", name: "Alphabet", date: "Jan 27", time: "AMC", estimate: "$1.58", badge: "" },
]

export function EarningsCalendar() {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          EARNINGS CALENDAR
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnings.map((earning) => (
            <div
              key={earning.symbol}
              className="p-4 bg-muted/50 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-lg">{earning.symbol}</div>
                  <div className="text-xs text-muted-foreground">{earning.name}</div>
                </div>
                {earning.badge && (
                  <Badge className="bg-primary text-primary-foreground font-bold text-xs">{earning.badge}</Badge>
                )}
              </div>

              <div className="space-y-1 mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">DATE</span>
                  <span className="font-bold">{earning.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">TIME</span>
                  <span className="font-bold">{earning.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">EST EPS</span>
                  <span className="font-bold">{earning.estimate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
