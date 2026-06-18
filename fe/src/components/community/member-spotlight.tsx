"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, Sparkles, Plus } from "lucide-react"

const topMembers = [
  { rank: 1, name: "Alex Rivers", handle: "@arivers", avatar: "/avatars/01.png", score: "12.4k", change: "+150" },
  { rank: 2, name: "Jordan Lee", handle: "@jlee_eco", avatar: "/avatars/02.png", score: "11.8k", change: "+120" },
  { rank: 3, name: "Taylor Swift", handle: "@tswift", avatar: "/avatars/03.png", score: "11.2k", change: "+85" },
  { rank: 4, name: "Casey Smith", handle: "@csmith", avatar: "/avatars/04.png", score: "10.5k", change: "+60" },
]

export function MemberSpotlight() {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-amber-500" /> Member Spotlight
        </CardTitle>
        <CardDescription>Top contributors this week.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          {topMembers.map((member, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border shadow-sm">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                  </Avatar>
                  {member.rank === 1 && (
                    <div className="absolute -top-2 -right-2 bg-amber-100 dark:bg-amber-900 border border-amber-400 rounded-full p-0.5">
                      <Award className="h-3 w-3 text-amber-500" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors cursor-pointer">{member.name}</span>
                  <span className="text-xs text-muted-foreground">{member.handle}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-sm">{member.score}</span>
                <span className="text-[10px] font-medium text-emerald-500 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> {member.change}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-2 text-xs font-medium h-8">View Full Leaderboard</Button>
      </CardContent>
    </Card>
  )
}
