"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, MessageSquare, ArrowUpRight } from "lucide-react"

const trendingTopics = [
  { rank: 1, title: "Zero Waste alternatives for 2026", posts: "1.2k" },
  { rank: 2, title: "New York Community Cleanup", posts: "840" },
  { rank: 3, title: "Best EV Chargers for home", posts: "620" },
]

export function TrendingInsights() {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-rose-500" /> Trending Now
        </CardTitle>
        <CardDescription>Fastest growing topics today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          {trendingTopics.map((topic, i) => (
            <div key={i} className="flex items-start gap-3 group cursor-pointer">
              <span className="font-bold text-muted-foreground w-4 mt-0.5">{topic.rank}</span>
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors flex items-start justify-between">
                  {topic.title}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MessageSquare className="h-3 w-3" /> {topic.posts} posts
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
