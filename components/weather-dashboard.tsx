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
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <AmbientBackground condition={weatherData?.condition} />

      <div className="flex justify-between items-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">Weathify</h1>
          <p className="text-white/60">Advanced Weather Forecast</p>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-md">
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
                className="px-3 py-1 text-xs rounded-md text-white/70 hover:bg-white/20 hover:text-white transition-all border border-transparent hover:border-white/10"
                title={`Test ${mode}`}
              >
                {mode}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10">
        <CitySearch onCityChange={handleSearch} isLoading={loading} />

        {error && (
          <Alert variant="destructive" className="mb-8 bg-red-500/20 border-red-500/30 text-white backdrop-blur-md">
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
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <CurrentWeather data={weatherData} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Ensure these components handle null data properly if they are rendered before data is fully ready, currently prevented by wrapper check */}
                    {weatherData && (
                      <>
                        <WeatherStory
                          city={weatherData.city}
                          condition={weatherData.condition}
                          description={weatherData.description}
                          temp={weatherData.temperature}
                        />
                        <WeatherSuggestions condition={weatherData.condition} temp={weatherData.temperature} />
                      </>
                    )}
                  </div>
                  <HourlyForecast city={weatherData.city} />
                </div>
                <div className="space-y-8">
                  <WeatherDetails city={weatherData.city} />
                  <AirQualityIndex city={weatherData.city} />
                  <WeeklyForecast city={weatherData.city} />
                </div>
              </div>

              <WeatherAlert city={weatherData.city} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <footer className="mt-20 text-center text-white/40 text-sm">
          <p>&copy; 2025 Weathify. Design by Mochrks.</p>
        </footer>
      </div>
    </div>
  )
}
