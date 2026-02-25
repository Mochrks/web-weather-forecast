'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, CloudFog, CloudLightning, CloudDrizzle } from 'lucide-react'
import { GlassCard } from "@/components/ui/glass-card"
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

export default function CurrentWeather({ data }: { data: WeatherData | null }) {
  if (!data) return null

  const Icon = weatherIcons[data.condition] || Sun

  return (
    <GlassCard
      className="w-full relative overflow-visible py-12 px-10 min-h-[450px] flex flex-col justify-between group glass-shimmer glass-glow"
      glow
      shimmer
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between z-10 relative">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {data.city}
              </h2>
              <span className="glass-pill px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                {data.country}
              </span>
            </div>
            <p className="text-white text-lg font-medium tracking-wide">Current Weather</p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start">
              <span className="text-[9rem] leading-none font-black text-white tracking-tighter drop-shadow-2xl">
                {data.temperature}°
              </span>
            </div>
            <p className="text-2xl md:text-3xl text-white capitalize font-light mt-[-15px] pl-2 tracking-wide">{data.description}</p>
          </motion.div>
        </div>

        <motion.div
          className="absolute top-0 right-0 md:relative md:top-auto md:right-auto opacity-30 md:opacity-100 scale-90 md:scale-100 origin-top-right transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
          initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.3 }}
        >
          {/* Animated Glow Behind Icon */}
          <div className="absolute inset-0 blur-[100px] bg-blue-400/30 rounded-full animate-aurora" />
          <Icon size={240} className="relative z-10 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" strokeWidth={1} />
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center space-x-5 p-5 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-500 border border-white/5 active:scale-95 group/stat">
          <div className="p-4 rounded-2xl bg-white/5 text-blue-300 group-hover/stat:scale-110 transition-transform duration-500 shadow-inner">
            <Wind size={28} />
          </div>
          <div>
            <p className="text-xs text-white font-bold uppercase tracking-widest mb-1">Wind Speed</p>
            <p className="text-2xl font-black text-white tracking-tight">{data.windSpeed} <span className="text-xs font-medium text-white tracking-normal ml-1">km/h</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-5 p-5 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-500 border border-white/5 active:scale-95 group/stat">
          <div className="p-4 rounded-2xl bg-white/5 text-cyan-300 group-hover/stat:scale-110 transition-transform duration-500 shadow-inner">
            <Droplets size={28} />
          </div>
          <div>
            <p className="text-xs text-white font-bold uppercase tracking-widest mb-1">Humidity</p>
            <p className="text-2xl font-black text-white tracking-tight">{data.humidity}<span className="text-xs font-medium text-white tracking-normal ml-1">%</span></p>
          </div>
        </div>
      </motion.div>
    </GlassCard>
  )
}
