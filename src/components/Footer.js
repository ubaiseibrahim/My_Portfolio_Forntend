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
                        &copy; {new Date().getFullYear()} UBAISE IBRAHIM. ALL RIGHTS RESERVED.
                    </p>
                </div>

                <div className="social-links-corner">
                    <a href="https://www.linkedin.com/in/ubaiseibrahim-89b594314/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="https://www.instagram.com/ubaise_ibrahim/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
