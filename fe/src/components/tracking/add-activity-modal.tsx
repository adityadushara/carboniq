"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Coffee, ShoppingBag, Zap, CalendarIcon } from "lucide-react"
import { useState } from "react"

export function AddActivityModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [category, setCategory] = useState("transport")
  const [date, setDate] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Activity</DialogTitle>
          <DialogDescription>
            Log your latest activity to update your carbon footprint.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={category} onValueChange={setCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="transport"><Car className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Transport</span></TabsTrigger>
            <TabsTrigger value="food"><Coffee className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Food</span></TabsTrigger>
            <TabsTrigger value="shopping"><ShoppingBag className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Shopping</span></TabsTrigger>
            <TabsTrigger value="energy"><Zap className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">Energy</span></TabsTrigger>
          </TabsList>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="date" type="date" className="pl-9" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <TabsContent value="transport" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Transport Type</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="car">Car (Gasoline)</option>
                  <option value="ev">Electric Vehicle</option>
                  <option value="bus">Public Bus</option>
                  <option value="train">Train / Metro</option>
                  <option value="flight">Flight (Economy)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input id="distance" placeholder="e.g. 15" type="number" />
              </div>
            </TabsContent>

            <TabsContent value="food" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="meal">Diet Type</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="meat">Heavy Meat (Beef/Lamb)</option>
                  <option value="poultry">Poultry/Fish</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meals_count">Number of Meals</Label>
                <Input id="meals_count" placeholder="e.g. 1" type="number" />
              </div>
            </TabsContent>

            <TabsContent value="shopping" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="item">Item Category</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="clothing">Clothing / Textiles</option>
                  <option value="electronics">Electronics</option>
                  <option value="household">Household Goods</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Amount Spent ($)</Label>
                <Input id="cost" placeholder="e.g. 150" type="number" />
              </div>
            </TabsContent>

            <TabsContent value="energy" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="energy_type">Energy Source</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="grid">Grid Electricity</option>
                  <option value="natural_gas">Natural Gas</option>
                  <option value="renewable">Renewable Energy</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kwh">Usage (kWh)</Label>
                <Input id="kwh" placeholder="e.g. 350" type="number" />
              </div>
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input id="notes" placeholder="Any additional details..." />
            </div>
          </div>
        </Tabs>

        <DialogFooter className="sm:justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Estimated Carbon: <strong className="text-foreground">-- kg CO₂</strong>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">Cancel</Button>
            <Button className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>Save Activity</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
