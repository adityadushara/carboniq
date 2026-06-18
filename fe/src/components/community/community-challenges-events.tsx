"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Calendar, Users, ArrowRight, Flame } from "lucide-react"

const challenges = [
  { id: "ch1", title: "No Plastic Week", participants: 1240, duration: "7 days", progress: 65, active: true, reward: "Eco Warrior Badge" },
  { id: "ch2", title: "Public Transport Challenge", participants: 850, duration: "14 days", progress: 0, active: false, reward: "Transit Hero Badge" },
  { id: "ch3", title: "Zero Waste Month", participants: 3400, duration: "30 days", progress: 40, active: true, reward: "Carbon Slayer Badge" },
]

const events = [
  { id: "ev1", title: "Sustainability Webinar: Solar Panel Basics", date: "Oct 24, 2026 - 2:00 PM EST", attendees: 450, type: "Webinar" },
  { id: "ev2", title: "Local Park Cleanup (NYC)", date: "Oct 28, 2026 - 10:00 AM EST", attendees: 120, type: "Meetup" },
]

export function CommunityChallengesEvents() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      
      {/* Challenges Column */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 mb-1">
            <Target className="h-5 w-5 text-orange-500" /> Active Challenges
          </h2>
          <p className="text-muted-foreground text-sm mb-4">Join forces with the community to achieve massive carbon reductions.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {challenges.map(c => (
            <Card key={c.id} className="glass-card overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="h-2 w-full bg-secondary">
                {c.active && <div className="h-full bg-primary" style={{ width: `${c.progress}%` }} />}
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{c.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.participants.toLocaleString()} joined</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {c.duration}</span>
                    </div>
                  </div>
                  {c.active ? (
                    <Badge className="bg-orange-500 hover:bg-orange-600 border-none gap-1"><Flame className="h-3 w-3" /> Live</Badge>
                  ) : (
                    <Badge variant="outline">Upcoming</Badge>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/30 p-3 rounded-lg border border-dashed">
                  <div className="text-sm font-medium">
                    Reward: <span className="text-primary font-bold">{c.reward}</span>
                  </div>
                  <Button size="sm" variant={c.active ? "default" : "secondary"} className="w-full sm:w-auto">
                    {c.active ? "Join Challenge" : "Notify Me"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Events Column */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 mb-1">
            <Calendar className="h-5 w-5 text-blue-500" /> Upcoming Events
          </h2>
          <p className="text-muted-foreground text-sm mb-4">Learn, network, and grow with experts and peers.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          {events.map(ev => (
            <Card key={ev.id} className="glass-card hover:bg-muted/50 transition-colors border-dashed">
              <CardContent className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{ev.type}</Badge>
                  <h3 className="font-bold text-lg">{ev.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-foreground font-medium"><Calendar className="h-3.5 w-3.5 text-blue-500" /> {ev.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {ev.attendees} attending</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto shrink-0 gap-2 group">
                  Register <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}
