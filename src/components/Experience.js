import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/Experience.css';

const Experience = () => {
    const [sectionRef, isVisible] = useScrollReveal();

    const journey = [
        {
            id: "01",
            title: "The Foundation",
            role: "Web Core Specialist",
            company: "Self-Driven Mastery",
            period: "Initial Phase",
            desc: "Immersed in the digital architecture, mastering the trio of HTML5, CSS3, and JavaScript. Focused on semantic structures and CSS methodologies for high-performance interfaces.",
            skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            icon: "fa-solid fa-code"
        },
        {
            id: "02",
            title: "Frontend Specialist",
            role: "React.js Developer",
            company: "Project Architecture",
            period: "Mid-Phase Transition",
            desc: "Scaled into the React ecosystem. Engineered components with a focus on reusability, state management, and modern hooks, bridging the gap between design and logic.",
            skills: ["React.js", "Redux", "Hooks", "Component Architecture"],
            icon: "fa-brands fa-react"
        },
        {
            id: "03",
            title: "Full-Stack Expansion",
            role: "Software Integrator",
            company: "Systems & Backend",
            period: "Present Focus",
            desc: "Ventured into industrial-grade backends using .NET and ASP.NET Core. Architecting secure APIs, database modeling with MySQL, and full-stack integration.",
            skills: [".NET", "ASP.NET Core", "MySQL", "API Design"],
            icon: "fa-solid fa-server"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
        visible: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { type: 'spring', damping: 20, stiffness: 100 }
        }
    };

    return (
        <section 
            id="experience" 
            ref={sectionRef} 
            className={`experience-section ${isVisible ? 'reveal-active' : ''}`}
        >
            {/* Background Decorations */}
            <div className="experience-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>

            <div className="container">
                <div className="section-header text-center mb-5">
                    <span className="section-eyebrow">Professional Orbit</span>
                    <h2 className="display-5 fw-bold mb-3">Career <span className="gradient-text">Expansion.</span></h2>
                    <div className="section-line"></div>
                </div>

                <motion.div 
                    className="timeline-modern"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {journey.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="experience-node"
                            variants={itemVariants}
                        >
                            <div className="node-marker">
                                <div className="marker-dot">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="marker-line"></div>
                            </div>

                            <div className="experience-card glass-card">
                                <div className="card-header-flex">
                                    <div className="header-text">
                                        <span className="badge-gold mb-2">Phase {item.id}</span>
                                        <h3 className="h4 fw-bold">{item.title}</h3>
                                        <p className="role-text">{item.role} @ <span className="company-name">{item.company}</span></p>
                                    </div>
                                    <div className="period-tag">{item.period}</div>
                                </div>

                                <div className="card-body mt-3">
                                    <p className="desc-text text-secondary">{item.desc}</p>
                                    <div className="skill-tags mt-4">
                                        {item.skills.map((skill, si) => (
                                            <span key={si} className="skill-pill">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="card-decoration">
                                    <div className="deco-line"></div>
                                    <div className="deco-number">{item.id}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
