import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { BASE_URL } from '../utils/function';
import './../styles/Projects.css';



const ProjectCard = ({ project, index }) => {
    const [activeImage, setActiveImage] = useState(project.featured_image);

    const getImgSrc = (img) =>
        img && img.startsWith('http') ? img : `${BASE_URL}${img}`;

    const projectIndex = (index + 1).toString().padStart(2, '0');

    return (
        <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            scale={1.01}
            transitionSpeed={2500}
            perspective={1500}
            className="h-100"
        >
            <div className="project-card-premium">
                {/* ── BACKGROUND INDEX ── */}
                <div className="project-index-bg">{projectIndex}</div>

                {/* ── IMAGE SECTION ── */}
                <div className="project-visual">
                    <div className="main-frame">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                src={getImgSrc(activeImage)}
                                alt={project.project_name}
                                className="main-img"
                            />
                        </AnimatePresence>
                        <div className="frame-overlay"></div>
                    </div>

                    {/* ── FLOATING GALLERY ── */}
                    {project.gallery_images && project.gallery_images.length > 0 && (
                        <div className="project-light-table">
                            <div
                                className={`light-thumb ${activeImage === project.featured_image ? 'active' : ''}`}
                                onClick={() => setActiveImage(project.featured_image)}
                            >
                                <img src={getImgSrc(project.featured_image)} alt="ref" />
                            </div>
                            {project.gallery_images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`light-thumb ${activeImage === img ? 'active' : ''}`}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img src={getImgSrc(img)} alt="ref" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── CONTENT SECTION ── */}
                <div className="project-details-overlay">
                    <div className="details-header">
                        <span className="project-category">Case Study</span>
                        <h4 className="project-title">{project.project_name}</h4>
                    </div>

                    <p className="project-summary">{project.short_description}</p>

                    <div className="details-footer">
                        {/* Tags */}
                        <div className="project-mini-tags">
                            {project.technologies && project.technologies.split(',').slice(0, 3).map((t, j) => (
                                <span key={j} className="mini-tag">{t.trim()}</span>
                            ))}
                        </div>

                        {/* CTA */}
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-action-btn"
                            >
                                <span>Discover <i className="fa-solid fa-arrow-right-long ms-2"></i></span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Tilt>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${BASE_URL}projects.php/get/active`);
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    if (loading) return (
        <div className="projects-loading">
            <div className="loading-spinner"></div>
            <span style={{ fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Loading Projects
            </span>
        </div>
    );

    if (error) return (
        <div className="text-center py-5 text-danger" style={{ fontSize: '0.9rem' }}>
            ⚠ {error}
        </div>
    );

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div className="text-center mb-5" variants={itemVariants}>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--primary-hover)',
                            marginBottom: '1rem'
                        }}>
                            Selected Work
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 800, letterSpacing: '-0.04em',
                            color: 'var(--secondary-color)', lineHeight: 1.1, marginBottom: '1rem'
                        }}>
                            My <span className="gradient-text">Projects</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '0.95rem' }}>
                            A curated selection of work focused on high-quality development and elite professional standards.
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="row g-4">
                        {projects.map((p, i) => (
                            <motion.div key={p.id || i} className="col-md-6 col-lg-6 mb-4" variants={itemVariants}>
                                <ProjectCard project={p} index={i} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
