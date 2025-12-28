import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        project_name: '',
        display_order: 0,
        project_url: '',
        short_description: '',
        description: '',
        technologies: '',
        status: 'Active'
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${BASE_URL}projects.php/get`);
            if (!response.ok) throw new Error('Fetch failed');
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            console.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'featured_image') {
            setFeaturedImage(e.target.files[0]);
        } else {
            setGalleryImages(Array.from(e.target.files));
        }
    };

    const resetForm = () => {
        setFormData({
            project_name: '',
            display_order: 0,
            project_url: '',
            short_description: '',
            description: '',
            technologies: '',
            status: 'Active'
        });
        setFeaturedImage(null);
        setGalleryImages([]);
        setEditId(null);
        const modal = document.getElementById('projectModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (featuredImage) data.append('featured_image', featuredImage);
        galleryImages.forEach(file => data.append('gallery_images[]', file));

        try {
            const url = editId ? `${BASE_URL}projects.php/put/${editId}` : `${BASE_URL}projects.php/post`;
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            if (!response.ok) throw new Error('Save failed');

            fetchProjects();
            resetForm();
        } catch (err) {
            alert('Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            project_name: project.project_name,
            display_order: project.display_order,
            project_url: project.project_url || '',
            short_description: project.short_description || '',
            description: project.description || '',
            technologies: project.technologies || '',
            status: project.status || 'Active'
        });
        setEditId(project.id);
        const modal = new window.bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const response = await fetch(`${BASE_URL}projects.php/delete/${id}`, {
                    method: 'POST'
                });
                if (!response.ok) throw new Error('Delete failed');
                fetchProjects();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Project Management</h2>
                <button
                    className="btn-premium"
                    onClick={() => {
                        setEditId(null);
                        const modal = new window.bootstrap.Modal(document.getElementById('projectModal'));
                        modal.show();
                    }}
                >
                    <span>Add New Project</span>
                </button>
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="project-grid">
                    {projects.map(project => (
                        <div key={project.id} className="admin-card">
                            {project.featured_image && (
                                <img src={`${BASE_URL}${project.featured_image}`} alt={project.project_name} className="card-img" />
                            )}
                            <div className="card-content">
                                <h3>{project.project_name}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{project.short_description}</p>
                                <div className="card-actions">
                                    <button className="btn-admin" onClick={() => handleEdit(project)} title="Edit">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn-admin danger" onClick={() => handleDelete(project.id)} title="Delete">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Project Modal */}
            <div className="modal fade" id="projectModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editId ? 'Edit Project' : 'Add New Project'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-9">
                                        <label className="form-label admin-form-label">Project Name</label>
                                        <input name="project_name" value={formData.project_name} onChange={handleInputChange} className="form-control admin-form-input" required />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label admin-form-label">Display Order</label>
                                        <input type="number" name="display_order" value={formData.display_order} onChange={handleInputChange} className="form-control admin-form-input" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label admin-form-label">Short Description</label>
                                        <input name="short_description" value={formData.short_description} onChange={handleInputChange} className="form-control admin-form-input" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Technologies (Comma separated)</label>
                                        <input name="technologies" value={formData.technologies} onChange={handleInputChange} className="form-control admin-form-input" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Project URL</label>
                                        <input name="project_url" value={formData.project_url} onChange={handleInputChange} className="form-control admin-form-input" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label admin-form-label">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-control admin-form-input" rows="4"></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Featured Image</label>
                                        <input type="file" name="featured_image" onChange={handleFileChange} className="form-control admin-form-input" accept="image/*" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Gallery Images</label>
                                        <input type="file" name="gallery_images" onChange={handleFileChange} className="form-control admin-form-input" accept="image/*" multiple />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Processing...' : (editId ? 'Update Project' : 'Create Project')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
