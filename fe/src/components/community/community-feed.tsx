"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, Leaf, MoreHorizontal, CheckCircle2 } from "lucide-react"

export type Post = {
  id: string
  user: { name: string, handle: string, avatar: string, verified: boolean }
  content: string
  image?: string
  impact?: { type: string, value: string }
  achievement?: string
  timestamp: string
  likes: number
  comments: number
  hasLiked?: boolean
  hasSaved?: boolean
}

const mockFeed: Post[] = [
  {
    id: "p1",
    user: { name: "Alex Rivers", handle: "@arivers", avatar: "/avatars/01.png", verified: true },
    content: "Just completed my first 'Zero Waste Week'! It was challenging to avoid all single-use plastics, but totally worth it. The amount of trash I usually generate is shocking. Anyone else trying this?",
    achievement: "Zero Waste Week Completed",
    impact: { type: "Carbon Saved", value: "15 kg CO₂" },
    timestamp: "2 hours ago",
    likes: 124,
    comments: 18,
    hasLiked: true
  },
  {
    id: "p2",
    user: { name: "Sarah Jenkins", handle: "@sarah_j", avatar: "/avatars/03.png", verified: false },
    content: "Finally installed solar panels on the roof today! ☀️🔋 It's a big investment upfront but the long-term environmental (and financial) savings are going to be massive. Happy to answer any questions about the installation process!",
    image: "https://images.unsplash.com/photo-1509391366360-120042a5aeb5?q=80&w=2070&auto=format&fit=crop",
    timestamp: "5 hours ago",
    likes: 342,
    comments: 45
  },
  {
    id: "p3",
    user: { name: "David Chen", handle: "@dchen_eco", avatar: "/avatars/04.png", verified: true },
    content: "Switched my entire commute to cycling this month. Not only is it zero emissions, but my fitness has drastically improved. Win-win!",
    impact: { type: "Transport Emissions Avoided", value: "45 kg CO₂" },
    timestamp: "1 day ago",
    likes: 89,
    comments: 5
  }
]

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(mockFeed)

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { ...p, hasLiked: !p.hasLiked, likes: p.hasLiked ? p.likes - 1 : p.likes + 1 }
      }
      return p
    }))
  }

  const toggleSave = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, hasSaved: !p.hasSaved } : p))
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id} className="glass-card overflow-hidden hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3 pt-5 px-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border shadow-sm">
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm">{post.user.name}</span>
                    {post.user.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />}
                    <span className="text-xs text-muted-foreground ml-1">· {post.timestamp}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.user.handle}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="px-5 pb-5">
            <p className="text-sm leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>
            
            {post.achievement && (
              <div className="mb-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg text-xs font-medium w-fit">
                <span className="text-lg">🏆</span> {post.achievement}
              </div>
            )}

            {post.image && (
              <div className="mb-4 rounded-xl overflow-hidden border">
                <img src={post.image} alt="Post attachment" className="w-full h-auto object-cover max-h-[400px]" />
              </div>
            )}

            {post.impact && (
              <div className="mb-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-2 rounded-lg text-xs font-medium">
                <Leaf className="h-4 w-4" />
                <span>{post.impact.type}: <strong className="font-bold ml-1">{post.impact.value}</strong></span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 sm:gap-6">
                <button 
                  onClick={() => toggleLike(post.id)} 
                  className={`flex items-center gap-1.5 text-sm transition-colors group ${post.hasLiked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500'}`}
                >
                  <Heart className={`h-4 w-4 group-active:scale-75 transition-transform ${post.hasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group">
                  <MessageCircle className="h-4 w-4 group-active:scale-75 transition-transform" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group hidden sm:flex">
                  <Share2 className="h-4 w-4 group-active:scale-75 transition-transform" />
                  <span>Share</span>
                </button>
              </div>
              <button 
                onClick={() => toggleSave(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors group ${post.hasSaved ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
              >
                <Bookmark className={`h-4 w-4 group-active:scale-75 transition-transform ${post.hasSaved ? 'fill-primary' : ''}`} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="py-4 text-center">
        <Button variant="outline" className="rounded-full">Load More Posts</Button>
      </div>
    </div>
  )
}
