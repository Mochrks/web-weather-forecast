"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cloud, Clouds } from "@react-three/drei"
import * as THREE from "three"

export function CloudSystem() {
    const group = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (group.current) {
            // Slow drift
            group.current.rotation.y += delta * 0.02
        }
    })

    return (
        <group ref={group} position={[0, 5, -10]}>
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud segments={20} bounds={[10, 2, 2]} volume={10} color="white" fade={10} opacity={0.3} speed={0.1} />
                <Cloud seed={1} scale={2} volume={5} color="#d4d4d4" fade={10} position={[0, -2, 0]} opacity={0.2} speed={0.1} />
            </Clouds>
        </group>
    )
}
