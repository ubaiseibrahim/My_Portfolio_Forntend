import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import VantaFog from './VantaFog';
import './../styles/Hero.css';

const Hero = () => {
    const titleText = "Full Stack Developer";
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 30;
            const y = (clientY / innerHeight - 0.5) * 30;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1, 
            transition: { type: 'spring', stiffness: 100, damping: 20 }
        }
    };

    const charVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', stiffness: 200, damping: 10 }
        }
    };

    return (
        <section
            id="home"
            className="hero-section text-start"
            style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` }}
        >
            <VantaFog />

            <div className="container position-relative px-4" style={{ zIndex: 10 }}>
                <motion.div 
                    className="row align-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── LEFT COLUMN: Text Content ── */}
                    <div className="col-lg-6 pe-lg-5 mb-5 mb-lg-0">
                        
                        {/* Availability Tag */}
                        <motion.div variants={itemVariants} className="hero-tag">
                            <span className="pulse-dot"></span>
                            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--secondary-color)' }}>
                                OPEN FOR INNOVATION
                            </span>
                        </motion.div>

                        {/* Animated Title */}
                        <motion.h1 className="hero-title-main" variants={itemVariants}>
                            {titleText.split(" ").map((word, wordIndex, wordsArray) => {
                                const previousCharsCount = wordsArray
                                    .slice(0, wordIndex)
                                    .join(" ").length + (wordIndex > 0 ? 1 : 0);

                                return (
                                    <span key={wordIndex} className="word-wrapper" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                        {word.split("").map((char, charIndex) => {
                                            const globalIndex = previousCharsCount + charIndex;
                                            const isGold = globalIndex >= "Full Stack ".length;
                                            return (
                                                <motion.span
                                                    key={globalIndex}
                                                    variants={charVariants}
                                                    style={{ display: 'inline-block' }}
                                                    className={isGold ? 'gradient-text' : ''}
                                                >
                                                    {char}
                                                </motion.span>
                                            );
                                        })}
                                        {wordIndex < wordsArray.length - 1 && <span>&nbsp;</span>}
                                    </span>
                                );
                            })}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p className="hero-subtitle-main" variants={itemVariants}>
                            I build exceptional digital experiences. Combining deep technical expertise across React.js and .NET with a sharp eye for modern UI/UX to create products that perform seamlessly.
                        </motion.p>

                        {/* CTA */}
                        <motion.div className="d-flex gap-3 flex-wrap" variants={itemVariants}>
                            <motion.a 
                                href="#projects" 
                                className="btn-premium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span><i className="fa-solid fa-briefcase pe-2"></i> View Work</span>
                            </motion.a>
                            <motion.a 
                                href="https://github.com/UbaiseIbrahim" 
                                target="_blank"
                                rel="noreferrer"
                                className="btn-premium btn-premium-outline"
                                style={{ width: 'auto', padding: '0 24px' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span><i className="fa-brands fa-github fs-5"></i></span>
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN: Interactive Bento Grid ── */}
                    <div className="col-lg-6 ps-lg-4">
                        <div className="bento-grid">
                            
                            {/* Card 1: Experience */}
                            <motion.div variants={itemVariants}>
                                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} gyroscope={true} className="h-100">
                                    <div className="bento-card h-100">
                                        <div className="bento-icon-wrapper">
                                            <i className="fa-solid fa-bolt"></i>
                                        </div>
                                        <div className="bento-stat">3+</div>
                                        <div className="bento-label">Years of<br/>Experience</div>
                                    </div>
                                </Tilt>
                            </motion.div>

                            {/* Card 2: Satisfaction */}
                            <motion.div variants={itemVariants}>
                                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} gyroscope={true} className="h-100">
                                    <div className="bento-card h-100">
                                        <div className="bento-icon-wrapper" style={{ background: 'var(--secondary-color)', boxShadow: '0 8px 20px rgba(10, 25, 47, 0.2)' }}>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div className="bento-stat">100%</div>
                                        <div className="bento-label">Client<br/>Satisfaction</div>
                                    </div>
                                </Tilt>
                            </motion.div>

                            {/* Card 3: Stack Focus (Wide Card) */}
                            <motion.div variants={itemVariants} className="bento-card-large">
                                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} gyroscope={true} className="w-100">
                                    <div className="bento-card bento-card-large">
                                        <div>
                                            <div className="bento-stat" style={{ fontSize: '1.8rem', color: 'var(--primary-hover)' }}>React & .NET</div>
                                            <div className="bento-label">Core Tech Stack</div>
                                        </div>
                                        <div className="d-flex gap-3 mt-4 mt-md-0">
                                            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#61DAFB' }}>
                                                <i className="fa-brands fa-react"></i>
                                            </div>
                                            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#512BD4' }}>
                                                <i className="fa-brands fa-microsoft"></i>
                                            </div>
                                            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#4479A1' }}>
                                                <i className="fa-solid fa-database"></i>
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                            
                        </div>
                    </div>
                    
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
