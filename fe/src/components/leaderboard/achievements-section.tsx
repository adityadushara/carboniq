"use client"
import { motion } from "framer-motion"
import { Shield, Sparkles, Zap, Plane, TreePine, Award } from "lucide-react"

const topAchievements = [
  { id: 1, title: "Earth Guardian", desc: "Top 1% of reducers", icon: Shield, color: "text-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  { id: 2, title: "Carbon Slayer", desc: "1000kg CO₂ saved", icon: Zap, color: "text-amber-500", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  { id: 3, title: "Zero Emission", desc: "No car travel 30 days", icon: Plane, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { id: 4, title: "Forest Maker", desc: "50 goals completed", icon: TreePine, color: "text-green-500", border: "border-green-500/30", bg: "bg-green-500/10" },
  { id: 5, title: "Sustainability Master", desc: "365 day streak", icon: Award, color: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/10" },
]

export function AchievementsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h2 className="text-xl font-semibold tracking-tight">Prestigious Badges</h2>
      </div>
      <p className="text-sm text-muted-foreground">The most difficult and respected achievements in the CarbonIQ community.</p>

      <div className="flex overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-hide gap-4 mask-linear-fade">
        <div className="flex gap-4">
          {topAchievements.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`shrink-0 w-[180px] p-5 rounded-2xl border ${badge.border} bg-card hover:bg-muted/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-${badge.color.split('-')[1]}-500/10 group cursor-default relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${badge.bg} -z-0 opacity-50 group-hover:scale-150 transition-transform duration-500`} />
                <div className="relative z-10">
                  <div className={`p-3 rounded-xl w-fit mb-4 border shadow-sm bg-background ${badge.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
