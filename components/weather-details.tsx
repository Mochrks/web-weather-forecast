'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Sun, Umbrella, Gauge, Sunrise, Sunset } from 'lucide-react'

interface WeatherDetail {
  icon: React.ElementType
  label: string
  value: string
  color: string
}

export default function WeatherDetails({ city }: { city: string }) {
  const [details, setDetails] = useState<WeatherDetail[]>([])

  useEffect(() => {
    const newDetails: WeatherDetail[] = [
      { icon: Droplets, label: 'Humidity', value: `${Math.floor(Math.random() * 40) + 40}%`, color: '#7DA2FF' },
      { icon: Sun, label: 'UV Index', value: `${Math.floor(Math.random() * 8) + 1}`, color: '#F6AD55' },
      { icon: Umbrella, label: 'Rain', value: `${Math.floor(Math.random() * 60)}%`, color: '#78FFB7' },
      { icon: Gauge, label: 'Pressure', value: `${Math.floor(Math.random() * 50) + 990}`, color: '#B794F4' },
      { icon: Sunrise, label: 'Sunrise', value: '06:12', color: '#FBD38D' },
      { icon: Sunset, label: 'Sunset', value: '18:34', color: '#FC8181' },
    ]
    setDetails(newDetails)
  }, [city])

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="glass-card glass-shimmer flex-1 min-h-0 flex flex-col"
      style={{ padding: 'clamp(14px, 1.5vh, 20px) clamp(16px, 1.5vw, 20px)' }}
    >
      <h3 className="text-sm font-bold tracking-tight mb-3" style={{ color: '#F5F7FA' }}>
        Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 flex-1 content-start">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl transition-all duration-300 hover:bg-white/[0.04] cursor-default"
          >
            <div className="p-1.5 rounded-lg" style={{ background: `${detail.color}12` }}>
              <detail.icon size={14} style={{ color: detail.color }} strokeWidth={1.5} />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#6B7A90' }}>
              {detail.label}
            </span>
            <span className="text-xs font-bold" style={{ color: '#F5F7FA' }}>
              {detail.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
