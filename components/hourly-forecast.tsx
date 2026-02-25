'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface HourlyData {
  hour: string
  temperature: number
}

export default function HourlyForecast({ city }: { city: string }) {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([])

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      const newHourlyData = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        temperature: Math.floor(Math.random() * 35)
      }))
      setHourlyData(newHourlyData)
    }
    fetchHourlyForecast()
  }, [city])

  return (
    <div className="glass-panel text-white h-full p-8 glass-shimmer">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Hourly Pulse</h3>
          <p className="text-white text-sm font-medium tracking-wide">Temperature variation in {city}</p>
        </div>
        <div className="flex gap-2">
          <div className="glass-pill px-3 py-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Real-time</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[350px] relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis
                dataKey="hour"
                stroke="rgba(255,255,255,0.6)"
                fontSize={10}
                fontWeight="black"
                tickLine={false}
                axisLine={false}
                dy={15}
              />
              <YAxis
                stroke="rgba(255,255,255,0.6)"
                fontSize={10}
                fontWeight="black"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                dx={-10}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 30, 0.4)',
                  backdropFilter: 'blur(30px) saturate(2)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '24px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  padding: '12px 20px'
                }}
                labelStyle={{ color: '#ffffff', fontWeight: '900', fontSize: '14px', marginBottom: '4px' }}
                itemStyle={{ color: '#ffffff', fontWeight: '700' }}
                formatter={(value: number) => [`${value}°`, 'Temperature']}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="url(#glowGradient)"
                strokeWidth={4}
                fill="url(#tempGradientFill)"
                animationDuration={2000}
                dot={false}
                activeDot={{
                  r: 8,
                  fill: '#ffffff',
                  stroke: 'rgba(255,255,255,0.3)',
                  strokeWidth: 10,
                  className: "animate-pulse"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="mt-8 flex justify-between items-center text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
        <span>00:00 Midnight</span>
        <span>12:00 Noon</span>
        <span>23:59 Tonight</span>
      </div>
    </div>
  )
}
