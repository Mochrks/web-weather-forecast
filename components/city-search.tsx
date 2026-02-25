'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'
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
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl mx-auto mb-16 px-4"
    >
      <div className="relative w-full group">
        {/* Search Icon Left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white/40 group-focus-within:text-white group-focus-within:scale-110 transition-all duration-500">
          <MapPin size={22} className="group-focus-within:animate-bounce" />
        </div>

        <Input
          type="text"
          placeholder="Where would you like to explore?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
          className="glass-input w-full h-16 pl-16 pr-32 text-xl text-white placeholder:text-white border-white/20 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-700 hover:bg-white/10 dark:hover:bg-black/40 font-bold"
        />

        {/* Action Button Right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="h-12 px-6 rounded-full bg-white text-black hover:bg-black hover:text-white font-black text-sm uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale shadow-xl"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                FIND <Search size={16} strokeWidth={3} />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Search Subtle Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 -z-10" />
    </form>
  )
}
