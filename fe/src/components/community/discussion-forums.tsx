"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, TrendingUp, ChevronRight } from "lucide-react"

const categories = [
  { id: "c1", name: "Sustainability Tips", count: "1.2k", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  { id: "c2", name: "Renewable Energy", count: "850", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { id: "c3", name: "Green Transportation", count: "2.4k", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { id: "c4", name: "Food & Lifestyle", count: "3.1k", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  { id: "c5", name: "Zero Waste", count: "1.8k", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { id: "c6", name: "Community Support", count: "540", color: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
]

const trendingTopics = [
  { id: "t1", title: "Best alternatives to plastic wrap?", replies: 145, time: "2h ago", category: "Zero Waste" },
  { id: "t2", title: "DIY Solar Panel Setup Guide for Beginners", replies: 89, time: "5h ago", category: "Renewable Energy" },
  { id: "t3", title: "Electric bike vs Public transit - Cost analysis", replies: 234, time: "1d ago", category: "Green Transportation" },
  { id: "t4", title: "How to start a compost bin in an apartment", replies: 56, time: "2d ago", category: "Food & Lifestyle" },
]

export function DiscussionForums() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" /> Forums
        </h2>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search discussions..." className="w-full pl-8 bg-background/50 backdrop-blur-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map(cat => (
          <Card key={cat.id} className="glass-card hover:bg-muted/50 cursor-pointer transition-colors border-dashed">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <span className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${cat.color}`}>
                {cat.name}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{cat.count} topics</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-orange-500" /> Trending Topics
        </h3>
        <div className="flex flex-col gap-3">
          {trendingTopics.map(topic => (
            <div key={topic.id} className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-all group cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 space-y-1.5">
                <h4 className="font-semibold text-base group-hover:text-primary transition-colors">{topic.title}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-normal">{topic.category}</Badge>
                  <span>•</span>
                  <span>{topic.time}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {topic.replies} replies</span>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 hidden sm:flex">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
