import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BASE_URL } from '../../utils/function';
import '../styles/Admin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch(`${BASE_URL}auth.php/login`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            if (data.user) {
                localStorage.setItem('admin_user', JSON.stringify(data.user));
                navigate('/admin');
            } else {
                setError(data.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container login-page">
            <div className="animated-bg"></div>
            
            <motion.div 
                className="login-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            >
                <div className="login-header">
                    <div className="login-logo-orb">
                        <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <h2>Secure Access</h2>
                    <p>Authorization required to access the gateway</p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="login-error"
                    >
                        <i className="fa-solid fa-triangle-exclamation me-2"></i>
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="login-form-premium">
                    <div className="premium-input-group">
                        <label>Admin Identity</label>
                        <div className="input-with-icon">
                            <i className="fa-solid fa-user-shield"></i>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="premium-input-group">
                        <label>Access Protocol</label>
                        <div className="input-with-icon">
                            <i className="fa-solid fa-key"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={loading}
                    >
                        <span>{loading ? 'AUTHENTICATING...' : 'ESTABLISH SESSION'}</span>
                        {!loading && <i className="fa-solid fa-arrow-right-to-bracket ms-2"></i>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;

