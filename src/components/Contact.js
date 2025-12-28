import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './../styles/Contact.css';

const Contact = () => {
    const [sectionRef, isVisible] = useScrollReveal();

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
                            <form className="text-start animate-reveal-2" onSubmit={(e) => e.preventDefault()}>
                                <div className="row g-3">
                                    <div className="col-md-6 text-start">
                                        <label className="form-label small fw-bold">Your Name</label>
                                        <input type="text" className="form-control input-custom" placeholder="John Doe" required />
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label className="form-label small fw-bold">Email Address</label>
                                        <input type="email" className="form-control input-custom" placeholder="john@example.com" required />
                                    </div>
                                    <div className="col-12 text-start">
                                        <label className="form-label small fw-bold">Your Message</label>
                                        <textarea className="form-control input-custom" placeholder="How can I help you?" rows="5" required></textarea>
                                    </div>
                                    <div className="col-12 mt-4 text-center">
                                        <button type="submit" className="btn-premium w-100 py-3 mt-2 shadow-lg"><span>Send Message</span></button>
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
