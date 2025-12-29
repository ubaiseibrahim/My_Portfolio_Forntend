import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';

const Resume = () => {
    const [resume, setResume] = useState(null); // String URL
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const response = await fetch(`${BASE_URL}resume.php/get`);
            if (response.ok) {
                const data = await response.json();
                const resumeUrl = data.url || data.file_path; // Support both keys
                if (resumeUrl) {
                    setResume(resumeUrl);
                }
            }
        } catch (err) {
            console.error('Failed to fetch resume');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setUploadStatus({ type: '', message: '' });
        } else {
            setUploadStatus({ type: 'error', message: 'Please select a valid PDF file.' });
            e.target.value = null;
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setSubmitting(true);
        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            const response = await fetch(`${BASE_URL}resume.php/post`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            await response.json();
            // Refresh the resume to ensure we get the correct path/url from server logic
            fetchResume();
            setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' });
            setSelectedFile(null);

            // Reset file input
            const fileInput = document.getElementById('resume-upload');
            if (fileInput) fileInput.value = '';

        } catch (err) {
            setUploadStatus({ type: 'error', message: 'Failed to upload resume. Please try again.' });
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Resume Management</h2>
            </div>

            <div className="row g-4">
                {/* Current Resume Card */}
                <div className="col-md-5">
                    <div className="admin-card h-100">
                        <div className="card-content d-flex flex-column align-items-center justify-content-center text-center p-5">
                            <h3 className="mb-4">Current Resume</h3>

                            {loading ? (
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : resume ? (
                                <div className="w-100">
                                    <div className="mb-4 p-4 rounded-4" style={{ background: 'rgba(226, 194, 144, 0.1)', border: '2px dashed var(--primary-color)' }}>
                                        <i className="fas fa-file-pdf fa-4x mb-3" style={{ color: '#e2c290' }}></i>
                                        <p className="mb-0 text-break fw-bold" style={{ color: 'var(--secondary-color)' }}>
                                            {resume.split('/').pop()}
                                        </p>
                                    </div>
                                    <a
                                        href={resume.startsWith('http') ? resume : `${BASE_URL}${resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2"
                                    >
                                        <i className="fas fa-external-link-alt"></i>
                                        View Resume
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center text-muted py-5">
                                    <i className="fas fa-file-excel fa-3x mb-3 opacity-25"></i>
                                    <p>No resume uploaded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="col-md-7">
                    <div className="admin-card h-100">
                        <div className="card-content p-4">
                            <h3 className="mb-1">Update Resume</h3>
                            <p className="text-secondary mb-4 small">Upload a new PDF file to replace the current one. Max file size: 5MB.</p>

                            <form onSubmit={handleUpload}>
                                <div className="mb-4">
                                    <label className="form-label admin-form-label" htmlFor="resume-upload">Select PDF File</label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            id="resume-upload"
                                            className="form-control admin-form-input"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            style={{ height: 'auto', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                </div>

                                {uploadStatus.message && (
                                    <div className={`alert alert-${uploadStatus.type === 'error' ? 'danger' : 'success'} d-flex align-items-center gap-2 mb-4`} role="alert">
                                        <i className={`fas fa-${uploadStatus.type === 'error' ? 'exclamation-circle' : 'check-circle'}`}></i>
                                        <div>{uploadStatus.message}</div>
                                    </div>
                                )}

                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-premium px-4"
                                        disabled={!selectedFile || submitting}
                                    >
                                        {submitting ? (
                                            <span><i className="fas fa-spinner fa-spin me-2"></i> Processing...</span>
                                        ) : (
                                            <span><i className="fas fa-cloud-upload-alt me-2"></i> Upload New Resume</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
