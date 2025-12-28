import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/About.css';

const About = () => {
    const [sectionRef, isVisible] = useScrollReveal();

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`about-section py-5 ${isVisible ? 'reveal-active' : ''}`}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="about-glass-card glass-card p-5 text-center animate-reveal-1">
                            <h6 className="luxury-tag mb-4 animate-reveal-2">About Me</h6>
                            <h2 className="display-5 fw-bold mb-5 animate-reveal-3">Building the <span className="gradient-text">Future</span></h2>
                            <div className="about-bio text-secondary text-start mx-auto animate-reveal-4" style={{ maxWidth: '850px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                                <p className="mb-4">
                                    I am <strong>Ubaise Ibrahim</strong>, a passionate and dedicated Software Developer with experience in building modern, scalable, and user-friendly web applications. I have a strong interest in both frontend and backend development, focusing on delivering reliable, efficient, and maintainable software solutions.
                                </p>
                                <p className="mb-4">
                                    I began my journey in software development by mastering the core fundamentals of <strong>HTML, CSS, and JavaScript</strong>, which helped me understand how web applications are structured, styled, and made interactive. These technologies enabled me to design responsive layouts and create visually appealing user interfaces.
                                </p>
                                <p className="mb-4">
                                    As my skills advanced, I specialized in frontend development using <strong>React.js</strong>. Through React, I've gained extensive experience in component-based architecture, state management, reusable UI components, and performance optimization for large-scale applications.
                                </p>
                                <p className="mb-4">
                                    To grow as a full-stack developer, I expanded my expertise into backend development using <strong>.NET and ASP.NET Core</strong>. I work on developing secure APIs, implementing business logic, and integrating robust backend services with modern frontend applications.
                                </p>
                                <p className="mb-4">
                                    I also have hands-on experience with <strong>MySQL</strong>, enabling me to design databases, write optimized queries, and manage data efficiently across applications.
                                </p>
                                <p className="mb-0">
                                    I continuously improve my skills through real-time project work and self-learning, adopting the latest industry best practices. I value clean code, scalability, and collaboration, and I aim to contribute impactful solutions to growing organizations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
