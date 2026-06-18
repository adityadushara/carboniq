"use client"
import { motion, Variants } from "framer-motion"
import { Award, Zap, Plane, Shield, Trophy } from "lucide-react"

const achievements = [
  { id: 1, title: "First Step", description: "Set your first sustainability goal", date: "May 10", icon: Trophy, unlocked: true, color: "text-amber-500", border: "border-amber-500/30" },
  { id: 2, title: "Eco Warrior", description: "Complete 5 goals", date: "June 2", icon: Shield, unlocked: true, color: "text-emerald-500", border: "border-emerald-500/30" },
  { id: 3, title: "Low Carbon Hero", description: "Reduce 500kg of CO₂", date: "June 15", icon: Award, unlocked: true, color: "text-blue-500", border: "border-blue-500/30" },
  { id: 4, title: "Transport Master", description: "Log 10 car-free days", progress: 70, icon: Plane, unlocked: false, color: "text-slate-400", border: "border-border" },
  { id: 5, title: "Energy Saver", description: "Reduce energy usage by 15%", progress: 40, icon: Zap, unlocked: false, color: "text-slate-400", border: "border-border" },
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function AchievementsRewards() {
  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Achievements</h2>
          <p className="text-sm text-muted-foreground">Badges earned by completing goals and hitting milestones.</p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="flex overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-hide gap-4 mask-linear-fade">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex gap-4"
          >
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <motion.div key={achievement.id} variants={item} className="shrink-0 w-[240px]">
                  <div className={`relative flex flex-col items-center p-6 rounded-2xl border ${achievement.border} ${achievement.unlocked ? 'bg-card shadow-sm shadow-primary/5' : 'bg-muted/30 grayscale'} h-full text-center transition-all hover:scale-105 duration-300 group`}>
                    
                    {/* Glowing background effect for unlocked */}
                    {achievement.unlocked && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}

                    <div className={`p-4 rounded-full bg-background border shadow-sm mb-4 relative ${achievement.unlocked ? 'ring-2 ring-primary/20 ring-offset-2 ring-offset-background' : ''}`}>
                      <Icon className={`h-8 w-8 ${achievement.color}`} />
                    </div>
                    
                    <h3 className="font-bold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{achievement.description}</p>
                    
                    <div className="mt-auto w-full">
                      {achievement.unlocked ? (
                        <div className="text-xs font-medium text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full inline-block">
                          Unlocked {achievement.date}
                        </div>
                      ) : (
                        <div className="w-full space-y-1">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-muted-foreground rounded-full" style={{ width: `${achievement.progress}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
