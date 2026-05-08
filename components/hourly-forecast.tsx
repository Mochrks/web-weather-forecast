'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ChartData {
  month: string
  value: number
}

const tabs = ['Humidity', 'UV index', 'Rainfall', 'Pressure'] as const

function generateData(tab: string): ChartData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(m => {
    let value: number
    if (tab === 'Humidity') value = Math.floor(Math.random() * 50) + 30
    else if (tab === 'UV index') value = Math.floor(Math.random() * 10) + 1
    else if (tab === 'Rainfall') value = Math.floor(Math.random() * 80) + 5
    else value = Math.floor(Math.random() * 60) + 980
    return { month: m, value }
  })
}

interface HourlyForecastProps {
  city: string
  displayTemp: (temp: number) => number
}

export default function HourlyForecast({ city }: HourlyForecastProps) {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Humidity')
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    setData(generateData(activeTab))
  }, [city, activeTab])

  const avg = useMemo(() => {
    if (data.length === 0) return 0
    return Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)
  }, [data])

  const suffix = activeTab === 'Humidity' ? '%' : activeTab === 'UV index' ? '' : activeTab === 'Rainfall' ? 'mm' : 'hPa'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card glass-shimmer flex-1 min-h-0 flex flex-col h-full"
      style={{ padding: 'clamp(12px, 1.5vh, 22px) clamp(14px, 2vw, 28px)' }}
    >
      {/* Header with tabs — tabs scroll on mobile */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0 gap-3">
        <h3 className="text-base md:text-lg font-bold tracking-tight flex-shrink-0" style={{ color: '#F5F7FA' }}>
          Overview
        </h3>
        <div className="flex gap-1 p-0.5 rounded-xl overflow-x-auto flex-shrink min-w-0"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-semibold rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0"
              style={{
                color: activeTab === tab ? '#F5F7FA' : '#6B7A90',
                background: activeTab === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: activeTab === tab ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart — min height enforced for mobile */}
      <div className="flex-1 min-h-[180px] md:min-h-0 relative">
        {/* Average label */}
        <div className="absolute top-2 left-1/4 md:left-1/3 z-10 flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-lg"
          style={{ background: 'rgba(20,28,45,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#78FFB7' }} />
          <span className="text-[9px] md:text-[10px] font-semibold" style={{ color: '#A7B0C0' }}>
            Average {avg}{suffix}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 25, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="overviewFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A7B0C0" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#A7B0C0" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="overviewStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6B7A90" stopOpacity={0.6} />
                <stop offset="50%" stopColor="#A7B0C0" stopOpacity={1} />
                <stop offset="100%" stopColor="#6B7A90" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.4)"
              fontSize={9}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              dy={8}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              fontSize={9}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => activeTab === 'Pressure' ? '' : `${v}${activeTab === 'Humidity' || activeTab === 'Rainfall' ? '%' : ''}`}
              dx={-5}
              width={35}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{
                backgroundColor: 'rgba(20, 28, 45, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                padding: '8px 14px',
                fontSize: '11px',
              }}
              labelStyle={{ color: '#F5F7FA', fontWeight: '700', fontSize: '11px', marginBottom: '2px' }}
              itemStyle={{ color: '#A7B0C0', fontWeight: '600', fontSize: '11px' }}
              formatter={(value: number) => [`${value}${suffix}`, activeTab]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#overviewStroke)"
              strokeWidth={2}
              fill="url(#overviewFill)"
              animationDuration={1200}
              dot={false}
              activeDot={{
                r: 4,
                fill: '#F5F7FA',
                stroke: 'rgba(255,255,255,0.2)',
                strokeWidth: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
