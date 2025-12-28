import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/function';
import VantaBirdsBackground from '../../components/VantaBirdsBackground';
import '../styles/Admin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            <VantaBirdsBackground />
            <div className="login-card">
                <div className="login-header">
                    <h2>Admin Portal</h2>
                    <p>Enter your credentials to access the dashboard</p>
                </div>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-premium"
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={loading}
                    >
                        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
