"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Shirt, Tent, Umbrella, Coffee, Sun } from "lucide-react"

interface WeatherSuggestionsProps {
    condition: string
    temp: number
}

function getSuggestions(condition: string, temp: number) {
    const c = condition.toLowerCase();

    if (c.includes('rain') || c.includes('drizzle') || c.includes('thunder')) {
        return {
            outfit: "Waterproof jacket, umbrella, and boots.",
            activity: "Great day for reading, indoor gaming, or visiting a cafe.",
            icon: Umbrella
        };
    }
    if (c.includes('snow')) {
        return {
            outfit: "Heavy coat, scarf, gloves, and thermal wear.",
            activity: "Build a snowman, drink hot cocoa, or skiing.",
            icon: Coffee
        };
    }
    if (c.includes('clear') || c.includes('sunny')) {
        if (temp > 28) {
            return {
                outfit: "Light fabrics, sunglasses, and a hat.",
                activity: "Swimming, beach trip, or ice cream run.",
                icon: Sun
            };
        }
        return {
            outfit: "T-shirt, jeans, and comfortable sneakers.",
            activity: "Hiking, photography, or a picnic.",
            icon: Tent
        };
    }
    if (c.includes('cloud')) {
        return {
            outfit: "Layered clothing, light jacket.",
            activity: "Museum visit, photography, or a long walk.",
            icon: Shirt
        };
    }
    return {
        outfit: "Comfortable casual wear.",
        activity: "Check out a new movie or restaurant.",
        icon: Shirt
    };
}

export default function WeatherSuggestions({ condition, temp }: WeatherSuggestionsProps) {
    const { outfit, activity, icon: Icon } = getSuggestions(condition, temp);

    return (
        <GlassCard className="h-full">
            <div className="flex items-center space-x-2 mb-4">
                <Icon className="text-white/80" size={24} />
                <h3 className="text-lg font-semibold text-white">Suggestions</h3>
            </div>

            <div className="space-y-4">
                <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Outfit</p>
                    <p className="text-white font-medium">{outfit}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Activity</p>
                    <p className="text-white font-medium">{activity}</p>
                </div>
            </div>
        </GlassCard>
    )
}
