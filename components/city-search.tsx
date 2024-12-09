'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CitySearch({ onCityChange }: { onCityChange: (city: string) => void }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onCityChange(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-8">
      <Input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow bg-white dark:bg-white text-black dark:text-gray-800 placeholder-white border-none"
      />
      <Button type="submit" variant="secondary" className="bg-white dark:bg-black text-black dark:text-white">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  )
}

