import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Admin.css';

const Sidebar = ({ onLogoutClick }) => {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <h1>Portfolio Admin</h1>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i className="fas fa-th-large"></i> Dashboard
                </NavLink>
                <NavLink to="/admin/projects" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i className="fas fa-project-diagram"></i> Projects
                </NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i className="fas fa-users"></i> Users
                </NavLink>
                <NavLink to="/admin/messages" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i className="fas fa-envelope"></i> Messages
                </NavLink>
                {/* Resume Link - Assuming path or handling download */}
                <button type="button" className="nav-item" onClick={(e) => { e.preventDefault(); alert('Resume management coming soon!'); }}>
                    <i className="fas fa-file-pdf"></i> Resume
                </button>
            </nav>
            <div className="sidebar-footer">
                <button
                    type="button"
                    className="nav-item logout-nav-item"
                    onClick={onLogoutClick}
                    style={{ cursor: 'pointer', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
