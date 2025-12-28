import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        users: 0,
        messages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Simplified: Fetch counts from their respective endpoints
            const [projRes, userRes, msgRes] = await Promise.all([
                fetch(`${BASE_URL}projects.php/get`),
                fetch(`${BASE_URL}auth.php/get`),
                fetch(`${BASE_URL}contact.php/get`)
            ]);

            const [projData, userData, msgData] = await Promise.all([
                projRes.json(),
                userRes.json(),
                msgRes.json()
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
        { title: 'Total Projects', count: stats.projects, icon: 'fa-project-diagram', color: '#e2c290' },
        { title: 'Active Users', count: stats.users, icon: 'fa-users', color: '#4da6ff' },
        { title: 'New Messages', count: stats.messages, icon: 'fa-envelope', color: '#ff4d4d' }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Dashboard Overview</h2>
            </div>

            {loading ? (
                <p>Loading stats...</p>
            ) : (
                <div className="row g-4 mb-5">
                    {statCards.map((card, index) => (
                        <div key={index} className="col-md-4">
                            <div className="admin-card stats-card p-4 h-100">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="text-secondary mb-1 fw-bold text-uppercase small">{card.title}</p>
                                        <h3 className="mb-0 h2" style={{ color: 'var(--secondary-color)' }}>{card.count}</h3>
                                    </div>
                                    <div className="stats-icon" style={{ background: `${card.color}15`, color: card.color }}>
                                        <i className={`fa-solid ${card.icon}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="row">
                <div className="col-md-12">
                    <div className="admin-card p-5 text-center">
                        <h4 className="mb-3">Welcome to your Admin Portal</h4>
                        <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
                            From here you can manage your portfolio projects, user accounts, and view messages sent from the contact form.
                            Use the sidebar navigation to get started.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
