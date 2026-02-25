"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef(null);

    useEffect(() => {
        function update(time: number) {
            // @ts-expect-error: lenis instance type is not properly inferred
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // --- GSAP ScrollTrigger: Reveal animations ---
        // We find all elements and mark them for reveal
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');

        elements.forEach((el) => {
            // Add js-reveal class to handle initial state in JS-capable environments
            el.classList.add('js-reveal');

            ScrollTrigger.create({
                trigger: el,
                start: 'top 92%',
                onEnter: () => el.classList.add('is-visible'),
                onEnterBack: () => el.classList.add('is-visible'),
                // We keep it visible once entered for better stability on heavy dashboards
            });
        });

        // Stagger Reveal
        const staggerContainers = document.querySelectorAll('.stagger-reveal');
        staggerContainers.forEach((el) => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                onEnter: () => el.classList.add('is-active'),
            });
        });

        // Force a refresh after a small delay to catch Next.js dynamic hydration
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => {
            gsap.ticker.remove(update);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            clearTimeout(timer);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    );
}
