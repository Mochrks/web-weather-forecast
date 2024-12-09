'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="bg-transparent backdrop-blur-lg text-white dark:bg-gray-800/50 dark:text-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl">Hourly Forecast</CardTitle>
        <CardDescription className="text-white/70 dark:text-gray-400">{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[300px]"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <XAxis dataKey="hour" stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°C`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none' }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Line type="monotone" dataKey="temperature" stroke="#ffffff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  )
}

