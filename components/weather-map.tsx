'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WeatherMap({ city }: { city: string }) {
  const [mapUrl, setMapUrl] = useState('')

  useEffect(() => {
    // In a real application, you would use a mapping service API here
    setMapUrl(`https://maps.googleapis.com/maps/api/staticmap?center=${city}&zoom=10&size=600x300&key=YOUR_API_KEY`)
  }, [city])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Weather Map</CardTitle>
        <CardDescription>{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={mapUrl} alt={`Weather map of ${city}`} className="w-full h-auto rounded-lg" />
        </motion.div>
      </CardContent>
    </Card>
  )
}

