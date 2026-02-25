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
    <div className="glass-panel text-white h-full p-8 flex flex-col glass-shimmer">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight text-glow">7-Day Forecast</h3>
          <p className="text-white text-sm font-medium tracking-wide">Extended outlook for {city}</p>
        </div>
        <div className="glass-pill px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
          PRO-DATA
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-7 gap-3 mb-6">
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
                      className={`relative flex flex-col items-center justify-between p-4 rounded-3xl transition-all duration-500 border ${isSelected
                        ? 'bg-white/20 border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.1)]'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                        } h-36 sm:h-44 group`}
                    >
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>

                      <div className="relative">
                        {isSelected && (
                          <div className="absolute inset-0 blur-xl bg-white/30 rounded-full animate-pulse-slow" />
                        )}
                        <WeatherIcon
                          size={28}
                          className={`relative z-10 my-2 transition-all duration-700 ${isSelected ? 'scale-125 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'text-white/60 group-hover:scale-110 group-hover:text-white'}`}
                        />
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-black tracking-tighter">{day.temperature.max}°</span>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/40 rounded-full" style={{ width: `${(day.temperature.max / 40) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-medium text-white/60 tracking-wide">{day.temperature.min}°</span>
                      </div>

                      {/* Active Indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeDayIndicator"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                        />
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="glass border-white/20 text-white font-bold py-2 px-4 rounded-xl backdrop-blur-3xl">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Precipitation: {day.precipitation}%
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedDay !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-white/10 rounded-[2.5rem] border border-white/20 flex flex-col sm:flex-row justify-between items-center gap-6 glass-glow shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-white/10 rounded-3xl border border-white/10">
                    {(() => {
                      const SelectedIcon = weatherIcons[forecast[selectedDay!].condition];
                      return <SelectedIcon size={40} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-white tracking-tight">
                      {forecast[selectedDay].date.toLocaleDateString('en-US', { weekday: 'long' })}
                    </h4>
                    <p className="text-white font-bold uppercase tracking-widest text-[10px] mt-1">{forecast[selectedDay].condition} Forecast</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 text-center sm:text-right">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white font-black uppercase tracking-widest">High Temp</p>
                    <p className="font-black text-2xl tracking-tighter text-white">{forecast[selectedDay].temperature.max}°</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white font-black uppercase tracking-widest">Low Temp</p>
                    <p className="font-black text-2xl tracking-tighter text-white">{forecast[selectedDay].temperature.min}°</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white font-black uppercase tracking-widest">Rain Chance</p>
                    <p className="font-black text-2xl tracking-tighter text-blue-200">{forecast[selectedDay].precipitation}%</p>
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
