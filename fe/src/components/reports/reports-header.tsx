"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Plus, Search, Calendar as CalendarIcon } from "lucide-react"

export function ReportsHeader() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Deep dive into your carbon footprint data.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="w-full pl-8 bg-background/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex gap-2 bg-background/50 backdrop-blur-sm">
            <CalendarIcon className="h-4 w-4" />
            Last 6 Months
          </Button>
          
          <Button onClick={handlePrint} variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>
    </div>
  )
}
