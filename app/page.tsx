import WeatherDashboard from '@/components/weather-dashboard'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30">
      {/* 
        The ThreeBackground is handled inside WeatherDashboard 
        to maintain reactivity with the weather state.
      */}
      <WeatherDashboard />
    </main>
  )
}
