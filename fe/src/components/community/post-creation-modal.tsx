"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Image as ImageIcon, MapPin, Trophy, Leaf, X } from "lucide-react"

export function PostCreationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [content, setContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = () => {
    if (!content.trim()) return
    setIsPosting(true)
    setTimeout(() => {
      setIsPosting(false)
      setContent("")
      onClose()
    }, 800)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="p-4 border-b">
          <DialogTitle className="text-center font-semibold">Create Post</DialogTitle>
        </div>
        
        <div className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <span className="font-semibold text-sm">You (Demo User)</span>
              <Textarea 
                placeholder="Share your eco-wins, ask questions, or inspire others..."
                className="min-h-[120px] resize-none border-none focus-visible:ring-0 p-0 shadow-none text-base bg-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/20 border-t">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Add to your post</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-full">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded-full">
                <Trophy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-full">
                <MapPin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-full">
                <Leaf className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            className="w-full font-bold" 
            disabled={!content.trim() || isPosting}
            onClick={handlePost}
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
