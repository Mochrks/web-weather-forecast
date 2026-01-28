"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"

export function Sun() {
    const group = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (group.current) {
            // Gentle float
            group.current.position.y = 8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
            group.current.rotation.z += 0.001
        }
    })

    return (
        <group ref={group} position={[10, 8, -20]}>
            {/* Core Sun */}
            <Sphere args={[4, 32, 32]}>
                <meshBasicMaterial color="#ffdd00" transparent opacity={0.9} />
            </Sphere>

            {/* Glow Halo */}
            <Sphere args={[6, 32, 32]}>
                <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} side={THREE.BackSide} />
            </Sphere>
            {/* Ambient Light for scene */}
            <pointLight intensity={2} color="#ffaa00" distance={100} decay={2} />
        </group>
    )
}
