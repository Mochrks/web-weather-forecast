'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    <div className="h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider">AQI Index</p>
            <p className="text-4xl font-bold text-white mt-1">{aqi}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getColor(aqi).replace('bg-', 'bg-')}/80 border border-white/20`}
            style={{ backgroundColor: `var(--${getColor(aqi).replace('bg-', '')})` }} // Fallback or tricky logic if classes are dynamic
          >
            {description}
          </div>
        </div>

        <div className="relative h-4 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 h-full ${getColor(aqi)}`}
            initial={{ width: 0 }}
            animate={{ width: `${(aqi / 500) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        <p className="text-white/40 text-[10px] mt-2 text-right">0 - 500 Scale</p>
      </motion.div>
    </div>
  )
}

