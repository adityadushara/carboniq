"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Trophy, Flame, Leaf, Plus, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const stats = [
  {
    title: "Active Goals",
    value: "4",
    trend: "2 nearing completion",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Goal Completion Rate",
    value: "78%",
    trend: "+5% this month",
    icon: Trophy,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Sustainability Streak",
    value: "14 Days",
    trend: "Personal best: 21 days",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Carbon Saved",
    value: "450 kg",
    trend: "Equivalent to 20 trees",
    icon: Leaf,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
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

export function GoalsHero() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-muted-foreground mt-1">Set, track, and crush your sustainability targets.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10">
            <Sparkles className="h-4 w-4" />
            AI Goal Generator
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" />}>
              <Plus className="h-4 w-4" />
              Create Goal
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Goal Title</Label>
                  <Input placeholder="e.g. Fewer Flights" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>Transportation</option>
                    <option>Food & Diet</option>
                    <option>Energy</option>
                    <option>Shopping</option>
                    <option>Waste Reduction</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="e.g. Take less than 2 domestic flights this year" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Value</Label>
                    <Input type="number" placeholder="2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Input placeholder="flights" />
                  </div>
                </div>
                <Button className="w-full mt-4" onClick={() => setOpen(false)}>Save Goal</Button>
              </div>
            </DialogContent>
          </Dialog>
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
