import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';
import ConfirmModal from '../components/ConfirmModal';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

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

    const handleDeleteClick = (id) => {
        setDeleteModal({ show: true, id });
    };

    const confirmDelete = async () => {
        const id = deleteModal.id;
        try {
            const response = await fetch(`${BASE_URL}contact.php/delete/${id}`, {
                method: 'POST'
            });

            if (!response.ok) throw new Error('Delete failed');

            // Optimistically remove from state
            setMessages(prev => prev.filter(msg => msg.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeleteModal({ show: false, id: null });
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
                            <div key={msg.id} className="admin-card" style={{ padding: '1.5rem', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--primary-color)', margin: '0' }}>{msg.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-color)', margin: '0' }}>{msg.email}</p>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)' }}>
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    {msg.message}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteClick(msg.id)}
                                        style={{
                                            borderRadius: '50%',
                                            width: '32px',
                                            height: '32px',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Delete Message"
                                    >
                                        <i className="fa-solid fa-trash" style={{ fontSize: '12px' }}></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <ConfirmModal
                show={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, id: null })}
                onConfirm={confirmDelete}
                title="Delete Message"
                body="Are you sure you want to delete this message? This action cannot be undone."
            />
        </div>
    );
};

export default Messages;
