import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';
import ConfirmModal from '../components/ConfirmModal';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}auth.php/get`);
            if (!response.ok) throw new Error('Fetch failed');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const resetForm = () => {
        setFormData({
            full_name: '',
            username: '',
            email: '',
            password: ''
        });
        setProfilePicture(null);
        setEditId(null);
        const modal = document.getElementById('userModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'password' && editId && !formData[key]) return; // Skip empty password on edit
            data.append(key, formData[key]);
        });
        if (profilePicture) data.append('profile_picture', profilePicture);

        try {
            const url = editId ? `${BASE_URL}auth.php/put/${editId}` : `${BASE_URL}auth.php/post`;
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });
            if (!response.ok) throw new Error('Action failed');

            fetchUsers();
            resetForm();
        } catch (err) {
            console.error('Operation failed', err);
            // Optionally add an error toast here
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (user) => {
        setFormData({
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            password: '' // Keep password empty for security
        });
        setEditId(user.id);
        const modal = new window.bootstrap.Modal(document.getElementById('userModal'));
        modal.show();
    };

    const handleDeleteClick = (id) => {
        setDeleteModal({ show: true, id });
    };

    const confirmDelete = async () => {
        const id = deleteModal.id;
        try {
            const response = await fetch(`${BASE_URL}auth.php/delete/${id}`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Delete failed');
            fetchUsers();
        } catch (err) {
            console.error('Delete failed', err);
        } finally {
            setDeleteModal({ show: false, id: null });
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>User Management</h2>
                <button
                    className="btn-premium"
                    onClick={() => {
                        setEditId(null);
                        const modal = new window.bootstrap.Modal(document.getElementById('userModal'));
                        modal.show();
                    }}
                >
                    <span>Create New User</span>
                </button>
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="admin-card" style={{ padding: '0' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Created</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {user.profile_picture ? (
                                            <img src={`${BASE_URL}${user.profile_picture}`} alt="" className="admin-user-avatar" />
                                        ) : (
                                            <div className="admin-user-avatar" style={{ background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                                                {user.full_name.charAt(0)}
                                            </div>
                                        )}
                                        {user.full_name}
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn-admin" onClick={() => handleEdit(user)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className="btn-admin danger" onClick={() => handleDeleteClick(user.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmModal
                show={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, id: null })}
                onConfirm={confirmDelete}
                title="Delete User"
                body="Are you sure you want to delete this user? This action cannot be undone."
            />

            {/* User Modal */}
            <div className="modal fade" id="userModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editId ? 'Edit User' : 'Create New User'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Full Name</label>
                                        <input name="full_name" value={formData.full_name} onChange={handleInputChange} className="form-control admin-form-input" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Username</label>
                                        <input name="username" value={formData.username} onChange={handleInputChange} className="form-control admin-form-input" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control admin-form-input" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label admin-form-label">Password {editId && '(Leave blank to keep current)'}</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control admin-form-input" required={!editId} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label admin-form-label">Profile Picture</label>
                                        <input type="file" onChange={handleFileChange} className="form-control admin-form-input" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Processing...' : (editId ? 'Update User' : 'Create User')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
