'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Sun, Cloud, CloudRain, CloudSnow, Wind, CloudFog, CloudLightning, CloudDrizzle } from 'lucide-react'
import type { WeatherData } from '@/lib/weather-service'

const weatherIcons: Record<string, LucideIcon> = {
  'Clear': Sun,
  'Clouds': Cloud,
  'Rain': CloudRain,
  'Snow': CloudSnow,
  'Thunderstorm': CloudLightning,
  'Drizzle': CloudDrizzle,
  'Mist': CloudFog,
  'Smoke': CloudFog,
  'Haze': CloudFog,
  'Dust': CloudFog,
  'Fog': CloudFog,
  'Sand': CloudFog,
  'Ash': CloudFog,
  'Squall': Wind,
  'Tornado': Wind,
}

const conditionColors: Record<string, string> = {
  'Clear': '#F6AD55',
  'Clouds': '#A7B0C0',
  'Rain': '#7DA2FF',
  'Snow': '#E2E8F0',
  'Thunderstorm': '#B794F4',
  'Drizzle': '#7DA2FF',
  'Mist': '#A7B0C0',
}

interface CurrentWeatherProps {
  data: WeatherData
  displayTemp: (temp: number) => number
  unit: 'C' | 'F'
}

export default function CurrentWeather({ data, displayTemp, unit }: CurrentWeatherProps) {
  if (!data) return null

  const Icon = weatherIcons[data.condition] || Sun
  const iconColor = conditionColors[data.condition] || '#78FFB7'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glass-shimmer flex-shrink-0 relative overflow-hidden"
      style={{ padding: 'clamp(12px, 2vw, 24px)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-2 right-8 w-32 h-32 rounded-full blur-[60px] animate-breathe pointer-events-none"
        style={{ background: `${iconColor}15` }} />

      <div className="relative z-10">
        {/* Top row: Icon + City + Stats — responsive flex */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap">
          {/* Weather Icon */}
          <motion.div
            className="relative flex-shrink-0"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 blur-[25px] rounded-full" style={{ background: `${iconColor}25` }} />
            <Icon className="relative z-10 w-10 h-10 md:w-12 md:h-12" style={{ color: iconColor }} strokeWidth={1.2} />
          </motion.div>

          {/* City Info */}
          <div className="flex-shrink-0 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight truncate" style={{ color: '#F5F7FA' }}>
                {data.city}
              </h2>
              <span className="glass-pill px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider flex-shrink-0" style={{ color: '#A7B0C0' }}>
                {data.country}
              </span>
            </div>
            <p className="text-[11px] font-medium capitalize" style={{ color: '#A7B0C0' }}>{data.description}</p>
          </div>

          {/* Divider — hidden on mobile */}
          <div className="hidden md:block w-px h-10 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Stats row — wraps on mobile */}
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            {/* Temperature */}
            <div className="flex-shrink-0">
              <motion.span
                key={`${data.temperature}-${unit}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-none block"
                style={{ color: '#F5F7FA' }}
              >
                +{displayTemp(data.temperature)}°
              </motion.span>
              <p className="text-[9px] md:text-[10px] font-semibold mt-0.5" style={{ color: '#6B7A90' }}>Temperature</p>
            </div>

            {/* Humidity */}
            <div className="flex-shrink-0">
              <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-none block" style={{ color: '#F5F7FA' }}>
                {data.humidity}<span className="text-sm md:text-lg font-bold" style={{ color: '#A7B0C0' }}>%</span>
              </span>
              <p className="text-[9px] md:text-[10px] font-semibold mt-0.5" style={{ color: '#6B7A90' }}>Humidity</p>
            </div>

            {/* Wind */}
            <div className="flex-shrink-0">
              <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter leading-none block" style={{ color: '#F5F7FA' }}>
                {data.windSpeed}<span className="text-xs md:text-base font-bold ml-0.5" style={{ color: '#A7B0C0' }}>km/h</span>
              </span>
              <p className="text-[9px] md:text-[10px] font-semibold mt-0.5" style={{ color: '#6B7A90' }}>Wind speed</p>
            </div>
          </div>
        </div>

        {/* Hourly mini row */}
        <HourlyMiniRow />
      </div>
    </motion.div>
  )
}


/* Inline hourly mini-scroll inside the current weather card */
function HourlyMiniRow() {
  const now = new Date()
  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = new Date(now)
    h.setHours(now.getHours() + i)
    return {
      time: i === 0 ? 'Now' : h.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase(),
      temp: Math.floor(Math.random() * 10) + 20,
    }
  })

  return (
    <div className="flex gap-1.5 mt-3 md:mt-4 pt-3 overflow-x-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}>
      {hours.map((h, i) => (
        <div
          key={h.time}
          className="flex-shrink-0 flex flex-col items-center gap-0.5 rounded-xl transition-all duration-300"
          style={{
            padding: '5px 8px',
            minWidth: '48px',
            background: i === 0 ? 'rgba(120,255,183,0.06)' : 'transparent',
            border: i === 0 ? '1px solid rgba(120,255,183,0.12)' : '1px solid transparent',
            borderRadius: '12px',
          }}
        >
          <span className="text-[9px] font-semibold" style={{ color: i === 0 ? '#78FFB7' : '#6B7A90' }}>{h.time}</span>
          <span className="text-[11px] font-bold" style={{ color: '#F5F7FA' }}>{h.temp}°</span>
        </div>
      ))}
    </div>
  )
}
