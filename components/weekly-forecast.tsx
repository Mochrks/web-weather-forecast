'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const weatherIcons = {
  'sunny': Sun,
  'cloudy': Cloud,
  'rainy': CloudRain,
  'snowy': CloudSnow,
  'windy': Wind,
}

type WeatherCondition = keyof typeof weatherIcons

interface DayForecast {
  date: Date
  temperature: {
    min: number
    max: number
  }
  condition: WeatherCondition
  precipitation: number
}

export default function WeeklyForecast({ city }: { city: string }) {
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      const today = new Date()
      const newForecast = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        return {
          date,
          temperature: {
            min: Math.floor(Math.random() * 15) + 10,
            max: Math.floor(Math.random() * 15) + 20,
          },
          condition: Object.keys(weatherIcons)[Math.floor(Math.random() * Object.keys(weatherIcons).length)] as WeatherCondition,
          precipitation: Math.floor(Math.random() * 100),
        }
      })
      setForecast(newForecast)
    }
    fetchForecast()
  }, [city])

  return (
    <div className="glass-panel text-white h-full p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">7-Day Forecast</h3>
        <span className="text-white/50 text-sm">{city}</span>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {forecast.map((day, index) => {
            const WeatherIcon = weatherIcons[day.condition]
            const isSelected = selectedDay === index
            return (
              <TooltipProvider key={day.date.toISOString()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      layout
                      onClick={() => setSelectedDay(isSelected ? null : index)}
                      className={`relative flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-300 border ${isSelected
                        ? 'bg-white/20 border-white/30 shadow-inner'
                        : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                        } h-28 sm:h-32`}
                    >
                      <span className="text-xs font-medium text-white/70">
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>

                      <WeatherIcon
                        size={24}
                        className={`my-2 transition-transform duration-500 ${isSelected ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/90'}`}
                      />

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-bold">{day.temperature.max}°</span>
                        <span className="text-[10px] text-white/50">{day.temperature.min}°</span>
                      </div>

                      {/* Active Indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeDay"
                          className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="glass border-white/10 text-white">
                    <p>Precipitation: {day.precipitation}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedDay !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg">
                    {forecast[selectedDay].date.toLocaleDateString('en-US', { weekday: 'long' })}
                  </h4>
                  <p className="text-white/60 text-sm capitalize">{forecast[selectedDay].condition}</p>
                </div>
                <div className="flex gap-4 text-sm text-right">
                  <div>
                    <p className="text-white/50">High</p>
                    <p className="font-bold">{forecast[selectedDay].temperature.max}°</p>
                  </div>
                  <div>
                    <p className="text-white/50">Low</p>
                    <p className="font-bold">{forecast[selectedDay].temperature.min}°</p>
                  </div>
                  <div>
                    <p className="text-white/50">Rain</p>
                    <p className="font-bold">{forecast[selectedDay].precipitation}%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

