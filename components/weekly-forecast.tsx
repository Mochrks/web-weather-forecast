'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, Wind, type LucideIcon } from 'lucide-react'

const weatherIcons: Record<string, LucideIcon> = {
  'sunny': Sun,
  'cloudy': Cloud,
  'rainy': CloudRain,
  'snowy': CloudSnow,
  'windy': Wind,
}

type WeatherCondition = keyof typeof weatherIcons

interface DayForecast {
  date: Date
  temperature: { min: number; max: number }
  condition: WeatherCondition
  precipitation: number
}

interface WeeklyForecastProps {
  city: string
  displayTemp: (temp: number) => number
}

export default function WeeklyForecast({ city, displayTemp }: WeeklyForecastProps) {
  const [forecast, setForecast] = useState<DayForecast[]>([])

  useEffect(() => {
    const today = new Date()
    const newForecast = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i + 1)
      return {
        date,
        temperature: {
          min: Math.floor(Math.random() * 10) + 15,
          max: Math.floor(Math.random() * 10) + 25,
        },
        condition: Object.keys(weatherIcons)[Math.floor(Math.random() * Object.keys(weatherIcons).length)] as WeatherCondition,
        precipitation: Math.floor(Math.random() * 80),
      }
    })
    setForecast(newForecast)
  }, [city])

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card glass-shimmer flex flex-col"
      style={{ padding: 'clamp(12px, 1.5vh, 20px) clamp(12px, 1.5vw, 20px)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold tracking-tight" style={{ color: '#F5F7FA' }}>
          5-Day Forecast
        </h3>
        <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md" 
          style={{ color: '#7DA2FF', background: 'rgba(125,162,255,0.08)', border: '1px solid rgba(125,162,255,0.12)' }}>
          Extended
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {forecast.map((day, index) => {
          const WeatherIcon = weatherIcons[day.condition]
          const dayName = index === 0
            ? 'Tomorrow'
            : day.date.toLocaleDateString('en-US', { weekday: 'short' })

          // Calculate bar width
          const range = day.temperature.max - day.temperature.min
          const barWidth = Math.max(40, (range / 20) * 100)

          return (
            <motion.div
              key={day.date.toISOString()}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              className="flex items-center gap-2 md:gap-3 py-1.5 md:py-2 px-2 md:px-2.5 rounded-xl transition-all duration-300 hover:bg-white/[0.03] group cursor-default"
            >
              {/* Day name */}
              <span className="text-[11px] md:text-xs font-semibold w-14 md:w-16 flex-shrink-0" style={{ color: index === 0 ? '#78FFB7' : '#A7B0C0' }}>
                {dayName}
              </span>

              {/* Icon */}
              <WeatherIcon size={16} strokeWidth={1.5} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ color: '#A7B0C0' }} />

              {/* Temp bar */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-[11px] font-medium w-7 text-right flex-shrink-0" style={{ color: '#6B7A90' }}>
                  {displayTemp(day.temperature.min)}°
                </span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: 0.3 + index * 0.08, duration: 0.6 }}
                    style={{
                      background: `linear-gradient(90deg, #7DA2FF, #78FFB7)`,
                      marginLeft: `${(day.temperature.min / 40) * 30}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold w-7 flex-shrink-0" style={{ color: '#F5F7FA' }}>
                  {displayTemp(day.temperature.max)}°
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
