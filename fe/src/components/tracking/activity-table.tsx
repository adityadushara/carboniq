"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Car, Coffee, Zap, ShoppingBag, Activity as ActivityIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase"
import type { Activity } from "@/types"

export function ActivityTable({ activities = [], onDeleteActivity }: { activities?: Activity[], onDeleteActivity?: () => void }) {
  
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'transport': return <Car className="h-5 w-5" />
      case 'food': return <Coffee className="h-5 w-5" />
      case 'energy': return <Zap className="h-5 w-5" />
      case 'shopping': return <ShoppingBag className="h-5 w-5" />
      default: return <ActivityIcon className="h-5 w-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'transport': return 'text-blue-500 bg-blue-500/10'
      case 'food': return 'text-orange-500 bg-orange-500/10'
      case 'energy': return 'text-yellow-500 bg-yellow-500/10'
      case 'shopping': return 'text-purple-500 bg-purple-500/10'
      default: return 'text-primary bg-primary/10'
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      })
      if (response.ok && onDeleteActivity) {
        onDeleteActivity()
      }
    } catch (e) {
      console.error("Failed to delete activity", e)
    }
  }

  return (
    <Card className="glass-card col-span-full shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">All Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No activities found. Log some emissions to get started!</div>
          ) : (
            activities.map((item) => (
              <div key={item.id} className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border hover:bg-card/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${getActivityColor(item.activity_type)}`}>
                    {getActivityIcon(item.activity_type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm capitalize">{item.activity_type}</h4>
                    <p className="text-xs text-muted-foreground">{item.description} • {new Date(item.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-destructive">+{item.emissions_kg.toFixed(1)} kg</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
