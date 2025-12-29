import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { BASE_URL } from '../utils/function';
import './../styles/Contact.css';

const Contact = () => {
    const [sectionRef, isVisible] = useScrollReveal();
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`contact-section ${isVisible ? 'reveal-active' : ''}`}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-card-custom shadow-sm text-center animate-reveal-1">
                            <h2 className="display-6 fw-bold mb-3">Let's <span className="gradient-text">Collaborate</span></h2>
                            <p className="text-secondary mb-5">Ready to start your next big project? Drop a message below!</p>

                            <form className="text-start animate-reveal-2" onSubmit={handleSubmit}>
                                {status.message && (
                                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
                                        {status.message}
                                    </div>
                                )}
                                <div className="row g-3">
                                    <div className="col-md-6 text-start">
                                        <label className="form-label small fw-bold">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control input-custom"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control input-custom"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="col-12 text-start">
                                        <label className="form-label small fw-bold">Your Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="form-control input-custom"
                                            placeholder="How can I help you?"
                                            rows="5"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12 mt-4 text-center">
                                        <button type="submit" className="btn-premium w-100 py-3 mt-2 shadow-lg" disabled={loading}>
                                            <span>{loading ? 'Sending...' : 'Send Message'}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
