'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, CloudFog, CloudLightning, CloudDrizzle } from 'lucide-react'
import { GlassCard } from "@/components/ui/glass-card"
import type { WeatherData } from '@/lib/weather-service'

// Map OpenWeatherMap main conditions to Lucide icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const weatherIcons: Record<string, React.ComponentType<any>> = {
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

export default function CurrentWeather({ data }: { data: WeatherData | null }) {
  if (!data) return null

  const Icon = weatherIcons[data.condition] || Sun

  return (
    <GlassCard className="w-full relative overflow-visible py-10 px-8 min-h-[400px] flex flex-col justify-between group">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between z-10 relative">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              {data.city}
            </h2>
            <p className="text-white/60 text-xl font-medium flex items-center gap-2">
              <span className="bg-white/20 px-2 py-0.5 rounded text-sm uppercase tracking-wider">{data.country}</span>
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start">
              <span className="text-[8rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
                {data.temperature}°
              </span>
            </div>
            <p className="text-2xl text-white/80 capitalize font-light mt-[-10px] pl-2">{data.description}</p>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-0 right-0 md:relative md:top-auto md:right-auto opacity-50 md:opacity-100 scale-75 md:scale-100 origin-top-right transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        >
          <div className="absolute inset-0 blur-[60px] bg-white/30 rounded-full" />
          <Icon size={200} className="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" strokeWidth={1} />
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
          <div className="p-3 rounded-full bg-white/10 text-blue-200">
            <Wind size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Wind</p>
            <p className="text-xl font-semibold text-white">{data.windSpeed} <span className="text-sm font-normal text-white/60">km/h</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
          <div className="p-3 rounded-full bg-white/10 text-blue-200">
            <Droplets size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50 font-medium uppercase tracking-wider">Humidity</p>
            <p className="text-xl font-semibold text-white">{data.humidity}<span className="text-sm font-normal text-white/60">%</span></p>
          </div>
        </div>
      </motion.div>
    </GlassCard>
  )
}

