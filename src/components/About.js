import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './../styles/About.css';

const About = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const scanTimerRef = useRef(null);

    const handleMouseEnter = () => {
        if (isVerified) return;
        setIsScanning(true);
        
        scanTimerRef.current = setTimeout(() => {
            setIsScanning(false);
            setIsVerified(true);
        }, 2200);
    };

    const handleMouseLeave = () => {
        if (isVerified) return;
        if (scanTimerRef.current) {
            clearTimeout(scanTimerRef.current);
        }
        setIsScanning(false);
    };

    return (
        <section id="about" className="about-section">
            <div className="container px-4">
                <div className="row align-items-center">
                    
                    {/* ── LEFT: INTERACTIVE ID BADGE ── */}
                    <div className="col-lg-5 mb-5 mb-lg-0 d-flex justify-content-center">
                        <div className="dev-badge-wrapper">
                            <AnimatePresence mode="wait">
                                {!isVerified ? (
                                    <motion.div 
                                        key="auth-mode"
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                        className="auth-portal"
                                    >
                                        <div className="auth-header">
                                            <div className="status-indicator">
                                                <div className={`status-dot ${isScanning ? 'active' : ''}`}></div>
                                                <span>{isScanning ? 'SCANNING_ID...' : 'SYSTEM_LOCKED'}</span>
                                            </div>
                                            <div className="access-label">RESTRICTED</div>
                                        </div>

                                        <div className="auth-body">
                                            <div 
                                                className={`fingerprint-scanner ${isScanning ? 'scanning' : ''}`}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                onMouseDown={handleMouseEnter}
                                                onMouseUp={handleMouseLeave}
                                            >
                                                <div className="scanner-grid"></div>
                                                <div className="scanner-rings">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                <i className="fa-solid fa-fingerprint"></i>
                                                {isScanning && <div className="scanner-line"></div>}
                                                <div className="scanner-glow"></div>
                                            </div>
                                            <div className="auth-instruction">
                                                {isScanning ? (
                                                    <span className="scanning-text">VERIFYING BIOMETRICS...</span>
                                                ) : (
                                                    <span>PLACE FINGERPRINT TO UNLOCK</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="auth-footer">
                                            <div className="code-cipher">XP-772-NODE-01</div>
                                            <div className="secure-icon"><i className="fa-solid fa-shield-halved"></i></div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="card-mode"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                        className="dev-badge verified-mode"
                                    >
                                        <div className="badge-header">
                                            <div className="badge-logo">
                                                <i className="fa-solid fa-microchip"></i> IDENTITY_CORE
                                            </div>
                                            <div className="badge-tag verified">VERIFIED_ACCESS</div>
                                        </div>

                                        <div className="badge-identity">
                                            <div className="badge-avatar">
                                                <img 
                                                    src="/images/IMG20260209113109.jpg.jpeg" 
                                                    alt="Ubaise Ibrahim" 
                                                    className="avatar-img" 
                                                />
                                            </div>
                                            <div className="badge-info">
                                                <h3 className="badge-name">Ubaise <br/>Ibrahim</h3>
                                                <div className="badge-role">Full Stack Developer</div>
                                            </div>
                                        </div>

                                        <div className="badge-specs">
                                            <div className="spec-item">
                                                <div className="spec-label"><i className="fa-solid fa-layer-group me-1"></i> Stack</div>
                                                <div className="spec-value">React / .NET</div>
                                            </div>
                                            <div className="spec-item">
                                                <div className="spec-label"><i className="fa-solid fa-bolt me-1"></i> Level</div>
                                                <div className="spec-value">Expert</div>
                                            </div>
                                            <div className="spec-item">
                                                <div className="spec-label"><i className="fa-solid fa-fingerprint me-1"></i> Protocol</div>
                                                <div className="spec-value">UI-8942</div>
                                            </div>
                                            <div className="spec-item">
                                                <div className="spec-label"><i className="fa-solid fa-code-branch me-1"></i> Phase</div>
                                                <div className="spec-value">Development</div>
                                            </div>
                                        </div>

                                        <div className="badge-footer">
                                            <div className="barcode-container">
                                                <div className="barcode"></div>
                                                <div className="barcode-number">AUTHENTICATED-UI-8942</div>
                                            </div>
                                            <button className="reset-auth" onClick={() => setIsVerified(false)}>
                                                <i className="fa-solid fa-lock"></i>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ── RIGHT: NARRATIVE ── */}
                    <div className="col-lg-7 ps-lg-5">
                        <motion.div
                            initial={{ opacity: 1 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="narrative-content">
                                <span className="section-eyebrow">Professional Protocol</span>
                                <h2 className="about-title-main">
                                    Architecting <span className="about-text-glow">Digital</span> <br /> Logic.
                                </h2>

                                <div className="about-bio-modern">
                                    <p>
                                        I am <strong>Ubaise Ibrahim</strong>, a Software Developer singularly focused on forging robust, scalable, and beautifully designed web architectures. I specialize in the demanding space where highly performant backend systems satisfy flawless frontend interfaces.
                                    </p>
                                    <p>
                                        My frontend philosophy is driven by <strong>React.js</strong>, manipulating its component-based DNA to build applications that don't just work, but feel instantly responsive to the user.
                                    </p>
                                    <p>
                                        To power these experiences, my backend architecture is strictly enforced by <strong>.NET and ASP.NET Core</strong>. I thrive on architecting bulletproof APIs, weaving complex business logic, and deploying secure databases that refuse to buckle under pressure.
                                    </p>
                                    <p className="mb-0">
                                        I am relentlessly refining my stack. Clean code, high scalability, and an obsession with detail are not just preferences—they are my protocol.
                                    </p>
                                </div>

                                <div className="philosophy-grid">
                                    <div className="philosophy-grid-item">
                                        <div className="phi-icon"><i className="fa-solid fa-microchip"></i></div>
                                        <div className="phi-text">
                                            <h4>System Architecture</h4>
                                            <p>Scalable Database Design & .NET APIs</p>
                                        </div>
                                    </div>
                                    <div className="philosophy-grid-item">
                                        <div className="phi-icon"><i className="fa-solid fa-code"></i></div>
                                        <div className="phi-text">
                                            <h4>Frontend Mastery</h4>
                                            <p>Reactive, High-Performance React UI</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="about-cta-footer">
                                    <a href="#projects" className="btn-premium">
                                        <span>Initiate Protocol <i className="fa-solid fa-arrow-right ms-2"></i></span>
                                    </a>
                                    <div className="connection-status">
                                        <div className="pulse-ring"></div>
                                        <span>SYSTEM_ONLINE</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
