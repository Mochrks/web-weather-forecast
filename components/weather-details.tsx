'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Wind, Sun, Umbrella, Thermometer, Gauge } from 'lucide-react'

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
    <div className="h-full">
      <div className="grid grid-cols-2 gap-4 h-full content-start">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors aspect-square md:aspect-auto md:h-28 text-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="p-2.5 rounded-full bg-white/10 mb-1">
              <detail.icon className="text-white/90" size={20} />
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">{detail.label}</p>
              <p className="text-base font-bold text-white tracking-tight">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

