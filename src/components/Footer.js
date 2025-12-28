import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section py-4">
            <div className="container footer-container">
                <div className="footer-copyright">
                    <p className="mb-0 text-secondary small fw-bold" style={{ letterSpacing: '2px' }}>
                        &copy; 2025 ELITE PORTFOLIO. ALL RIGHTS RESERVED.
                    </p>
                </div>

                <div className="social-links-corner">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
