import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import './../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const footerNav = [
        { id: '01', name: 'Home', href: '#home' },
        { id: '02', name: 'About', href: '#about' },
        { id: '03', name: 'Capabilities', href: '#skills' },
        { id: '04', name: 'Showcase', href: '#projects' },
        { id: '05', name: 'Broadcast', href: '#contact' },
    ];
    
    return (
        <footer className="footer-premium-section">
            <div className="footer-watermark">UBAISE&nbsp;IBRAHIM</div>

            <div className="container footer-content-wrapper">
                <div className="row align-items-end g-5">
                    
                    <div className="col-lg-4">
                        <div className="footer-brand-area">
                            <h2 className="footer-logo">UBAISE&nbsp;IBRAHIM<span>.</span></h2>
                            <p className="footer-tagline">
                                Designing and building high-performance <br/> digital ecosystems from the ground up.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="footer-nav-central">
                            <ul className="footer-links-grid">
                                {footerNav.map(item => (
                                    <li key={item.id}>
                                        <a href={item.href} className="styled-footer-link">
                                            <span className="link-num">{item.id}</span>
                                            <span className="link-text">{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 text-lg-end">
                        <div className="footer-connect-stack">
                            <span className="connect-label">Establish Connection</span>
                            <div className="footer-social-hubs">
                                <a href="https://github.com/UbaiseIbrahim" target="_blank" rel="noreferrer" className="social-hub-link">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href="https://www.linkedin.com/in/ubaiseibrahim-89b594314/" target="_blank" rel="noreferrer" className="social-hub-link">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                                <a href="https://www.instagram.com/ubaise_ibrahim/" target="_blank" rel="noreferrer" className="social-hub-link">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom-bar">
                    <div className="footer-legal">
                        &copy;&nbsp;{currentYear}&nbsp;UBAISE&nbsp;IBRAHIM.&nbsp;ALL&nbsp;RIGHTS&nbsp;RESERVED
                    </div>
                </div>
            </div>
        </footer>
    );
};



export default Footer;

