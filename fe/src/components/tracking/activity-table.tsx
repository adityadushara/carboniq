"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit2, Copy, Trash2, Car, Coffee, Zap, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const activities = [
  { id: 1, type: 'transport', title: 'Morning Commute', desc: '15 km by Car (Gasoline)', date: 'Today, 8:30 AM', carbon: 3.2, icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, type: 'food', title: 'Lunch', desc: 'Beef Burger Combo', date: 'Today, 1:15 PM', carbon: 4.5, icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 3, type: 'energy', title: 'Home Electricity', desc: 'Daily Usage (12 kWh)', date: 'Yesterday', carbon: 5.1, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { id: 4, type: 'shopping', title: 'New Jeans', desc: 'Denim Pants', date: 'Jun 15, 2026', carbon: 12.0, icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
]

export function ActivityTable() {
  const [data, setData] = useState(activities)

  const handleDelete = (id: number) => {
    setData(data.filter(a => a.id !== id))
  }

  return (
    <Card className="glass-card col-span-full xl:col-span-2 shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recent Activities</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          {data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No activities found.</div>
          ) : (
            data.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.id} className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border hover:bg-card/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc} • {item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-destructive">+{item.carbon.toFixed(1)} kg</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Edit2 className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
