"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Sparkles } from "lucide-react"

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
        <GlassCard className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-white/10 rounded-full mt-1">
                    <Sparkles className="h-5 w-5 text-yellow-200" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Daily Story</h3>
                    <p className="text-white/80 leading-relaxed italic">
                        &quot;{story}&quot;
                    </p>
                </div>
            </div>
        </GlassCard>
    )
}
