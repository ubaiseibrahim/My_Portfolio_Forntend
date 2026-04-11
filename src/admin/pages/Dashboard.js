import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/function';

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, users: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            const [projRes, userRes, msgRes] = await Promise.all([
                fetch(`${BASE_URL}projects.php/get`),
                fetch(`${BASE_URL}auth.php/get`),
                fetch(`${BASE_URL}contact.php/get`)
            ]);
            const [projData, userData, msgData] = await Promise.all([
                projRes.json(), userRes.json(), msgRes.json()
            ]);
            setStats({
                projects: projData.length || 0,
                users: userData.length || 0,
                messages: msgData.length || 0
            });
        } catch (err) {
            console.error('Failed to fetch dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Projects', count: stats.projects, icon: 'fa-layer-group',     color: '#e2c290', label: 'PORTFOLIO_ITEMS' },
        { title: 'Active Users',   count: stats.users,    icon: 'fa-user-shield',     color: '#4da6ff', label: 'SYSTEM_USERS'   },
        { title: 'New Messages',   count: stats.messages, icon: 'fa-satellite-dish',  color: '#a78bfa', label: 'BROADCASTS_IN'  }
    ];

    const user = JSON.parse(localStorage.getItem('admin_user') || '{}');

    return (
        <div className="admin-page dashboard-page">

            {/* ── COMMAND HEADER ── */}
            <div className="dashboard-command-header">
                <div className="dashboard-greeting">
                    <span className="dashboard-sys-tag">SYS // PORTFOLIO_OS v4.2</span>
                    <h2 className="dashboard-title">Mission Control</h2>
                    <p className="dashboard-subtitle">
                        Welcome back, <strong>{user.username || 'Admin'}</strong>. All systems are operational.
                    </p>
                </div>
                <div className="dashboard-status-chip">
                    <span className="dash-status-dot"></span>
                    <span>ALL SYSTEMS NOMINAL</span>
                </div>
            </div>

            {/* ── STATS GRID ── */}
            {loading ? (
                <div className="dashboard-loading">
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>FETCHING TELEMETRY...</span>
                </div>
            ) : (
                <div className="row g-4 mb-5">
                    {statCards.map((card, index) => (
                        <div key={index} className="col-md-4">
                            <div className="dash-stat-card">
                                <div className="dash-stat-top">
                                    <div
                                        className="dash-stat-icon"
                                        style={{
                                            background: `${card.color}20`,
                                            color: card.color,
                                            boxShadow: `0 0 20px ${card.color}30`
                                        }}
                                    >
                                        <i className={`fa-solid ${card.icon}`}></i>
                                    </div>
                                    <span className="dash-stat-label" style={{ color: card.color }}>
                                        {card.label}
                                    </span>
                                </div>
                                <div className="dash-stat-count">{card.count}</div>
                                <div className="dash-stat-title">{card.title}</div>
                                <div
                                    className="dash-stat-bar"
                                    style={{ background: `linear-gradient(90deg, ${card.color}80, transparent)` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── WELCOME PANEL ── */}
            <div className="dash-welcome-panel">
                <div className="dash-welcome-orb">
                    <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div className="dash-welcome-text">
                    <h4>Admin Command Center</h4>
                    <p>
                        Manage your portfolio projects, user accounts, and incoming transmissions from
                        the contact station. Use the sidebar navigation to access each module.
                    </p>
                </div>
                <div className="dash-welcome-links">
                    <Link to="/admin/projects" className="dash-quick-link">
                        <i className="fa-solid fa-layer-group"></i> Projects
                    </Link>
                    <Link to="/admin/messages" className="dash-quick-link">
                        <i className="fa-solid fa-envelope"></i> Messages
                    </Link>
                </div>
            </div>

        </div>
    );
};


export default Dashboard;
