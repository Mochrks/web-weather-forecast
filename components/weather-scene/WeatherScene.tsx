"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import { ParticleSystem } from "./Particles"
import { CloudSystem } from "./Clouds"
import { Sun } from "./Sun"

interface WeatherSceneProps {
    condition: string
}

const SceneContent = ({ condition }: WeatherSceneProps) => {
    const c = condition.toLowerCase()

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
            <ambientLight intensity={0.5} />

            {(c.includes('rain') || c.includes('drizzle')) && (
                <>
                    <ParticleSystem type="rain" count={2000} />
                    <CloudSystem />
                    <Environment preset="night" />
                </>
            )}

            {(c.includes('snow')) && (
                <>
                    <ParticleSystem type="snow" count={1000} />
                    <CloudSystem />
                    <Environment preset="snow" />
                </>
            )}

            {(c.includes('cloud') || c.includes('mist')) && (
                <>
                    <CloudSystem />
                    <Environment preset="city" />
                </>
            )}

            {(c.includes('clear') || c.includes('sunny')) && (
                <>
                    <Sun />
                    <Environment preset="sunset" />
                </>
            )}

            {(c.includes('thunder')) && (
                <>
                    <ParticleSystem type="rain" count={3000} />
                    <CloudSystem />
                    {/* Flashing light logic would go here */}
                    <pointLight intensity={2} color="#5555ff" position={[0, 10, 0]} />
                    <Environment preset="night" />
                </>
            )}
        </>
    )
}

export function WeatherScene({ condition }: WeatherSceneProps) {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <SceneContent condition={condition} />
                </Suspense>
            </Canvas>
        </div>
    )
}
