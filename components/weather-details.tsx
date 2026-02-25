'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Wind, Sun, Umbrella, Thermometer, Gauge } from 'lucide-react'

interface WeatherDetail {
  icon: React.ElementType
  label: string
  value: string
  color: string
}

export default function WeatherDetails({ city }: { city: string }) {
  const [details, setDetails] = useState<WeatherDetail[]>([])

  useEffect(() => {
    const fetchWeatherDetails = async () => {
      const newDetails: WeatherDetail[] = [
        { icon: Droplets, label: 'Humidity', value: `${Math.floor(Math.random() * 100)}%`, color: 'text-blue-300' },
        { icon: Wind, label: 'Wind Speed', value: `${Math.floor(Math.random() * 30)} km/h`, color: 'text-cyan-300' },
        { icon: Sun, label: 'UV Index', value: `${Math.floor(Math.random() * 11)}`, color: 'text-yellow-300' },
        { icon: Umbrella, label: 'Rain Prob.', value: `${Math.floor(Math.random() * 100)}%`, color: 'text-indigo-300' },
        { icon: Thermometer, label: 'Feels Like', value: `${Math.floor(Math.random() * 35)}°C`, color: 'text-orange-300' },
        { icon: Gauge, label: 'Pressure', value: `${Math.floor(Math.random() * 1000 + 900)} hPa`, color: 'text-emerald-300' },
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
            className="flex flex-col items-center justify-center p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 active:scale-95 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`p-4 rounded-2xl bg-white/10 mb-3 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 shadow-inner`}>
              <detail.icon className={`${detail.color}`} size={24} />
            </div>
            <div className="text-center">
              <p className="text-[10px] text-white font-black uppercase tracking-[0.2em] mb-1">{detail.label}</p>
              <p className="text-lg font-black text-white tracking-tight">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
