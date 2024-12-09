'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    <Card className="bg-transparent backdrop-blur-lg text-white  dark:bg-gray-800/50 dark:text-gray-200 ">
      <CardHeader className='border-b border-white   dark:bg-gray-800 rounded-md dark:border-none' >
        <CardTitle className="text-2xl">7-Day Forecast</CardTitle>
        <CardDescription className="text-white/70 dark:text-gray-200 py-2">{city}</CardDescription>
      </CardHeader>
      <CardContent className='pt-10'>
        <div className="grid grid-cols-7 gap-2 mb-4 ">
          {forecast.map((day, index) => {
            const WeatherIcon = weatherIcons[day.condition]
            const isSelected = selectedDay === index
            return (
              <TooltipProvider key={day.date.toISOString()}>
                <Tooltip>
                  <TooltipTrigger asChild className='border dark:border-white rounded-xl w-full h-full'>
                    <Button
                      variant="ghost"
                      className={`flex flex-col  space-y-5 gap-4 items-center p-1 rounded-lg transition-all ${isSelected ? 'bg-white/50 dark:bg-gray-700/50' : 'hover:bg-white/10 dark:hover:bg-gray-700/30'
                        }`}
                      onClick={() => setSelectedDay(isSelected ? null : index)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <p className="text-xs font-semibold">{day.date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <p className="text-xs">{day.date.getDate()}</p>
                        <WeatherIcon size={20} className="my-1 mx-auto text-yellow-300 " />
                        <p className="text-xs">{day.temperature.max}°</p>
                        <p className="text-xs ">{day.temperature.min}°</p>
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Precipitation: {day.precipitation}%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
        {selectedDay !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 p-4 bg-white/20 dark:bg-gray-700/30 rounded-lg"
          >
            <h3 className="text-lg font-semibold mb-2">
              {forecast[selectedDay].date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <p>Condition: {forecast[selectedDay].condition}</p>
            <p>Max Temperature: {forecast[selectedDay].temperature.max}°C</p>
            <p>Min Temperature: {forecast[selectedDay].temperature.min}°C</p>
            <p>Precipitation: {forecast[selectedDay].precipitation}%</p>
          </motion.div>
        )}
      </CardContent>
    </Card >
  )
}

