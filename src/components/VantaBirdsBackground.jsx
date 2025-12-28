import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";

const VantaBirdsBackground = () => {
    const vantaRef = useRef(null);
    const effectRef = useRef(null);

    useEffect(() => {
        window.THREE = THREE;

        const initVanta = () => {
            if (!effectRef.current && vantaRef.current) {
                try {
                    effectRef.current = BIRDS({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.0,
                        minWidth: 200.0,
                        scale: 1.0,
                        scaleMobile: 1.0,
                        backgroundColor: 0x07192f,
                        backgroundAlpha: 1,
                        color1: 0xff0000,
                        color2: 0x00d1ff,
                        colorMode: "varianceGradient",
                        quantity: 8,
                        birdSize: 1.2,
                        wingSpan: 25,
                        speedLimit: 1.5,
                        separation: 30,
                        alignment: 40,
                        cohesion: 40,
                    });
                } catch (err) {
                    console.error("Vanta initialization failed:", err);
                }
            }
        };

        // Delay initialization to ensure DOM is fully ready and avoid WebGL context collision
        const timer = setTimeout(initVanta, 100);

        const handleScroll = () => {
            if (vantaRef.current) {
                const scrollY = window.scrollY;
                vantaRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        };

        const handleResize = () => {
            if (effectRef.current) {
                effectRef.current.resize();
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            if (effectRef.current) {
                effectRef.current.destroy();
                effectRef.current = null;
            }
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            ref={vantaRef}
            className="vanta-bg"
            style={{
                position: "fixed",
                top: "-10%",
                left: "-10%",
                width: "120%",
                height: "120%",
                zIndex: -1,
                background: "#07192f",
                pointerEvents: "none",
                transition: "opacity 1s ease-in-out"
            }}
        />
    );
};

export default VantaBirdsBackground;
