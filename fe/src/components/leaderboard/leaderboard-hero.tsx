"use client"
import { motion, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Trophy, TrendingUp, Flame, Leaf, Filter } from "lucide-react"

const stats = [
  {
    title: "Your Global Rank",
    value: "#7",
    trend: "Top 5% of users",
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Sustainability Score",
    value: "12,450",
    trend: "+350 this week",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Monthly Carbon Saved",
    value: "125 kg",
    trend: "20kg away from next badge",
    icon: Leaf,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Current Streak",
    value: "14 Days",
    trend: "Personal best: 21 days",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  }
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function LeaderboardHero() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Compete, climb the ranks, and save the planet together.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search for a user..." className="w-full pl-8 bg-background/50 backdrop-blur-sm" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex h-10 w-full sm:w-auto rounded-md border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="glass-card border-border/50 shadow-sm overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <span>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
