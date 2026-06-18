"use client"
import { motion } from "framer-motion"
import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero"
import { PodiumSection } from "@/components/leaderboard/podium-section"
import { MainLeaderboardTable } from "@/components/leaderboard/main-leaderboard-table"
import { AchievementsSection } from "@/components/leaderboard/achievements-section"
import { CommunityInsights } from "@/components/leaderboard/community-insights"
import { TrendAnalytics } from "@/components/leaderboard/trend-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, Target } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="relative pb-24">
      {/* Content */}
      <div className="space-y-8">
        <LeaderboardHero />

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="local" className="col-span-2 md:col-span-1">Local (NYC)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="space-y-8 mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col xl:flex-row gap-8 items-start">
              <div className="w-full xl:w-2/3 space-y-8">
                <PodiumSection />
                <MainLeaderboardTable />
              </div>
              <div className="w-full xl:w-1/3 space-y-8">
                <TrendAnalytics />
                <CommunityInsights />
              </div>
            </div>
            
            <div className="pt-4">
              <AchievementsSection />
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl mt-0">
            <p className="text-muted-foreground">Monthly leaderboard resets in 12 days.</p>
          </TabsContent>

          <TabsContent value="weekly" className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl mt-0">
            <p className="text-muted-foreground">Weekly leaderboard data populating...</p>
          </TabsContent>

          <TabsContent value="friends" className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl gap-4 mt-0">
            <p className="text-muted-foreground">Connect with friends to see them on your leaderboard.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Find Friends</button>
          </TabsContent>

          <TabsContent value="local" className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl mt-0">
            <p className="text-muted-foreground">Local leaderboard restricted. Update your location settings.</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky User Ranking Bottom Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:w-fit z-50 pointer-events-none"
      >
        <div className="pointer-events-auto bg-background/80 backdrop-blur-md border shadow-2xl rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary">#7</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">Your Rank</span>
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-0.5 mt-1">
                  <ArrowUp className="h-3 w-3" /> 3 Places Today
                </span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-border hidden md:block"></div>
            
            <div className="text-right md:text-left">
              <div className="text-sm font-bold">12,450 <span className="text-[10px] text-muted-foreground uppercase">Pts</span></div>
              <div className="text-xs text-muted-foreground mt-0.5">Top 5% Global</div>
            </div>
          </div>
          
          <div className="w-full md:w-64 space-y-1.5 hidden sm:block">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Next Rank: #6</span>
              <span className="text-primary flex items-center gap-1"><Target className="h-3 w-3" /> 150 pts to go</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
