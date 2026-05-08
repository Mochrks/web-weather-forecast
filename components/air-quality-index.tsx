'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

export default function AirQualityIndex({ city }: { city: string }) {
  const [aqi, setAqi] = useState(0)
  const [description, setDescription] = useState('')

  useEffect(() => {
    const newAqi = Math.floor(Math.random() * 200)
    setAqi(newAqi)

    if (newAqi <= 50) setDescription('Good')
    else if (newAqi <= 100) setDescription('Moderate')
    else if (newAqi <= 150) setDescription('Unhealthy')
    else setDescription('Hazardous')
  }, [city])

  const getColor = (aqi: number) => {
    if (aqi <= 50) return { main: '#78FFB7', bg: 'rgba(120,255,183,0.1)', border: 'rgba(120,255,183,0.15)' }
    if (aqi <= 100) return { main: '#F6AD55', bg: 'rgba(246,173,85,0.1)', border: 'rgba(246,173,85,0.15)' }
    if (aqi <= 150) return { main: '#FC8181', bg: 'rgba(252,129,129,0.1)', border: 'rgba(252,129,129,0.15)' }
    return { main: '#E53E3E', bg: 'rgba(229,62,62,0.1)', border: 'rgba(229,62,62,0.15)' }
  }

  const colors = getColor(aqi)

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card glass-shimmer"
      style={{ padding: 'clamp(14px, 1.5vh, 20px) clamp(16px, 1.5vw, 20px)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Leaf size={14} style={{ color: colors.main }} />
          <h3 className="text-sm font-bold tracking-tight" style={{ color: '#F5F7FA' }}>
            Air Quality
          </h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
          style={{ color: colors.main, background: colors.bg, border: `1px solid ${colors.border}` }}>
          {description}
        </span>
      </div>

      <div className="flex items-end gap-3 mb-3">
        <motion.span
          key={aqi}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-extrabold tracking-tighter"
          style={{ color: '#F5F7FA' }}
        >
          {aqi}
        </motion.span>
        <span className="text-[10px] font-medium pb-1" style={{ color: '#6B7A90' }}>AQI Index</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((aqi / 300) * 100, 100)}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(90deg, #78FFB7, ${colors.main})`,
            boxShadow: `0 0 10px ${colors.main}40`,
          }}
        />
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] font-medium" style={{ color: '#6B7A90' }}>0</span>
        <span className="text-[9px] font-medium" style={{ color: '#6B7A90' }}>300</span>
      </div>
    </motion.div>
  )
}
