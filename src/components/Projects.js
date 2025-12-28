import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/Projects.css';

const Projects = () => {
    const [sectionRef, isVisible] = useScrollReveal();
    const projects = [
        { title: "Enterprise Dashboard", desc: "A sophisticated analytics platform for large-scale data visualization and reporting.", tags: ["React", "Analytics", "Enterprise"] },
        { title: "Financial Ecosystem", desc: "Secure, high-performance financial management system with real-time updates.", tags: ["Fintech", "Security", "Scale"] },
        { title: "Cloud Infrastructure", desc: "Robust cloud-native architecture designed for high availability and performance.", tags: ["AWS", "DevOps", "Reliability"] },
    ];

    return (
        <section
            id="projects"
            ref={sectionRef}
            className={`projects-section ${isVisible ? 'reveal-active' : ''}`}
        >
            <div className="container">
                <div className="text-center mb-5 animate-reveal-1">
                    <h2 className="display-5 fw-bold mb-4">My <span className="gradient-text">Projects</span></h2>
                    <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>Exhibiting a selection of projects focused on high-quality engineering and elite professional standards.</p>
                </div>
                <div className="row g-4 pt-4">
                    {projects.map((p, i) => (
                        <div key={i} className="col-md-4 animate-reveal-2" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                            <div className="project-card-custom shadow-sm border-0" style={{ background: '#fcfdfe' }}>
                                <h4 className="fw-bold mb-3">{p.title}</h4>
                                <p className="text-secondary mb-4" style={{ fontSize: '0.95rem' }}>{p.desc}</p>
                                <div className="d-flex flex-wrap mb-4">
                                    {p.tags.map((t, j) => <span key={j} className="project-tag-custom">{t}</span>)}
                                </div>
                                <a href="#view" className="btn-premium py-2 px-4 w-100" style={{ fontSize: '0.9rem' }}><span>View Detail</span></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
