import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import VantaFog from './VantaFog';
import './../styles/Hero.css';

const Hero = () => {
    const titleText = "Creative Software Developer";
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [sectionRef, isVisible] = useScrollReveal();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 40; // Parallax range
            const y = (clientY / innerHeight - 0.5) * 40;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            id="home"
            ref={sectionRef}
            className={`hero-section ${isVisible ? 'reveal-active' : ''}`}
            style={{
                '--mouse-x': `${mousePos.x}px`,
                '--mouse-y': `${mousePos.y}px`
            }}>
            <VantaFog />
            <div className="container-fluid position-relative px-4">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <h6 className="luxury-tag animate-reveal-1">Full Stack Specialist</h6>
                        <h1 className="hero-title">
                            {titleText.split(" ").map((word, wordIndex, wordsArray) => {
                                // Calculate the starting character index for this word
                                const previousCharsCount = wordsArray
                                    .slice(0, wordIndex)
                                    .join(" ").length + (wordIndex > 0 ? 1 : 0);

                                return (
                                    <span key={wordIndex} className="word-wrapper" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                        {word.split("").map((char, charIndex) => {
                                            const globalIndex = previousCharsCount + charIndex;
                                            const isExcellence = globalIndex >= "Creative ".length;
                                            return (
                                                <span
                                                    key={globalIndex}
                                                    className={`char-reveal ${isExcellence ? 'gradient-text' : ''}`}
                                                    style={{ '--char-index': globalIndex }}
                                                >
                                                    {char}
                                                </span>
                                            );
                                        })}
                                        {wordIndex < wordsArray.length - 1 && (
                                            <span className="char-reveal" style={{ '--char-index': previousCharsCount + word.length }}>
                                                &nbsp;
                                            </span>
                                        )}
                                    </span>
                                );
                            })}
                        </h1>
                    <p className="hero-subtitle mx-auto animate-reveal-3">
                        Building reliable, efficient, and maintainable software solutions.
                        Where technical precision meets modern user-centric design.
                    </p>
                    <div className="d-flex justify-content-center gap-4 flex-wrap mt-5 animate-reveal-4">
                        <a href="#projects" className="btn-premium"><span>View Portfolio</span></a>
                        <a href="#contact" className="btn-premium btn-premium-outline"><span>Contact Me</span></a>
                    </div>
                </div>
            </div>
        </div>
        </section >
    );
};

export default Hero;
