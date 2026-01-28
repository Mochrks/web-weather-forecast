"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type WeatherCondition = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Drizzle' | 'Mist' | string

interface AmbientBackgroundProps {
    condition?: WeatherCondition
}

const getColors = (condition: string) => {
    const c = condition.toLowerCase()
    if (c.includes('clear') || c.includes('sunny')) return {
        background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', // Bright Blue Sky
    }
    if (c.includes('cloud')) return {
        background: 'linear-gradient(to bottom, #8e9eab 0%, #eef2f3 100%)', // Cloudy Gray
    }
    if (c.includes('rain') || c.includes('drizzle')) return {
        background: 'linear-gradient(to bottom, #203a43 0%, #2c5364 100%)', // Dark Stormy Blue
    }
    if (c.includes('snow')) return {
        background: 'linear-gradient(to bottom, #83a4d4 0%, #b6fbff 100%)', // Icy Blue
    }
    if (c.includes('thunder')) return {
        background: 'linear-gradient(to bottom, #0f2027 0%, #203a43 100%, #2c5364 100%)', // Deep Dark
    }
    // Default Night/Dark
    return {
        background: 'linear-gradient(to bottom, #0f2027 0%, #203a43 100%)',
    }
}

export function AmbientBackground({ condition = 'Clear' }: AmbientBackgroundProps) {
    const [styles, setStyles] = useState(getColors(condition))

    useEffect(() => {
        setStyles(getColors(condition))
    }, [condition])

    return (
        <div className="fixed inset-0 -z-50 bg-black transition-colors duration-1000">
            {/* Base Gradient Layer */}
            <motion.div
                className="absolute inset-0"
                animate={{ background: styles.background }}
                transition={{ duration: 1.5 }}
            />


        </div>
    )
}
