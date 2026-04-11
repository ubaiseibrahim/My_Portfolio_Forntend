import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';
import ConfirmModal from '../components/ConfirmModal';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
    const [replyModal, setReplyModal] = useState({ show: false, message: null });
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

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

    const handleReplyClick = (msg) => {
        setReplyModal({ show: true, message: msg });
        setReplyText('');
    };

    const confirmReply = async () => {
        if (!replyText.trim()) return;
        setSendingReply(true);
        try {
            const response = await fetch(`${BASE_URL}contact.php/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: replyModal.message.id,
                    email: replyModal.message.email,
                    name: replyModal.message.name,
                    original_message: replyModal.message.message,
                    reply: replyText
                })
            });

            if (!response.ok) throw new Error('Reply failed');
            alert('Reply sent successfully!');
            setReplyModal({ show: false, message: null });
        } catch (err) {
            console.error(err);
            alert('Failed to send reply.');
        } finally {
            setSendingReply(false);
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
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleReplyClick(msg)}
                                        style={{
                                            borderRadius: '50%',
                                            width: '32px',
                                            height: '32px',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: '#e2c290',
                                            border: 'none',
                                            color: '#1a1a1a'
                                        }}
                                        title="Reply to Message"
                                    >
                                        <i className="fa-solid fa-reply" style={{ fontSize: '12px' }}></i>
                                    </button>
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

            {/* Reply Modal */}
            {replyModal.show && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)'
                }}>
                    <div className="modal-content" style={{
                        background: '#1a1a1a', padding: '2.5rem', borderRadius: '24px',
                        width: '90%', maxWidth: '500px', border: '1px solid rgba(226, 194, 144, 0.2)'
                    }}>
                        <h3 style={{ color: '#e2c290', marginBottom: '1rem' }}>Reply to {replyModal.message.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                            Sending to: {replyModal.message.email}
                        </p>
                        
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            style={{
                                width: '100%', height: '150px', background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
                                color: 'white', padding: '1rem', marginBottom: '1.5rem', outline: 'none'
                            }}
                        />

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => setReplyModal({ show: false, message: null })}
                                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                                disabled={sendingReply}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmReply}
                                disabled={sendingReply || !replyText.trim()}
                                style={{
                                    background: '#e2c290', color: '#1a1a1a', border: 'none',
                                    padding: '10px 25px', borderRadius: '40px', fontWeight: '800',
                                    cursor: 'pointer', opacity: (sendingReply || !replyText.trim()) ? 0.5 : 1
                                }}
                            >
                                {sendingReply ? 'Sending...' : 'Send Reply'}
                            </button>
                        </div>
                    </div>
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
