'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function AirQualityIndex({ city }: { city: string }) {
  const [aqi, setAqi] = useState(0)
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchAirQuality = async () => {
      const newAqi = Math.floor(Math.random() * 500)
      setAqi(newAqi)

      if (newAqi <= 50) setDescription('Good')
      else if (newAqi <= 100) setDescription('Moderate')
      else if (newAqi <= 150) setDescription('Unhealthy for Sensitive Groups')
      else if (newAqi <= 200) setDescription('Unhealthy')
      else if (newAqi <= 300) setDescription('Very Unhealthy')
      else setDescription('Hazardous')
    }
    fetchAirQuality()
  }, [city])

  const getColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500'
    if (aqi <= 100) return 'bg-yellow-500'
    if (aqi <= 150) return 'bg-orange-500'
    if (aqi <= 200) return 'bg-red-500'
    if (aqi <= 300) return 'bg-purple-500'
    return 'bg-rose-900'
  }

  return (
    <Card className="bg-transparent backdrop-blur-lg text-white dark:bg-gray-800/50 dark:text-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl">Air Quality Index</CardTitle>
        <CardDescription className="text-white/70">{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Progress value={(aqi / 500) * 100} className={`w-full ${getColor(aqi)}`} />
          <div className="mt-4 flex justify-between items-center">
            <p className="text-3xl font-bold">{aqi}</p>
            <p className="text-lg">{description}</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

