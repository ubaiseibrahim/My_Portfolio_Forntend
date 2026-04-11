import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './../styles/Skills.css';

const Skills = () => {
    const [activeTab, setActiveTab] = useState(0);

    const skillCategories = [
        {
            id: "MODULE_01",
            category: "Frontend Stack",
            icon: "fa-brands fa-react",
            skills: [
                { name: "React.js", level: "95%", status: "Expert", icon: "fa-brands fa-react" },
                { name: "JavaScript", level: "90%", status: "Expert", icon: "fa-brands fa-js" },
                { name: "HTML5/CSS3", level: "92%", status: "Expert", icon: "fa-brands fa-html5" },
                { name: "Framer Motion", level: "85%", status: "Advanced", icon: "fa-solid fa-wand-magic-sparkles" },
                { name: "Bootstrap 5", level: "88%", status: "Advanced", icon: "fa-brands fa-bootstrap" }
            ]
        },
        {
            id: "MODULE_02",
            category: "Backend Core",
            icon: "fa-solid fa-server",
            skills: [
                { name: ".NET Framework", level: "85%", status: "Advanced", icon: "fa-brands fa-microsoft" },
                { name: "ASP.NET Core", level: "90%", status: "Expert", icon: "fa-solid fa-code" },
                { name: "RESTful APIs", level: "92%", status: "Expert", icon: "fa-solid fa-network-wired" },
                { name: "C# Language", level: "88%", status: "Advanced", icon: "fa-solid fa-terminal" }
            ]
        },
        {
            id: "MODULE_03",
            category: "Database Tech",
            icon: "fa-solid fa-database",
            skills: [
                { name: "MySQL", level: "90%", status: "Expert", icon: "fa-solid fa-database" },
                { name: "SQL Server", level: "82%", status: "Professional", icon: "fa-solid fa-server" },
                { name: "Entity Framework", level: "85%", status: "Advanced", icon: "fa-solid fa-layer-group" },
                { name: "DB Optimization", level: "80%", status: "Professional", icon: "fa-solid fa-gauge-high" }
            ]
        },
        {
            id: "MODULE_04",
            category: "Control Systems",
            icon: "fa-solid fa-cubes",
            skills: [
                { name: "Git Version", level: "94%", status: "Expert", icon: "fa-brands fa-git-alt" },
                { name: "Clean Architecture", level: "90%", status: "Expert", icon: "fa-solid fa-shield-halved" },
                { name: "Agile Workflow", level: "88%", status: "Advanced", icon: "fa-solid fa-users-gear" },
                { name: "System Design", level: "85%", status: "Advanced", icon: "fa-solid fa-sitemap" }
            ]
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="container">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-5"
                >
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        color: 'var(--primary-hover)',
                        fontWeight: 700
                    }}>Technical DNA</span>
                    <h2 className="section-title-xl mt-2">Proficiency <span className="gradient-text">Matrix.</span></h2>
                </motion.div>

                <div className="skills-dashboard">
                    {/* Control Panel (Sidebar) */}
                    <div className="skills-nav">
                        {skillCategories.map((group, index) => (
                            <button
                                key={index}
                                className={`skill-nav-btn ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <div className="nav-icon-box">
                                    <i className={group.icon}></i>
                                </div>
                                <div className="nav-label-box">
                                    <span className="label-id">{group.id}</span>
                                    <span className="label-cat">{group.category}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Skill Monitor (Display) */}
                    <div className="skills-monitor">
                        <div className="monitor-scanline"></div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <div className="monitor-header">
                                    <div className="monitor-title">
                                        <h3>{skillCategories[activeTab].category}</h3>
                                    </div>
                                    <div className="monitor-id">NODE_{skillCategories[activeTab].id}</div>
                                </div>

                                <div className="skill-grid">
                                    {skillCategories[activeTab].skills.map((skill, si) => (
                                        <motion.div
                                            key={si}
                                            className="modern-skill-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: si * 0.1 }}
                                        >
                                            <div className="card-top">
                                                <div className="skill-icon-glow">
                                                    <i className={skill.icon}></i>
                                                </div>
                                                <div className="skill-meta">
                                                    <h4>{skill.name}</h4>
                                                    <span>{skill.status}</span>
                                                </div>
                                            </div>
                                            <div className="bar-track">
                                                <motion.div
                                                    className="bar-fill"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: skill.level }}
                                                    transition={{ duration: 1.2, ease: "circOut", delay: 0.4 }}
                                                />
                                            </div>
                                            <span className="percentage-text">{skill.level}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Skills;
