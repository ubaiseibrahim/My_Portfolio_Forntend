import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/function';
import './../styles/Navbar.css';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const response = await fetch(`${BASE_URL}resume.php/get`);
            if (response.ok) {
                const data = await response.json();
                console.log("Resume Data:", data);
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'History', href: '#experience' },
        { name: 'Work', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
                <div className="container-fluid px-lg-5">
                    <a className="navbar-brand navbar-brand-custom" href="/">UBAISE IBRAHIM <span className="text-primary">.</span></a>

                    {/* Toggle Button for Mobile */}
                    <button
                        className={`navbar-toggler border-0 ${isSidebarOpen ? 'active' : ''}`}
                        type="button"
                        onClick={toggleSidebar}
                        aria-label="Toggle navigation"
                    >
                        <div className="hamburger-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {navLinks.map((link) => (
                                <li key={link.name} className="nav-item">
                                    <a className="nav-link nav-link-custom mx-lg-1" href={link.href}>{link.name}</a>
                                </li>
                            ))}
                            <li className="nav-item ms-lg-3">
                                {resumeUrl ? (
                                    <a href={resumeUrl} className="btn-premium" download target="_blank" rel="noopener noreferrer">
                                        <span>Resume</span>
                                    </a>
                                ) : (
                                    <button className="btn-premium" disabled><span>No Resume</span></button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Custom Sidebar for Mobile */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
            <div className={`custom-sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <a className="navbar-brand navbar-brand-custom" href="/" onClick={closeSidebar}>UBAISE IBRAHIM <span className="text-primary">.</span></a>
                    <button className="btn-close-sidebar" onClick={closeSidebar}>&times;</button>
                </div>
                <ul className="sidebar-nav">
                    {navLinks.map((link) => (
                        <li key={link.name} className="sidebar-item">
                            <a className="sidebar-link" href={link.href} onClick={closeSidebar}>{link.name}</a>
                        </li>
                    ))}
                    <li className="sidebar-item mt-4">
                        {resumeUrl ? (
                            <a href={resumeUrl} className="btn-premium w-100" onClick={closeSidebar} download target="_blank" rel="noopener noreferrer">
                                <span>Resume</span>
                            </a>
                        ) : (
                            <button className="btn-premium w-100" disabled><span>No Resume</span></button>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;