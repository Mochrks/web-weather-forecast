'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CitySearchProps {
  onCityChange: (city: string) => void
  isLoading?: boolean
}

export default function CitySearch({ onCityChange, isLoading }: CitySearchProps) {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onCityChange(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-md mx-auto mb-10">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          className="w-full pl-6 pr-12 h-14 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-lg text-white placeholder:text-white/50 rounded-full focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-0 transition-all duration-300 shadow-lg hover:bg-white/15 dark:hover:bg-black/30"
        />
        <Button
          type="submit"
          disabled={isLoading || !city.trim()}
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  )
}

