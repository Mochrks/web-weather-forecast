'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CurrentWeather from './current-weather'
import WeeklyForecast from './weekly-forecast'
import HourlyForecast from './hourly-forecast'
import WeatherDetails from './weather-details'
import CitySearch from './city-search'
import AirQualityIndex from './air-quality-index'
import { ThemeToggle } from './theme-toggle'
import DateSelector from './date-selector'
import ClockWidget from './clock-widget'
import WeatherAlert from './weather-alert'


export default function WeatherDashboard() {
  const [city, setCity] = useState('Bandung')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeather, setCurrentWeather] = useState({
    condition: 'sunny' as 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy',
    temperature: 25
  })

  useEffect(() => {
    // Simulating API call to get current weather
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy']
    setCurrentWeather({
      condition: conditions[Math.floor(Math.random() * conditions.length)] as 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy',
      temperature: Math.floor(Math.random() * 30) + 10
    })
  }, [city])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white dark:text-gray-200 mb-4 md:mb-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Weather Forecast
        </motion.h1>
        <div className="flex items-center space-x-4">
          <ClockWidget />
          <ThemeToggle />
        </div>
      </div>
      <CitySearch onCityChange={setCity} />
      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <WeatherAlert city={city} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <CurrentWeather city={city} date={selectedDate} />
        <WeeklyForecast city={city} />
      </div>
      <div className="mt-8">
        <HourlyForecast city={city} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <WeatherDetails city={city} />
        <AirQualityIndex city={city} />
      </div>

      <footer className="mt-12 text-center text-white ">
        <p>© 2024 Weather Forecast. All rights reserved. </p>
        <a href="https://github.com/mochrks" target="_blank" rel="noopener noreferrer" className="text-white">
          mochrks
        </a>
      </footer>
    </div>
  )
}

