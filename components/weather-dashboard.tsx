'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import CurrentWeather from './current-weather'
import WeeklyForecast from './weekly-forecast'
import HourlyForecast from './hourly-forecast'
import WeatherDetails from './weather-details'
import CitySearch from './city-search'
import AirQualityIndex from './air-quality-index'
import { ThemeToggle } from './theme-toggle'
// import ClockWidget from './clock-widget' 
import WeatherAlert from './weather-alert'
import { getWeather, WeatherData } from '@/lib/weather-service'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AmbientBackground } from "@/components/ambient-background"
import WeatherStory from "@/components/weather-story"
import WeatherSuggestions from "@/components/weather-suggestions"

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative min-h-screen flex flex-col pb-20 overflow-x-hidden">
      <AmbientBackground condition={weatherData?.condition} />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-20 gap-6 glass shadow-sm p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
            {/* Simple Icon or Logo placeholder */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Weathify</h1>
            <p className="text-blue-100/70 text-sm font-medium">Glassmorphic Weather AI</p>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="hidden md:flex gap-1 bg-black/20 p-1.5 rounded-full backdrop-blur-xl border border-white/5">
            {/* Demo Controls */}
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
                className="px-4 py-1.5 text-xs font-medium rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-all hover:shadow-lg"
                title={`Test ${mode}`}
              >
                {mode}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow w-full">
        <div className="max-w-3xl mx-auto mb-10 relative z-30">
          <CitySearch onCityChange={handleSearch} isLoading={loading} />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 bg-red-500/20 border-red-500/30 text-white backdrop-blur-md max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {weatherData && !loading ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Top Row: Hero Card & Key Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Weather Card */}
                <div className="lg:col-span-8">
                  <div className="h-full">
                    <CurrentWeather data={weatherData} />
                  </div>
                </div>

                {/* Side Stats / Details */}
                <div className="lg:col-span-4 space-y-6 flex flex-col">
                  <div className="glass-card p-6 flex-grow flex flex-col justify-center min-h-[200px]">
                    <h3 className="text-white/80 font-medium mb-4">Air Quality</h3>
                    <AirQualityIndex city={weatherData.city} />
                  </div>
                  <div className="glass-card p-6 flex-grow min-h-[200px]">
                    <h3 className="text-white/80 font-medium mb-4">Highlights</h3>
                    <WeatherDetails city={weatherData.city} />
                  </div>
                </div>
              </div>

              {/* Middle Row: Forecasts */}
              <div className="grid grid-cols-1 gap-6">
                {/* Hourly - Wide */}
                <div className="w-full">
                  <HourlyForecast city={weatherData.city} />
                </div>
              </div>

              {/* Bottom Section: Forecasts & AI */}
              <div className="space-y-6">

                {/* Weekly Forecast - Full Row */}
                <div className="w-full min-h-[300px]">
                  <WeeklyForecast city={weatherData.city} />
                </div>

                {/* Weather Suggestions - Full Row */}
                <div className="w-full">
                  <WeatherSuggestions condition={weatherData.condition} temp={weatherData.temperature} />
                </div>

                {/* Story & Alert - Grid Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeatherStory
                    city={weatherData.city}
                    condition={weatherData.condition}
                    description={weatherData.description}
                    temp={weatherData.temperature}
                  />
                  <WeatherAlert city={weatherData.city} />
                </div>
              </div>

            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-8 text-center text-white/40 text-sm relative z-10 glass rounded-3xl mx-auto w-full max-w-4xl backdrop-blur-xl border-white/5">
        <p className="font-medium">
          &copy; 2025 Weathify. Created by <a href="https://github.com/Mochrks" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors underline decoration-blue-400/30 underline-offset-4">Mochrks</a>
        </p>
      </footer>
    </div>
  )
}
