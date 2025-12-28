import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${BASE_URL}contact.php/get`);
            if (!response.ok) throw new Error('Fetch failed');
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            console.error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Contact Messages</h2>
            </div>

            {loading ? (
                <p>Loading messages...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {messages.length === 0 ? (
                        <p style={{ color: 'var(--accent-color)' }}>No messages found.</p>
                    ) : (
                        messages.map(msg => (
                            <div key={msg.id} className="admin-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--primary-color)', margin: '0' }}>{msg.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-color)', margin: '0' }}>{msg.email}</p>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)' }}>
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
