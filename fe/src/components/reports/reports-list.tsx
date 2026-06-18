"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Download, Share2, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const reports = [
  { id: 1, month: "June", year: 2026, score: 84, emissions: "320 kg", reduction: "12%", date: "Jun 30, 2026" },
  { id: 2, month: "May", year: 2026, score: 79, emissions: "350 kg", reduction: "8%", date: "May 31, 2026" },
  { id: 3, month: "April", year: 2026, score: 72, emissions: "390 kg", reduction: "4%", date: "Apr 30, 2026" },
  { id: 4, month: "March", year: 2026, score: 70, emissions: "420 kg", reduction: "-2%", date: "Mar 31, 2026" },
]

export function ReportsList() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Report History</h2>
        <p className="text-sm text-muted-foreground">Access and download your previous monthly reports.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="glass-card hover:border-primary/50 transition-colors group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{report.month} {report.year}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2"><FileText className="h-4 w-4" /> View Details</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" /> Download PDF</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Share2 className="h-4 w-4" /> Share</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>Generated on {report.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Carbon Score</span>
                <span className="font-medium">{report.score}/100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Emissions</span>
                <span className="font-medium">{report.emissions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reduction</span>
                <span className={`font-medium ${report.reduction.startsWith('-') ? 'text-destructive' : 'text-emerald-500'}`}>
                  {report.reduction}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <Button variant="outline" className="w-full gap-2 bg-background/50">
                <FileText className="h-4 w-4" />
                View Report
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
