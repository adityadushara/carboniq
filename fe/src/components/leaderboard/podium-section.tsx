"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Flame, Leaf } from "lucide-react"

const podiumData = [
  { rank: 2, name: "Jordan Lee", score: "11,800", carbon: "520 kg", badge: "Silver", avatar: "/avatars/02.png", initials: "JL", color: "slate", icon: Medal, height: "h-[180px]" },
  { rank: 1, name: "Alex Rivers", score: "12,450", carbon: "610 kg", badge: "Gold", avatar: "/avatars/01.png", initials: "AR", color: "amber", icon: Trophy, height: "h-[220px]" },
  { rank: 3, name: "Taylor Swift", score: "11,200", carbon: "480 kg", badge: "Bronze", avatar: "/avatars/03.png", initials: "TS", color: "orange", icon: Award, height: "h-[160px]" },
]

export function PodiumSection() {
  return (
    <div className="pt-16 pb-8">
      <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-8 h-[280px]">
        {podiumData.map((user, i) => {
          const isFirst = user.rank === 1
          const Icon = user.icon
          
          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: isFirst ? 0.4 : i * 0.2, type: "spring", stiffness: 200 }}
              className={`relative flex flex-col items-center w-28 sm:w-32 md:w-48 ${isFirst ? 'z-10' : 'z-0'}`}
            >
              {/* Avatar & Floating Crown/Medal */}
              <div className={`relative mb-4 ${isFirst ? 'transform -translate-y-2' : ''}`}>
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 p-2 rounded-full shadow-lg border z-20 ${
                  isFirst ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400' : 
                  user.rank === 2 ? 'bg-slate-100 dark:bg-slate-800 border-slate-300' : 
                  'bg-orange-100 dark:bg-orange-900/50 border-orange-600'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    isFirst ? 'text-amber-500 drop-shadow-sm' : 
                    user.rank === 2 ? 'text-slate-400' : 'text-orange-600'
                  }`} />
                </div>
                
                <Avatar className={`border-4 shadow-xl ${
                  isFirst ? 'h-24 w-24 border-amber-400' : 
                  user.rank === 2 ? 'h-20 w-20 border-slate-300' : 'h-20 w-20 border-orange-600'
                }`}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl font-bold">{user.initials}</AvatarFallback>
                </Avatar>
              </div>

              {/* Podium Block */}
              <div className={`w-full rounded-t-2xl flex flex-col items-center justify-start pt-6 px-2 text-center border-t-2 border-x-2 shadow-2xl relative overflow-hidden ${user.height} ${
                isFirst ? 'bg-gradient-to-b from-amber-500/20 to-amber-500/5 border-amber-400/50' : 
                user.rank === 2 ? 'bg-gradient-to-b from-slate-400/20 to-slate-400/5 border-slate-400/50' : 
                'bg-gradient-to-b from-orange-600/20 to-orange-600/5 border-orange-600/50'
              }`}>
                {/* Number Watermark */}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-9xl font-black opacity-5 select-none pointer-events-none">
                  {user.rank}
                </span>

                <h3 className={`font-bold truncate w-full ${isFirst ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                  {user.name}
                </h3>
                
                <div className={`mt-2 font-black ${isFirst ? 'text-xl md:text-2xl text-amber-500' : 'text-lg md:text-xl'}`}>
                  {user.score} <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pts</span>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Leaf className="h-3 w-3" />
                  {user.carbon} Saved
                </div>
                
                {isFirst && (
                  <div className="mt-auto mb-4 bg-background border px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Flame className="h-3 w-3 text-orange-500" />
                    28 Day Streak
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
