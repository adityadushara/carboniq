"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Target, Leaf, ChevronUp, ChevronDown, Minus, ArrowUpRight, Trophy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const leaderboardData = [
  { rank: 4, name: "Casey Smith", score: 10500, saved: "410 kg", goals: 12, streak: 5, change: 5, badges: ["Early Adopter"], avatar: "/avatars/04.png", initials: "CS" },
  { rank: 5, name: "Jamie Doe", score: 9800, saved: "380 kg", goals: 10, streak: 2, change: -2, badges: [], avatar: "/avatars/05.png", initials: "JD" },
  { rank: 6, name: "Riley Brown", score: 9400, saved: "320 kg", goals: 8, streak: 12, change: 1, badges: ["Streak Master"], avatar: "/avatars/06.png", initials: "RB" },
  { rank: 7, name: "You (Demo User)", score: 8950, saved: "290 kg", goals: 7, streak: 14, change: 3, badges: ["Eco Warrior"], avatar: "", initials: "ME", isCurrentUser: true },
  { rank: 8, name: "Morgan White", score: 8500, saved: "270 kg", goals: 6, streak: 0, change: -1, badges: [], avatar: "/avatars/08.png", initials: "MW" },
  { rank: 9, name: "Sam Green", score: 8200, saved: "250 kg", goals: 5, streak: 3, change: 0, badges: [], avatar: "/avatars/09.png", initials: "SG" },
  { rank: 10, name: "Drew Black", score: 7900, saved: "210 kg", goals: 4, streak: 1, change: -2, badges: [], avatar: "/avatars/10.png", initials: "DB" },
]

export function MainLeaderboardTable() {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const renderChangeIcon = (change: number) => {
    if (change > 0) return <span className="flex items-center text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs"><ChevronUp className="h-3 w-3 mr-0.5" />{change}</span>
    if (change < 0) return <span className="flex items-center text-destructive bg-destructive/10 px-1.5 py-0.5 rounded text-xs"><ChevronDown className="h-3 w-3 mr-0.5" />{Math.abs(change)}</span>
    return <span className="flex items-center text-muted-foreground px-1.5 py-0.5 rounded text-xs"><Minus className="h-3 w-3" /></span>
  }

  return (
    <div className="space-y-4">
      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium text-right">Score</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Carbon Saved</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Goals</th>
                <th className="px-6 py-4 font-medium hidden sm:table-cell">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaderboardData.map((user) => (
                <tr 
                  key={user.rank} 
                  onClick={() => setSelectedUser(user)}
                  className={`group cursor-pointer transition-colors hover:bg-muted/50 ${user.isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold w-6 text-center ${user.isCurrentUser ? 'text-primary' : 'text-muted-foreground'}`}>#{user.rank}</span>
                      {renderChangeIcon(user.change)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className={`font-semibold ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </span>
                        {user.badges.length > 0 && (
                          <div className="flex gap-1 mt-0.5 hidden md:flex">
                            {user.badges.map((b, i) => <Badge key={i} variant="secondary" className="text-[10px] px-1 py-0 h-4">{b}</Badge>)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="font-bold text-base">{user.score.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-emerald-500" /> {user.saved}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Target className="h-3.5 w-3.5 text-blue-500" /> {user.goals}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Flame className={`h-4 w-4 ${user.streak > 0 ? 'text-orange-500' : 'text-muted-foreground opacity-50'}`} />
                      {user.streak > 0 ? `${user.streak} Days` : '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Showing 4-10 of 2,450 users</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Profile Preview Modal */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedUser && (
            <>
              <DialogHeader className="flex flex-col items-center sm:items-start text-center sm:text-left pt-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-2xl">{selectedUser.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <DialogTitle className="text-2xl">{selectedUser.name}</DialogTitle>
                    <DialogDescription className="text-base flex items-center justify-center sm:justify-start gap-2">
                      Global Rank: <strong className="text-foreground">#{selectedUser.rank}</strong>
                    </DialogDescription>
                  </div>
                  <Button variant="outline" className="hidden sm:flex gap-2 shrink-0">Follow <ArrowUpRight className="h-4 w-4" /></Button>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <Trophy className="h-5 w-5 text-amber-500 mb-2" />
                  <span className="text-2xl font-bold">{selectedUser.score.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground uppercase">Points</span>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <Leaf className="h-5 w-5 text-emerald-500 mb-2" />
                  <span className="text-2xl font-bold">{selectedUser.saved}</span>
                  <span className="text-xs text-muted-foreground uppercase">Carbon Saved</span>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <Flame className="h-5 w-5 text-orange-500 mb-2" />
                  <span className="text-2xl font-bold">{selectedUser.streak} Days</span>
                  <span className="text-xs text-muted-foreground uppercase">Current Streak</span>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                  <Target className="h-5 w-5 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold">{selectedUser.goals}</span>
                  <span className="text-xs text-muted-foreground uppercase">Goals Met</span>
                </div>
              </div>

              <div className="space-y-3 pb-4">
                <h4 className="font-semibold text-sm">Top Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.badges.length > 0 ? (
                    selectedUser.badges.map((b: string, i: number) => (
                      <Badge key={i} className="bg-primary/10 text-primary hover:bg-primary/20">{b}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No badges earned yet.</span>
                  )}
                </div>
              </div>
              
              <Button className="w-full sm:hidden">Follow User</Button>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
