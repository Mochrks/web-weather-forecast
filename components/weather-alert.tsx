'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Alert {
  type: 'warning' | 'severe' | 'emergency'
  message: string
}

const alertColors = {
  warning: 'bg-yellow-500',
  severe: 'bg-orange-500',
  emergency: 'bg-red-500'
}

export default function WeatherAlert({ city }: { city: string }) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Simulating fetching weather alerts
    const fetchAlerts = () => {
      const possibleAlerts: Alert[] = [
        { type: 'warning', message: 'Strong winds expected tomorrow' },
        { type: 'severe', message: 'Heavy rainfall may cause flooding' },
        { type: 'emergency', message: 'Extreme heat wave approaching' },
      ]
      setAlerts(possibleAlerts.filter(() => Math.random() > 0.5))
    }
    fetchAlerts()
  }, [city])

  const removeAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index))
  }

  if (alerts.length === 0) return null

  return (
    <Card className="mt-8 overflow-hidden">
      <CardContent className="p-0">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-4 ${alertColors[alert.type]} text-white`}
            >
              <div className="flex items-center">
                <AlertTriangle className="mr-2" />
                <span>{alert.message}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAlert(index)}
                className="text-white hover:bg-white/20"
              >
                <X size={18} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

