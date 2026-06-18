"use client"
import { motion, Variants } from "framer-motion"
import { GoalsHero } from "@/components/goals/goals-hero"
import { GoalsOverview } from "@/components/goals/goals-overview"
import { ActiveGoalsGrid } from "@/components/goals/active-goals-grid"
import { AiGoalGenerator } from "@/components/goals/ai-goal-generator"
import { AchievementsRewards } from "@/components/goals/achievements-rewards"
import { GoalHistory } from "@/components/goals/goal-history"
import { GoalsAnalytics } from "@/components/goals/goals-analytics"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function GoalsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-10"
    >
      <motion.div variants={item}>
        <GoalsHero />
      </motion.div>

      <motion.div variants={item}>
        <GoalsOverview />
      </motion.div>

      <motion.div variants={item}>
        <ActiveGoalsGrid />
      </motion.div>

      <motion.div variants={item}>
        <AiGoalGenerator />
      </motion.div>

      <motion.div variants={item} className="pt-4">
        <AchievementsRewards />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <motion.div variants={item}>
          <GoalHistory />
        </motion.div>
        <motion.div variants={item}>
          <GoalsAnalytics />
        </motion.div>
      </div>

    </motion.div>
  )
}
