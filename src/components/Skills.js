import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/Skills.css';

const Skills = () => {
    const [sectionRef, isVisible] = useScrollReveal();
    const skillCategories = [
        {
            id: "01",
            category: "Frontend Technologies",
            skills: ["React.js", "JavaScript (JS)", "HTML", "CSS", "Bootstrap"]
        },
        {
            id: "02",
            category: "Backend Technologies",
            skills: [".NET", "ASP.NET Core", "RESTful API Development"]
        },
        {
            id: "03",
            category: "Database",
            skills: ["MySQL", "Database Design", "Query Optimization"]
        },
        {
            id: "04",
            category: "Tools & Practices",
            skills: ["Git & Version Control", "API Integration", "Debugging", "Performance Optimization"]
        }
    ];

    return (
        <section
            id="skills"
            ref={sectionRef}
            className={`skills-section py-5 ${isVisible ? 'reveal-active' : ''}`}
        >
            <div className="container">
                <div className="section-header text-center mb-5 animate-reveal-1">
                    <h6 className="text-uppercase fw-bold text-primary mb-3 animate-reveal-2" style={{ letterSpacing: '4px' }}>Expertise</h6>
                    <h2 className="animate-reveal-3 display-4 fw-bold">My <span className="gradient-text">Skills</span></h2>
                    <div className="title-divider animate-reveal-3"></div>
                </div>

                <div className="skills-matrix">
                    {skillCategories.map((group, i) => (
                        <div
                            key={i}
                            className="skill-category-box animate-reveal-2"
                            style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                        >
                            <div className="category-header">
                                <span className="category-index">{group.id}</span>
                                <h4 className="category-title">{group.category}</h4>
                            </div>
                            <div className="skill-tags">
                                {group.skills.map((skill, si) => (
                                    <div key={si} className="skill-tag-item">
                                        <span className="skill-bullet"></span>
                                        <span className="skill-name">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
