import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/function';
import './../styles/Navbar.css';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        fetchResume();

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            // Progress bar
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(total > 0 ? (scrollY / total) * 100 : 0);

            // Active section detection
            const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && scrollY >= el.offsetTop - 150) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchResume = async () => {
        try {
            const response = await fetch(`${BASE_URL}resume.php/get`);
            if (response.ok) {
                const data = await response.json();
                if (data && (data.url || data.file_path)) {
                    const url = data.url || data.file_path;
                    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
                    setResumeUrl(fullUrl);
                }
            }
        } catch (err) {
            console.error('Failed to fetch resume', err);
        }
    };

    const toggleSidebar = () => setIsSidebarOpen(p => !p);
    const closeSidebar = () => setIsSidebarOpen(false);

    const navLinks = [
        { name: 'Home', icon: 'fa-solid fa-house', href: '#home', id: 'home' },
        { name: 'About', icon: 'fa-regular fa-user', href: '#about', id: 'about' },
        { name: 'Skills', icon: 'fa-solid fa-bolt', href: '#skills', id: 'skills' },
        { name: 'History', icon: 'fa-solid fa-clock-rotate-left', href: '#experience', id: 'experience' },
        { name: 'Work', icon: 'fa-solid fa-layer-group', href: '#projects', id: 'projects' },
        { name: 'Contact', icon: 'fa-regular fa-paper-plane', href: '#contact', id: 'contact' },
    ];

    return (
        <>
            {/* Scroll Progress Bar at very top */}
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

            <motion.nav 
                className={`navbar-floating ${scrolled ? 'nav-scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="nav-floating-container">
                    
                    {/* Brand */}
                    <a className="nav-brand-modern" href="/">
                        <div className="brand-icon">U</div>
                        <span className="brand-text" style={{ color: 'var(--secondary-color)' }}>UBAISE IBRAHIM</span>
                    </a>

                    {/* Desktop Links with Framer Motion Active Pill */}
                    <div className="nav-desktop">
                        <ul className="nav-links-wrapper">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <li key={link.name} className="nav-item-modern">
                                        <a href={link.href} className={`nav-link-modern ${isActive ? 'active' : ''}`}>
                                            <i className={`${link.icon} nav-link-icon`}></i>
                                            <span className="nav-link-label">{link.name}</span>
                                            
                                            {/* Dynamic Active Indicator */}
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="nav-pill"
                                                    className="nav-active-pill"
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Right Side CTA & Mobile Toggle */}
                    <div className="nav-actions">
                        <motion.a 
                            href={resumeUrl || '#'} 
                            className="btn-premium d-none d-lg-flex"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: '8px 20px', fontSize: '0.8rem', borderRadius: '100px' }}
                            download target="_blank" rel="noopener noreferrer"
                        >
                            <span>Resume <i className="fa-solid fa-download ms-2"></i></span>
                        </motion.a>

                        <button
                            className={`mobile-toggle-btn ${isSidebarOpen ? 'active' : ''} d-lg-none`}
                            onClick={toggleSidebar}
                            aria-label="Toggle navigation"
                        >
                            <div className="hamburger-modern">
                                <span className="m-line line-1" style={{ background: 'var(--secondary-color)' }}></span>
                                <span className="m-line line-2" style={{ background: 'var(--secondary-color)' }}></span>
                                <span className="m-line line-3" style={{ background: 'var(--secondary-color)' }}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Sidebar Overlay */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar} />

            {/* Mobile Sidebar */}
            <div className={`custom-sidebar-modern ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header-modern">
                    <a className="nav-brand-modern" href="/" onClick={closeSidebar}>
                        <div className="brand-icon">U</div>
                        <span className="brand-text" style={{ color: 'var(--secondary-color)' }}>UBAISE IBRAHIM</span>
                    </a>
                    <button className="btn-close-modern" onClick={closeSidebar}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="sidebar-nav-modern">
                    {navLinks.map((link, i) => (
                        <motion.a 
                            key={link.name}
                            href={link.href} 
                            className={`sidebar-link-modern ${activeSection === link.id ? 'active' : ''}`}
                            onClick={closeSidebar}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <i className={`${link.icon} sidebar-icon`}></i>
                            <span>{link.name}</span>
                        </motion.a>
                    ))}
                </div>

                <div className="sidebar-footer-modern">
                    <a href={resumeUrl || '#'} className="btn-premium w-100" onClick={closeSidebar} download target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-file-pdf pe-2"></i> Download Resume
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;