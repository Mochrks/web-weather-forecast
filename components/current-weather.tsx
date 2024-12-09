'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const weatherIcons = {
  'sunny': Sun,
  'cloudy': Cloud,
  'rainy': CloudRain,
  'snowy': CloudSnow,
  'windy': Wind,
}

export default function CurrentWeather({ city, date }: { city: string, date: Date }) {
  const [weather, setWeather] = useState({
    temperature: 25,
    condition: 'sunny' as keyof typeof weatherIcons,
    humidity: 60,
    windSpeed: 10,
  })

  useEffect(() => {
    const fetchWeather = async () => {
      setWeather({
        temperature: Math.floor(Math.random() * 35),
        condition: Object.keys(weatherIcons)[Math.floor(Math.random() * Object.keys(weatherIcons).length)] as keyof typeof weatherIcons,
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 30),
      })
    }
    fetchWeather()
  }, [city, date])

  const WeatherIcon = weatherIcons[weather.condition]

  const getWeatherAnimation = () => {
    switch (weather.condition) {
      case 'sunny':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sun size={120} className="text-yellow-300" />
          </motion.div>
        )
      case 'cloudy':
        return (
          <motion.div
            className="absolute inset-0 flex items-center justify-end"

          >
            <Cloud size={120} className="text-gray-700 dark:text-gray-200" />
          </motion.div>
        )
      case 'rainy':
        return (
          <div className="absolute inset-0 flex items-center justify-end">
            <CloudRain size={120} className="text-blue-200 dark:text-blue-300" />
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-200  rounded-full"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 100, opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeIn"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        )
      default:
        return <WeatherIcon size={120} className="text-white" />
    }
  }

  return (
    <Card className="bg-transparent backdrop-blur-lg text-white dark:bg-gray-800/50 dark:text-gray-200 overflow-hidden py-5">
      <CardHeader>
        <CardTitle className="text-2xl">{city}</CardTitle>
        <CardDescription className="text-white dark:text-gray-200 ">
          {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={weather.temperature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-6xl font-bold">{weather.temperature}°C</p>
              <p className="text-2xl mt-2 capitalize">{weather.condition}</p>
            </motion.div>
          </AnimatePresence>
          {getWeatherAnimation()}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-sm text-white/70 dark:text-gray-200">Humidity</p>
            <p className="text-2xl font-semibold">{weather.humidity}%</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-sm text-white/70 dark:text-gray-200">Wind Speed</p>
            <p className="text-2xl font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

