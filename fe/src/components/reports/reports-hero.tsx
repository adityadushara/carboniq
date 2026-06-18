"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, Award, FileText, Flame } from "lucide-react"

const stats = [
  {
    title: "Total Carbon Saved",
    value: "1,240 kg",
    trend: "-12% from last month",
    icon: TrendingDown,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Current Carbon Score",
    value: "84/100",
    trend: "Top 15% of users",
    icon: Award,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Reports Generated",
    value: "12",
    trend: "Last generated 2 days ago",
    icon: FileText,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Sustainability Streak",
    value: "28 Days",
    trend: "Personal best: 45 days",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function ReportsHero() {
  return (
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
  )
}
