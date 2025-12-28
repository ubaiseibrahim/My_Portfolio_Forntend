import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/Experience.css';

const Experience = () => {
    const [sectionRef, isVisible] = useScrollReveal();
    const journey = [
        {
            title: "The Foundation",
            stage: "Web Core Fundamentals",
            company: "Self-Driven Mastery",
            desc: "I started by mastering HTML and CSS to build structured and responsive web pages, then progressed to JavaScript to create dynamic and interactive user experiences."
        },
        {
            title: "Frontend Specialization",
            stage: "React.js Ecosystem",
            company: "Project Architecture",
            desc: "I focused on React.js, learning component-driven development, state handling, and scalable frontend architecture."
        },
        {
            title: "Full-Stack Expansion",
            stage: "Backend & Systems",
            company: "Full Stack Growth",
            desc: "I complemented my frontend skills with .NET and ASP.NET Core, gaining experience in backend API development, authentication, and database connectivity with MySQL."
        }
    ];

    return (
        <section
            id="experience"
            ref={sectionRef}
            className={`experience-section py-5 ${isVisible ? 'reveal-active' : ''}`}
        >
            <div className="container">
                <div className="section-header text-center mb-5 animate-reveal-1">
                    <h6 className="text-uppercase fw-bold text-primary mb-3 animate-reveal-2" style={{ letterSpacing: '3px' }}>My Journey</h6>
                    <h2 className="animate-reveal-3">Professional <span className="gradient-text">Milestones</span></h2>
                    <div className="divider mx-auto animate-reveal-3"></div>
                </div>
                <div className="timeline pt-5">
                    {journey.map((item, i) => (
                        <div key={i} className={`timeline-item animate-reveal-2 ${i % 2 === 0 ? 'left' : 'right'}`} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                            <div className="timeline-content p-4 shadow-sm">
                                <h6 className="fw-bold text-primary mb-1">{item.stage}</h6>
                                <h4 className="fw-bold mb-1" style={{ fontSize: '1.2rem' }}>{item.title}</h4>
                                <p className="text-muted small mb-3 fw-bold">{item.company}</p>
                                <p className="text-secondary small mb-0" style={{ lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
