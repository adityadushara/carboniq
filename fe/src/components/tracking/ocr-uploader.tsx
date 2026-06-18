"use client"
import * as React from "react"
import { ScanLine, Loader2, UploadCloud, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchApi } from "@/lib/api"

interface OCRUploaderProps {
  onScanComplete?: () => void
}

export function OCRUploader({ onScanComplete }: OCRUploaderProps) {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<any>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetchApi("/ocr/scan", {
        method: "POST",
        body: formData,
      })

      setResult(res)
    } catch (err: any) {
      setError(err.message || "An error occurred during OCR")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveActivity = async () => {
    if (!result) return
    setLoading(true)
    setError(null)

    // Calculate emissions roughly based on quantity (in reality backend OCR should return this)
    let emissions = 0
    if (result.activity_type.toLowerCase() === 'energy') {
      emissions = parseFloat(result.quantity) * 0.38
    } else if (result.activity_type.toLowerCase() === 'transport') {
      emissions = parseFloat(result.quantity) * 0.411
    } else {
      emissions = parseFloat(result.quantity) * 2.5
    }

    try {
      await fetchApi('/activities', {
        method: 'POST',
        body: JSON.stringify({
          activity_type: result.activity_type.charAt(0).toUpperCase() + result.activity_type.slice(1),
          description: result.description,
          emissions_kg: emissions
        })
      })
      
      setResult(null)
      if (onScanComplete) onScanComplete()
    } catch (err: any) {
      setError(err.message || "Failed to save activity")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {!result && !loading && (
        <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 bg-primary/5 transition-colors hover:bg-primary/10 relative">
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
          <UploadCloud className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-semibold text-lg">AI Receipt Scanner</h3>
            <p className="text-sm text-muted-foreground mt-1">Upload or drag & drop a gas/electricity bill.</p>
          </div>
          <Button variant="secondary" className="pointer-events-none">Select Image</Button>
        </div>
      )}

      {loading && (
        <div className="border-2 border-dashed border-muted rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <div>
            <h3 className="font-semibold text-lg">Scanning with Gemini AI...</h3>
            <p className="text-sm text-muted-foreground mt-1">Extracting carbon data from your receipt.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm border border-destructive/20 text-center">
          {error}
          <Button variant="link" onClick={() => setError(null)} className="ml-2 h-auto p-0">Try again</Button>
        </div>
      )}

      {result && (
        <div className="p-6 bg-card border rounded-lg shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-6 w-6" />
            <h3 className="font-semibold text-lg">Extraction Successful</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Activity Type</p>
              <p className="font-medium capitalize">{result.activity_type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Detected Quantity</p>
              <p className="font-medium">{result.quantity} {result.unit}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Description</p>
              <p className="font-medium">{result.description}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Cancel</Button>
            <Button className="w-full" onClick={handleSaveActivity}>Save Activity</Button>
          </div>
        </div>
      )}
    </div>
  )
}
