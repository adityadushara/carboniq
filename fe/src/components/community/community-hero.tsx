"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Leaf, MessageSquare, Target, Plus, Flame } from "lucide-react"

const stats = [
  {
    title: "Community Members",
    value: "45,200",
    trend: "+120 this week",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Total Carbon Saved",
    value: "12.4M kg",
    trend: "+450k this month",
    icon: Leaf,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Active Discussions",
    value: "3,104",
    trend: "24 new today",
    icon: MessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Running Challenges",
    value: "12",
    trend: "2 ending soon",
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function CommunityHero({ onOpenPostModal }: { onOpenPostModal: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
          <p className="text-muted-foreground mt-1">Connect, share, and get inspired by eco-warriors worldwide.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm hidden sm:flex">
            <Flame className="h-4 w-4 text-orange-500" /> Join Challenge
          </Button>
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm hidden sm:flex">
            <MessageSquare className="h-4 w-4 text-blue-500" /> New Discussion
          </Button>
          <Button onClick={onOpenPostModal} className="gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto">
            <Plus className="h-4 w-4" /> Create Post
          </Button>
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
                    <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
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
