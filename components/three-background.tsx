"use client"


import dynamic from 'next/dynamic'

// Dynamically import the new high-performance background components
const Prism = dynamic(() => import('./background-effects/prism'), { ssr: false })

export default function ThreeBackground({ condition = 'Clear' }: { condition?: string }) {
    const c = condition.toLowerCase()

    const isClear = c.includes('clear') || c.includes('sunny')
    const isStorm = c.includes('thunder')
    const isCloud = c.includes('cloud') || c.includes('overcast') || c.includes('mist')

    return (
        <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-[#050a15] transition-colors duration-1000">
            {/* PRISM DEFAULT LAYER */}
            <div className={`absolute inset-0 transition-opacity duration-1000 mix-blend-screen opacity-50`}>
                <Prism
                    height={3.5}
                    baseWidth={5.5}
                    animationType="rotate"
                    glow={0.5}
                    noise={0.3}
                    transparent={true}
                    hueShift={isStorm ? 280 : isCloud ? 45 : isClear ? 60 : 200} // Shift based on weather
                    colorFrequency={isStorm ? 2 : 1}
                    timeScale={isStorm ? 1.5 : isCloud ? 0.3 : 0.5}
                />
            </div>

            {/* VIGNETTE OVERLAY FOR DEPTH - Richer dark edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 pointer-events-none z-10" />
        </div>
    )
}
