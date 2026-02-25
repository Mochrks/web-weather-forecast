"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Sparkles, Quote } from "lucide-react"

interface WeatherStoryProps {
    description: string
    condition: string
    city: string
    temp: number
}

function generateStory(condition: string, temp: number, city: string): string {
    const c = condition.toLowerCase();

    if (c.includes('rain')) {
        return `The skies over ${city} weep gently today. A perfect time to find comfort indoors with a warm drink while the rhythm of the rain plays against your window.`;
    }
    if (c.includes('cloud')) {
        return `${city} is wrapped in a soft blanket of gray clouds. The light is diffused and calm, offering a quiet moment of reflection in the bustling day.`;
    }
    if (c.includes('clear') || c.includes('sunny')) {
        if (temp > 25) {
            return `Golden sunlight floods the streets of ${city}. The energy is vibrant and warm, inviting you to step out and soak up the brilliance of the day.`;
        }
        return `The sun shines bright over ${city}, casting crisp shadows. It's a beautiful, clear day that promises clarity and new perspectives.`;
    }
    if (c.includes('snow')) {
        return `A silent hush has fallen over ${city} as snowflakes dance through the air. The world is transforming into a pristine white canvas waiting for new footprints.`;
    }
    if (c.includes('thunder')) {
        return `The air in ${city} is electric. Nature displays its raw power today, a reminder of the wild forces that shape our world. Stay safe and watch the show.`;
    }
    return `Today in ${city}, the weather paints a unique scene. Embrace the atmosphere and make the most of this moment in time.`;
}

export default function WeatherStory({ condition, city, temp }: WeatherStoryProps) {
    const story = generateStory(condition, temp, city);

    return (
        <GlassCard
            className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent h-full p-8 glass-shimmer glass-glow"
            glow
            shimmer
        >
            <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl border border-white/5 shadow-inner">
                            <Sparkles className="h-6 w-6 text-yellow-200 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">AI Atmospheric Tale</h3>
                    </div>
                    <Quote size={40} className="text-white/5 opacity-40 rotate-180" />
                </div>

                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-xl md:text-2xl text-white leading-relaxed italic font-bold tracking-wide">
                        &quot;{story}&quot;
                    </p>
                </div>

                <div className="pt-6 border-t border-white/20 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span>Generated Moment</span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                        Neural Scripting
                    </span>
                </div>
            </div>
        </GlassCard>
    )
}
