'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import CurrentWeather from './current-weather'
import WeeklyForecast from './weekly-forecast'
import HourlyForecast from './hourly-forecast'
import WeatherDetails from './weather-details'
import AirQualityIndex from './air-quality-index'
import { getWeather, WeatherData } from '@/lib/weather-service'

// Dynamic import for Three.js background (no SSR)
const ThreeBackground = dynamic(() => import('./three-background'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-50 bg-[#060816]" />
  ),
})

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  const handleSearch = async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getWeather(city)
      setWeatherData(data)
    } catch {
      setError('Could not fetch weather data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      handleSearch(searchValue.trim())
    }
  }

  // Initial load
  useEffect(() => {
    handleSearch('Jakarta')
  }, [])

  const displayTemp = (temp: number) => {
    if (unit === 'F') return Math.round(temp * 9 / 5 + 32)
    return temp
  }

  return (
    <div className="fullscreen-dashboard">
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="ambient-bg" />
      <div className="ambient-noise" />
      <ThreeBackground condition={weatherData?.condition} />

      {/* ══════════════════════════════════════════
          TOP HEADER
          ══════════════════════════════════════════ */}
      <header className="top-header">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #78FFB7, #7DA2FF)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#060816" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-shimmer leading-none">Weathify</h1>
            <p className="text-[9px] font-medium tracking-wider uppercase" style={{ color: '#6B7A90' }}>Weather Intelligence</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="search-glass">
          <Search size={14} className="flex-shrink-0" style={{ color: '#6B7A90' }} />
          <input
            type="text"
            placeholder="Search city or location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={loading}
          />
          {loading && <Loader2 size={14} className="animate-spin flex-shrink-0" style={{ color: '#7DA2FF' }} />}
        </form>

        <div className="header-controls">
          <button className={`header-pill ${unit === 'C' ? 'active' : ''}`} onClick={() => setUnit('C')}>°C</button>
          <button className={`header-pill ${unit === 'F' ? 'active' : ''}`} onClick={() => setUnit('F')}>°F</button>
        </div>
      </header>

      {/* ── ERROR STATE ── */}
      {error && (
        <div className="mx-6 mb-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium" style={{ position: 'relative', zIndex: 10 }}>
          {error}
        </div>
      )}

      {/* ── LOADING STATE ── */}
      {loading && !weatherData && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ position: 'relative', zIndex: 10 }}>
          <Loader2 size={40} className="animate-spin" style={{ color: '#7DA2FF' }} />
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6B7A90' }}>
            Calibrating Sensors...
          </p>
        </div>
      )}

      {/* ══════════════════════════════════════════
          DASHBOARD BODY — DENSE GRID LAYOUT
          ══════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {weatherData && (
          <motion.div
            key="dashboard-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="dashboard-body"
          >
            {/* ═══════ LEFT COLUMN ═══════ */}
            <div className="flex flex-col gap-3 min-h-0 overflow-hidden max-lg:overflow-visible">
              {/* ROW 1: Current Weather Bar + Hourly */}
              <CurrentWeather data={weatherData} displayTemp={displayTemp} unit={unit} />

              {/* ROW 2: Overview Chart */}
              <div className="flex-1 min-h-0 max-lg:min-h-[280px] max-md:min-h-[240px]">
                <HourlyForecast city={weatherData.city} displayTemp={displayTemp} />
              </div>

              {/* ROW 3: World Forecast Cities */}
              <WorldForecast displayTemp={displayTemp} onCityClick={handleSearch} />
            </div>

            {/* ═══════ RIGHT COLUMN ═══════ */}
            <div className="flex flex-col gap-3 min-h-0 overflow-hidden max-lg:overflow-visible max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:gap-3">
              {/* Forecast */}
              <WeeklyForecast city={weatherData.city} displayTemp={displayTemp} />

              {/* Map Widget */}
              <MapWidget city={weatherData.city} country={weatherData.country} temp={displayTemp(weatherData.temperature)} humidity={weatherData.humidity} />

              {/* Air Quality */}
              <AirQualityIndex city={weatherData.city} />

              {/* Details */}
              <WeatherDetails city={weatherData.city} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════
   INLINE COMPONENTS — Map Widget & World Forecast
   ═══════════════════════════════════════════════════════════════ */

function MapWidget({ city, country, temp, humidity }: { city: string; country: string; temp: number; humidity: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-card glass-shimmer relative overflow-hidden"
      style={{ padding: '14px 16px', minHeight: '100px' }}
    >
      {/* Fake map background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 60% 40%, rgba(125,162,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(120,255,183,0.08) 0%, transparent 50%)
          `,
        }}
      />
      {/* Grid lines for map effect */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-2 h-2 rounded-full" style={{ background: '#78FFB7', boxShadow: '0 0 8px rgba(120,255,183,0.6)' }} />
          <span className="text-xs font-semibold" style={{ color: '#78FFB7' }}>{city}, {country}</span>
        </div>
        <p className="text-[11px] font-medium" style={{ color: '#A7B0C0' }}>
          {temp}° mostly cloudy
        </p>
        <p className="text-[11px] font-medium" style={{ color: '#6B7A90' }}>
          {humidity}% humidity
        </p>
      </div>
    </motion.div>
  )
}


function WorldForecast({ displayTemp, onCityClick }: { displayTemp: (t: number) => number; onCityClick: (city: string) => void }) {
  const cities = [
    { city: 'Lisbon', country: 'Portugal', temp: 23, high: 15 },
    { city: 'Kyoto', country: 'Japan', temp: 29, high: 16 },
    { city: 'Antalya', country: 'Türkiye', temp: 30, high: 19 },
    { city: 'Bali', country: 'Indonesia', temp: 28, high: 22 },
    { city: 'Dubai', country: 'UAE', temp: 38, high: 27 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card glass-shimmer flex-shrink-0"
      style={{ padding: 'clamp(10px, 1.2vh, 16px) clamp(14px, 1.5vw, 20px)' }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold tracking-tight" style={{ color: '#F5F7FA' }}>
            World Forecast
          </h3>
          <span className="text-[9px] font-medium" style={{ color: '#6B7A90' }}>
            Popular cities
          </span>
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md"
          style={{ color: '#78FFB7', background: 'rgba(120,255,183,0.08)', border: '1px solid rgba(120,255,183,0.12)' }}>
          Live
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {/* Add city card */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/[0.04]"
          style={{
            minWidth: 'clamp(80px, 8vw, 110px)',
            padding: '10px 8px',
            border: '1px dashed rgba(255,255,255,0.12)',
            borderRadius: '16px',
          }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1.5"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="text-sm font-medium" style={{ color: '#6B7A90' }}>+</span>
          </div>
          <span className="text-[9px] font-semibold text-center" style={{ color: '#6B7A90' }}>Add city</span>
        </div>

        {cities.map((c, i) => (
          <motion.div
            key={c.city}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.05 }}
            onClick={() => onCityClick(c.city)}
            className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/[0.06]"
            style={{
              minWidth: 'clamp(80px, 8vw, 110px)',
              padding: '10px 8px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
            }}
          >
            <span className="text-[10px] font-semibold mb-0.5" style={{ color: '#F5F7FA' }}>{c.city}</span>
            <span className="text-[8px] font-medium mb-1.5" style={{ color: '#6B7A90' }}>{c.country}</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-base font-bold" style={{ color: '#F5F7FA' }}>{displayTemp(c.temp)}°</span>
              <span className="text-[9px] font-medium" style={{ color: '#6B7A90' }}>/{displayTemp(c.high)}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
