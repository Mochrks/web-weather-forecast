'use client'

import { useState, useEffect } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-2xl font-bold text-white dark:text-gray-200">
      {time.toLocaleTimeString()}
    </div>
  )
}

