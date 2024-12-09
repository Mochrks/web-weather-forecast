'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Wind, Sun, Umbrella, Thermometer, Gauge } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherDetail {
  icon: React.ElementType
  label: string
  value: string
}

export default function WeatherDetails({ city }: { city: string }) {
  const [details, setDetails] = useState<WeatherDetail[]>([])

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const newDetails: WeatherDetail[] = [
        { icon: Droplets, label: 'Humidity', value: `${Math.floor(Math.random() * 100)}%` },
        { icon: Wind, label: 'Wind Speed', value: `${Math.floor(Math.random() * 30)} km/h` },
        { icon: Sun, label: 'UV Index', value: `${Math.floor(Math.random() * 11)}` },
        { icon: Umbrella, label: 'Chance of Rain', value: `${Math.floor(Math.random() * 100)}%` },
        { icon: Thermometer, label: 'Feels Like', value: `${Math.floor(Math.random() * 35)}°C` },
        { icon: Gauge, label: 'Pressure', value: `${Math.floor(Math.random() * 1000 + 900)} hPa` },
      ]
      setDetails(newDetails)
    }
    fetchWeatherDetails()
  }, [city])

  return (
    <Card className="bg-transparent backdrop-blur-lg text-white dark:bg-gray-800/50 dark:text-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl">Weather Details</CardTitle>
        <CardDescription className="text-white/70">{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              className="flex items-center space-x-2 bg-white/20 p-3 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <detail.icon className="text-yellow-300" size={24} />
              <div>
                <p className="text-sm text-white/70">{detail.label}</p>
                <p className="text-lg font-semibold">{detail.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

