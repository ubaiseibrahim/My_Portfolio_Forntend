import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/function';
import './../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${BASE_URL}contact.php/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to send message');
            setStatus({ type: 'success', message: '✓ Message broadcasted successfully. I will reach out shortly.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: '⚠ Broadcasting failed: ' + (error.message || 'Check your signal.') });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact-unique-section">
            <div className="bg-text-watermark">CONTACT</div>
            
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="unique-contact-wrapper"
                        >
                            {/* ── UNIQUE HEADER ── */}
                            <div className="unique-header-area">
                                <motion.div 
                                    initial={{ x: -100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <span className="unique-subtitle">Available for projects</span>
                                    <h2 className="unique-title">Let's build your <br/> next <span>Masterpiece</span>.</h2>
                                </motion.div>
                            </div>

                            {/* ── MODERN MINIMALIST PODS ── */}
                            <form onSubmit={handleSubmit} className="modern-pod-form">
                                {status.message && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9, y: -20 }} 
                                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                                        className={`holographic-feedback ${status.type}`}
                                    >
                                        <div className="feedback-icon">
                                            {status.type === 'success' ? '✓' : '⚠'}
                                        </div>
                                        <div className="feedback-content">
                                            {status.message}
                                        </div>
                                        <button 
                                            type="button" 
                                            className="feedback-close-btn"
                                            onClick={() => setStatus({ type: '', message: '' })}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </motion.div>
                                )}

                                <div className="row g-4">
                                    {[
                                        { name: 'name', label: 'Full Name', type: 'text', col: 'col-md-6' },
                                        { name: 'email', label: 'Email Address', type: 'email', col: 'col-md-6' },
                                        { name: 'message', label: 'Your Project Vision', type: 'textarea', col: 'col-12' }
                                    ].map((field, i) => (
                                        <div key={field.name} className={field.col}>
                                            <motion.div 
                                                className={`contact-pod ${field.type === 'textarea' ? 'message-pod' : ''}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                                whileHover={{ y: -5 }}
                                            >
                                                {field.type === 'textarea' ? (
                                                    <textarea
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                        rows="5"
                                                        required
                                                    ></textarea>
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        placeholder=" "
                                                        required
                                                    />
                                                )}
                                                <label>{field.label}</label>
                                                <div className="pod-accent"></div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>

                                <motion.div 
                                    className="form-footer-unique"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <button 
                                        type="submit" 
                                        className="unique-send-btn" 
                                        disabled={loading}
                                    >
                                        <span>{loading ? 'SENDING...' : 'INITIATE CONTACT'}</span>
                                        <div className="btn-icon">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </button>
                                </motion.div>
                            </form>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
