'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AirQualityIndex({ city }: { city: string }) {
  const [aqi, setAqi] = useState(0)
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchAirQuality = async () => {
      const newAqi = Math.floor(Math.random() * 500)
      setAqi(newAqi)

      if (newAqi <= 50) setDescription('Excellent')
      else if (newAqi <= 100) setDescription('Nominal')
      else if (newAqi <= 150) setDescription('Elevated')
      else if (newAqi <= 200) setDescription('Hazardous')
      else if (newAqi <= 300) setDescription('Critical')
      else setDescription('Lethal')
    }
    fetchAirQuality()
  }, [city])

  const getColor = (aqi: number) => {
    if (aqi <= 50) return 'from-emerald-400 to-teal-500'
    if (aqi <= 100) return 'from-yellow-400 to-amber-500'
    if (aqi <= 150) return 'from-orange-400 to-orange-600'
    if (aqi <= 200) return 'from-red-400 to-rose-600'
    if (aqi <= 300) return 'from-purple-500 to-indigo-700'
    return 'from-slate-800 to-black'
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-1">Atmospheric Score</div>
            <p className="text-6xl font-black text-white tracking-tighter shadow-sm">{aqi}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className={`text-xs font-black px-4 py-1.5 rounded-full bg-gradient-to-r ${getColor(aqi)} text-white shadow-lg shadow-black/20 border border-white/20 tracking-widest uppercase`}>
              {description}
            </p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (aqi / 100) ? 'bg-white opacity-40' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-3xl shadow-inner group">
          <motion.div
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getColor(aqi)} shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
            initial={{ width: 0 }}
            animate={{ width: `${(aqi / 500) * 100}%` }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Liquid Shimmer on Progress Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[45deg] -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Leading Glow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-white/40 blur-md rounded-full" />
          </motion.div>
        </div>

        <div className="flex justify-between items-center mt-3 scale-x-[1.02]">
          <span className="text-[8px] font-black text-white tracking-tighter uppercase">Pristine 0</span>
          <div className="h-0.5 flex-grow mx-4 bg-white/20 rounded-full" />
          <span className="text-[8px] font-black text-white tracking-tighter uppercase">Maximum 500</span>
        </div>
      </motion.div>
    </div>
  )
}
