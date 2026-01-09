import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

const VantaFog = () => {
    const vantaRef = useRef(null);
    const effectRef = useRef(null);

    useEffect(() => {
        const initVanta = () => {
            if (!effectRef.current && vantaRef.current) {
                try {
                    effectRef.current = FOG({
                        el: vantaRef.current,
                        THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        highlightColor: 0xffebeb,
                        midtoneColor: 0xe2c290,
                        lowlightColor: 0xd6d6d6,
                        baseColor: 0xf8fafc,
                        blurFactor: 0.7,
                        zoom: 1,
                        speed: 2.5,
                    });
                } catch (err) {
                    console.error("Vanta Fog initialization failed:", err);
                }
            }
        };

        const timer = setTimeout(initVanta, 150); // Slightly different delay to stagger context creation

        return () => {
            clearTimeout(timer);
            if (effectRef.current) {
                try {
                    effectRef.current.destroy();
                } catch (e) {
                    console.warn("Failed to destroy Vanta Fog effect:", e);
                }
                effectRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={vantaRef}
            id="vanta-bg"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
            }}
        />
    );
};

export default VantaFog;
