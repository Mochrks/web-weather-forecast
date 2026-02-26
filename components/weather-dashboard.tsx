'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import CurrentWeather from './current-weather'
import WeeklyForecast from './weekly-forecast'
import HourlyForecast from './hourly-forecast'
import WeatherDetails from './weather-details'
import CitySearch from './city-search'
import AirQualityIndex from './air-quality-index'
import { ThemeToggle } from './theme-toggle'
import WeatherAlert from './weather-alert'
import { getWeather, WeatherData } from '@/lib/weather-service'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import WeatherStory from "@/components/weather-story"
import WeatherSuggestions from "@/components/weather-suggestions"

// Dynamic import for Three.js background (no SSR)
const ThreeBackground = dynamic(() => import('./three-background'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-50 bg-[#050510]" />
  ),
})

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  // Initial load
  useEffect(() => {
    handleSearch('Jakarta')
  }, [])

  console.log('weatherData', weatherData)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative min-h-screen flex flex-col pb-20 overflow-x-hidden">
      {/* 3D Animated Background */}
      <ThreeBackground condition={weatherData?.condition} />

      {/* ══════════════════════════════════════════
          HEADER
          ══════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass glass-shimmer flex flex-col md:flex-row justify-between items-center mb-10 relative z-20 gap-6 p-6"
      >
        <div className="flex items-center gap-4">
          <div className="glass-pill p-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500 shadow-lg shadow-blue-500/25" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-shimmer tracking-tight">Weathify</h1>
            <p className="text-white/40 text-sm font-medium tracking-wide">Liquid Glass Weather</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          <div className="hidden md:flex gap-1 glass-pill p-1.5">
            {['Clear', 'Rain', 'Snow', 'Clouds', 'Mist'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  if (weatherData) {
                    setWeatherData({
                      ...weatherData,
                      condition: mode,
                      description: `Demo ${mode}`,
                      temperature: mode === 'Snow' ? -2 : mode === 'Clear' ? 30 : 20
                    })
                  }
                }}
                className="px-4 py-1.5 text-xs font-medium rounded-full text-white/50 hover:bg-white/15 hover:text-white transition-all duration-300"
              >
                {mode}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════ */}
      <main className="relative z-10 flex-grow w-full">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12 relative z-30"
        >
          <CitySearch onCityChange={handleSearch} isLoading={loading} />
        </motion.div>

        {/* Global Loading Spinner for search updates */}
        {loading && !weatherData && (
          <div className="flex flex-col items-center justify-center py-20 text-white gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            <p className="font-bold tracking-widest uppercase text-xs opacity-50">Calibrating Atmos Sensors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8 glass border-red-500/20 text-white max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {weatherData && !loading ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* ── Top Row ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-8 h-full scroll-reveal-left">
                  <CurrentWeather data={weatherData} />
                </div>

                <div className="lg:col-span-12 xl:col-span-4 space-y-8 flex flex-col">
                  <div className="glass-card glass-shimmer p-8 flex-grow flex flex-col justify-center min-h-[200px]">
                    <h3 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Air Quality</h3>
                    <AirQualityIndex city={weatherData?.city} />
                  </div>
                  <div className="glass-card glass-shimmer p-8 flex-grow min-h-[200px]">
                    <h3 className="text-white font-black mb-6 text-sm uppercase tracking-widest">Highlights</h3>
                    <WeatherDetails city={weatherData?.city} />
                  </div>
                </div>
              </div>

              {/* ── Middle Row ── */}
              <div className="scroll-reveal-scale">
                <HourlyForecast city={weatherData?.city} />
              </div>

              {/* ── Bottom Section ── */}
              <div className="space-y-10">
                <div className="scroll-reveal">
                  <WeeklyForecast city={weatherData?.city} />
                </div>

                <div className="scroll-reveal-right">
                  <WeatherSuggestions condition={weatherData?.condition} temp={weatherData?.temperature} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="scroll-reveal-left">
                    <WeatherStory
                      city={weatherData?.city}
                      condition={weatherData?.condition}
                      description={weatherData?.description}
                      temp={weatherData?.temperature}
                    />
                  </div>
                  <div className="scroll-reveal-right">
                    <WeatherAlert city={weatherData.city} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="mt-24 py-10 text-center text-white text-sm relative z-10 glass mx-auto w-full max-w-5xl scroll-reveal">
        <p className="font-bold tracking-widest uppercase text-[10px] opacity-100">
          &copy; 2026 Weathify. Created by <a href="https://github.com/Mochrks" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors underline decoration-blue-400/50 underline-offset-4">Mochrks</a>
        </p>
      </footer>
    </div>
  )
}
