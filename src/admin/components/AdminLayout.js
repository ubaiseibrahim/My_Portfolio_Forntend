import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../styles/Admin.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('admin_user'));

    useEffect(() => {
        if (!user) {
            navigate('/admin_login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_user');
        navigate('/admin_login');
        // Close modal manually if needed, though navigate usually handles cleanup
        const modal = document.getElementById('logoutModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
    };

    if (!user) return null;

    return (
        <div className="admin-container admin-layout">
            <Sidebar onLogoutClick={() => {
                const modal = new window.bootstrap.Modal(document.getElementById('logoutModal'));
                modal.show();
            }} />
            <main className="admin-main">
                <AdminNavbar user={user} />
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>

            {/* Logout Confirmation Modal */}
            <div className="modal fade" id="logoutModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Logout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to log out of the admin panel?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
