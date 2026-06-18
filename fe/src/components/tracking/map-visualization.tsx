"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Dynamic import for React Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

export function MapVisualization() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <Card className="glass-card h-[400px] animate-pulse bg-secondary/50" />

  return (
    <Card className="glass-card shadow-lg shadow-primary/5 col-span-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location Hotspots
        </CardTitle>
        <CardDescription>Your travel routes and high-emission locations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full rounded-xl overflow-hidden border border-border relative z-0">
          <MapContainer 
            center={[40.7128, -74.0060]} 
            zoom={13} 
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[40.7128, -74.0060]}>
              <Popup>
                <strong>Daily Commute</strong><br/>12 kg CO₂
              </Popup>
            </Marker>
            <Marker position={[40.7282, -73.9942]}>
              <Popup>
                <strong>Coffee Shop</strong><br/>1.2 kg CO₂
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
