"use client"
import { motion, Variants } from "framer-motion"
import { ReportsHeader } from "@/components/reports/reports-header"
import { ReportsHero } from "@/components/reports/reports-hero"
import { ReportsDashboard } from "@/components/reports/reports-dashboard"
import { AiInsightsPanel } from "@/components/reports/ai-insights-panel"
import { ReportComparison } from "@/components/reports/report-comparison"
import { ReportsList } from "@/components/reports/reports-list"

// Framer Motion container for staggering children
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function ReportsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-8"
    >
      <motion.div variants={item}>
        <ReportsHeader />
      </motion.div>

      <motion.div variants={item}>
        <ReportsHero />
      </motion.div>

      <motion.div variants={item}>
        <ReportsDashboard />
      </motion.div>

      <motion.div variants={item}>
        <AiInsightsPanel />
      </motion.div>

      <motion.div variants={item}>
        <ReportComparison />
      </motion.div>

      <motion.div variants={item}>
        <ReportsList />
      </motion.div>
      
    </motion.div>
  )
}
