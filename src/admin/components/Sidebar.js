import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Admin.css';

const Sidebar = ({ onLogoutClick }) => {

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '2px', color: '#fff', margin: 0 }}>
                    UBAISE<span style={{ color: 'var(--primary-color)' }}>.</span>
                </h2>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '3px', textTransform: 'uppercase' }}>Admin Console</span>
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
                <NavLink to="/admin/resume" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <i className="fas fa-file-pdf"></i> Resume
                </NavLink>
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
