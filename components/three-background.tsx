"use client"

import { useMemo } from "react"
import dynamic from 'next/dynamic'

// Dynamically import the new high-performance background components
const LiquidEther = dynamic(() => import('./background-effects/liquid-ether'), { ssr: false })
const LightRays = dynamic(() => import('./background-effects/light-rays'), { ssr: false })
const Particles = dynamic(() => import('./background-effects/particles'), { ssr: false })

interface Palette {
    colors: string[]
    accent: string
    fog: string
    raysOrigin?: string
}

const WEATHER_PALETTES: Record<string, Palette> = {
    clear: {
        colors: ['#4facfe', '#c2e9fb', '#4facfe'], // Brighter blue
        accent: '#f6d365', // Golden sun
        fog: '#050a15',
        raysOrigin: 'top-right'
    },
    clouds: {
        colors: ['#667eea', '#764ba2', '#a1887f'], // Muted purple/gray
        accent: '#ffffff',
        fog: '#080c14',
        raysOrigin: 'top-center'
    },
    rain: {
        colors: ['#0f3443', '#243b55', '#3a6073'], // Deep storm blues
        accent: '#6cb4ee',
        fog: '#04080c',
        raysOrigin: 'top-left'
    },
    snow: {
        colors: ['#e6e9f0', '#eef1f5', '#83a4d4'], // Pure icy whites
        accent: '#ffffff',
        fog: '#0a101a',
        raysOrigin: 'top-center'
    },
    thunder: {
        colors: ['#1a0a2e', '#4a0e0e', '#000000'], // Electric darks
        accent: '#ffd200',
        fog: '#030308',
        raysOrigin: 'top-right'
    },
    mist: {
        colors: ['#bdc3c7', '#2c3e50', '#7f8c8d'], // Foggy grays
        accent: '#ffffff',
        fog: '#070b12',
        raysOrigin: 'top-center'
    }
}

function getPalette(condition: string): Palette {
    const c = condition.toLowerCase()
    if (c.includes('clear') || c.includes('sunny')) return WEATHER_PALETTES.clear
    if (c.includes('cloud') || c.includes('overcast')) return WEATHER_PALETTES.clouds
    if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return WEATHER_PALETTES.rain
    if (c.includes('snow')) return WEATHER_PALETTES.snow
    if (c.includes('thunder')) return WEATHER_PALETTES.thunder
    return WEATHER_PALETTES.mist
}

export default function ThreeBackground({ condition = 'Clear' }: { condition?: string }) {
    const palette = useMemo(() => getPalette(condition), [condition])
    const c = condition.toLowerCase()

    const isRain = c.includes('rain') || c.includes('drizzle') || c.includes('shower')
    const isSnow = c.includes('snow')
    const isClear = c.includes('clear') || c.includes('sunny')
    const isStorm = c.includes('thunder')

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#050a15]">
            {/* BASE LAYER: Liquid Ether Simulation - Ultrafast resolution */}
            <LiquidEther
                colors={palette.colors}
                autoSpeed={isStorm ? 1.0 : isRain ? 0.6 : 0.25}
                autoIntensity={isStorm ? 2.5 : 1.5}
                mouseForce={isClear ? 15 : 10}
                resolution={0.15} // Extremely light resolution for smooth movement
            />

            {/* LIGHT RAY LAYER: Selective Sunlight - Only for Clear/Cloudy/Snow */}
            {(isClear || isSnow || c.includes('cloud')) && (
                <LightRays
                    raysColor={palette.accent}
                    raysOrigin={palette.raysOrigin}
                    raysSpeed={isClear ? 0.8 : 0.4}
                    lightSpread={isClear ? 1.2 : 0.6}
                    rayLength={2.0}
                    pulsating={isClear}
                    opacity={0.2} // Further reduced opacity and complexity
                />
            )}

            {/* PARTICLE LAYER: Minimal Weather FX */}
            {isRain ? (
                <Particles
                    particleCount={150} // Heavy optimization
                    particleSpread={12}
                    speed={2.0}
                    particleColors={['#6cb4ee', '#ffffff', '#3a6073']}
                    particleBaseSize={60}
                    moveParticlesOnHover={true}
                />
            ) : isSnow ? (
                <Particles
                    particleCount={80} // Reduced for performance
                    particleSpread={18}
                    speed={0.2}
                    particleColors={['#ffffff', '#eef1f5']}
                    particleBaseSize={100}
                    sizeRandomness={0.8}
                    moveParticlesOnHover={false}
                />
            ) : isClear ? (
                <Particles
                    particleCount={60} // Minimal twinkling
                    particleSpread={25}
                    speed={0.05}
                    particleColors={['#ffffff', '#f6d365']}
                    particleBaseSize={50}
                    disableRotation={true}
                />
            ) : (
                <Particles
                    particleCount={40} // Ambient only
                    particleSpread={20}
                    speed={0.03}
                    particleColors={['#ffffff']}
                    particleBaseSize={30}
                />
            )}

            {/* VIGNETTE OVERLAY FOR DEPTH */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>
    )
}
