import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { BASE_URL } from '../utils/function';
import './../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
    const [activeImage, setActiveImage] = useState(project.featured_image);

    return (
        <div className="col-md-4 animate-reveal-2" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <div className="project-card-custom shadow-sm border-0 d-flex flex-column" style={{ background: '#fcfdfe', height: '100%' }}>
                <div className="p-4 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h4 className="fw-bold mb-0">{project.project_name}</h4>
                        {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                </svg>
                            </a>
                        )}
                    </div>

                    {activeImage && (
                        <div className="mb-3 rounded overflow-hidden" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                            <img
                                src={activeImage.startsWith('http') ? activeImage : `${BASE_URL}${activeImage}`}
                                alt={project.project_name}
                                className="w-100 h-100 object-fit-contain transition-img"
                                style={{ transition: 'opacity 0.3s ease-in-out' }}
                            />
                        </div>
                    )}

                    <p className="text-secondary mb-3 flex-grow-1" style={{
                        fontSize: '0.95rem',
                        overflow: 'hidden'
                    }}>{project.short_description}</p>

                    {project.gallery_images && project.gallery_images.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <div
                                className={`rounded overflow-hidden cursor-pointer`}
                                style={{ width: '50px', height: '50px', cursor: 'pointer', border: activeImage === project.featured_image ? '2px solid var(--primary-color)' : 'none' }}
                                onClick={() => setActiveImage(project.featured_image)}
                            >
                                <img
                                    src={project.featured_image.startsWith('http') ? project.featured_image : `${BASE_URL}${project.featured_image}`}
                                    alt="Featured"
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>

                            {project.gallery_images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`rounded overflow-hidden cursor-pointer`}
                                    style={{ width: '50px', height: '50px', cursor: 'pointer', border: activeImage === img ? '2px solid var(--primary-color)' : 'none' }}
                                    onClick={() => setActiveImage(img)}
                                >
                                    <img
                                        src={img.startsWith('http') ? img : `${BASE_URL}${img}`}
                                        alt={`Gallery ${idx}`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="d-flex flex-wrap mt-auto">
                        {(() => {
                            if (!project.technologies) return null;
                            const tags = project.technologies.split(',').map(t => t.trim());
                            // Heuristic: If first 4 tags total length is short (< 30 chars), show 4, else 3
                            const showCount = tags.slice(0, 4).join('').length < 30 ? 4 : 3;
                            return tags.slice(0, showCount).map((t, j) => (
                                <span key={j} className="project-tag-custom">{t}</span>
                            ));
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [sectionRef, isVisible] = useScrollReveal();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${BASE_URL}projects.php/get/active`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
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

    if (loading) return <div className="text-center py-5">Loading projects...</div>;
    if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

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
                        <ProjectCard key={p.id || i} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
