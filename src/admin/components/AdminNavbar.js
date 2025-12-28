import React from 'react';
import { BASE_URL } from '../../utils/function';

const AdminNavbar = ({ user, onLogoutClick }) => {
    return (
        <nav className="admin-navbar">
            <div className="admin-user-info">
                <span className="admin-user-name">Welcome, {user.full_name}</span>
                {user.profile_picture ? (
                    <img
                        src={`${BASE_URL}${user.profile_picture}`}
                        alt={user.full_name}
                        className="admin-user-avatar"
                    />
                ) : (
                    <div className="admin-user-avatar" style={{ background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {user.full_name.charAt(0)}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;
