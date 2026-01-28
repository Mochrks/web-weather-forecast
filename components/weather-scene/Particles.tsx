"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleSystemProps {
    count?: number
    type?: 'rain' | 'snow'
}

export function ParticleSystem({ count = 1000, type = 'rain' }: ParticleSystemProps) {
    const points = useRef<THREE.Points>(null)

    // Generate random positions
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50 // x
            positions[i * 3 + 1] = Math.random() * 40 - 20 // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10 // z
        }
        return positions
    }, [count])

    // Velocities
    const speeds = useMemo(() => {
        return new Float32Array(count).map(() => Math.random() * 0.5 + 0.5)
    }, [count])


    useFrame((_, delta) => {
        if (points.current) {
            const positions = points.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < count; i++) {
                // Move down
                const speed = type === 'rain' ? 20 : 2
                positions[i * 3 + 1] -= speed * speeds[i] * delta

                // Reset when below ground
                if (positions[i * 3 + 1] < -20) {
                    positions[i * 3 + 1] = 20
                    positions[i * 3] = (Math.random() - 0.5) * 50 // Reset X randomly
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10 // Reset Z randomly
                }
            }
            points.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={type === 'rain' ? 0.2 : 0.8}
                color={type === 'rain' ? "#88ccff" : "#ffffff"}
                transparent
                opacity={type === 'rain' ? 0.6 : 0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    )
}
