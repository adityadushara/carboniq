"use client"
import * as React from "react"
import { Sparkles, Send, Bot, User } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchApi } from "@/lib/api"

type Message = {
  role: "user" | "model"
  parts: string[]
}

export function AICoachSheet() {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "model", parts: ["Hi there! I'm your AI Sustainability Coach. How can I help you reduce your carbon footprint today?"] }
  ])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = input.trim()
    setInput("")
    
    // Add user message to UI
    const newHistory: Message[] = [...messages, { role: "user", parts: [userMsg] }]
    setMessages(newHistory)
    setLoading(true)

    try {
      const data = await fetchApi("/coach/chat", {
        method: "POST",
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(1) // skip the initial greeting
        })
      })

      setMessages([...newHistory, { role: "model", parts: [data.response] }])
    } catch (err) {
      setMessages([...newHistory, { role: "model", parts: ["Sorry, I encountered a network error. Please try again."] }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" className="w-full justify-start gap-3 bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors" />}>
        <Sparkles className="h-5 w-5" />
        <span className="font-medium">AI Coach</span>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0">
        <SheetHeader className="p-6 border-b glass">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Sustainability Coach
          </SheetTitle>
          <SheetDescription>
            Ask me for personalized tips on reducing your emissions.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-secondary/10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "model" && (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border shadow-sm text-card-foreground"}`}>
                {msg.parts[0]}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="p-3 rounded-lg bg-card border shadow-sm text-card-foreground text-sm flex items-center gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-75">.</span>
                <span className="animate-bounce delay-150">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-card">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask a question..." 
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
