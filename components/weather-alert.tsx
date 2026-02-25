'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, ShieldAlert } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Alert {
  type: 'warning' | 'severe' | 'emergency'
  message: string
}

const alertStyles = {
  warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-200', icon: 'text-yellow-400' },
  severe: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-200', icon: 'text-orange-400' },
  emergency: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-200', icon: 'text-red-400' }
}

export default function WeatherAlert({ city }: { city: string }) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const fetchAlerts = () => {
      const possibleAlerts: Alert[] = [
        { type: 'warning', message: 'Strong convective activity approaching region.' },
        { type: 'severe', message: 'Precipitation intensity surpassing threshold standards.' },
        { type: 'emergency', message: 'Atmospheric temperature reaching critical high levels.' },
      ]
      setAlerts(possibleAlerts.filter(() => Math.random() > 0.4))
    }
    fetchAlerts()
  }, [city])

  const removeAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index))
  }

  if (alerts.length === 0) return (
    <div className="glass-card flex flex-col items-center justify-center p-8 text-center glass-shimmer">
      <div className="p-4 bg-white/5 rounded-full border border-white/5 mb-4">
        <ShieldAlert className="text-emerald-400 opacity-60" size={40} />
      </div>
      <h4 className="text-xl font-black text-white tracking-tight uppercase">Airspace Clear</h4>
      <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] mt-2">No active atmospheric alerts</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.message}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center justify-between p-6 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl ${alertStyles[alert.type].bg} ${alertStyles[alert.type].border}`}
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl bg-white/10 ${alertStyles[alert.type].icon} shadow-inner`}>
                <AlertTriangle size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90 mb-1">
                  {alert.type} Alert detected
                </p>
                <span className={`text-lg font-black tracking-tight text-white`}>
                  {alert.message}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeAlert(index)}
              className="h-12 w-12 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <X size={24} />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
