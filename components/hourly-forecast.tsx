'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

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
    <div className="glass-panel text-white h-full p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight">Hourly Forecast</h3>
        <p className="text-white/50 text-sm">{city}</p>
      </div>

      <div className="w-full h-[300px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="hour"
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px'
                }}
                labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                itemStyle={{ color: '#ffffff' }}
                formatter={(value: number) => [`${value}°`, 'Temp']}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ffffff', strokeWidth: 0, fillOpacity: 0.5 }}
                activeDot={{ r: 8, fill: '#ffffff' }}
                fill="url(#tempGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

