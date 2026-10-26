import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/function';

const AdminNavbar = ({ user, onLogoutClick }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [user?.profile_picture]);

    const getAvatarSrc = () => {
        if (!user || !user.profile_picture) return null;
        const pic = user.profile_picture;
        if (pic.startsWith('http')) return pic;
        if (pic.includes('1766917178_unnamed.jpg') || pic.includes('unnamed.jpg')) {
            return 'https://res.cloudinary.com/f3rgwbai/image/upload/v1793011257/portfolio/profiles/fzdzrpamkhf6dk7mjgu9.jpg';
        }
        return `${BASE_URL}${pic}`;
    };

    const avatarUrl = getAvatarSrc();
    const initials = user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U';

    return (
        <nav className="admin-navbar">
            <div className="admin-user-info">
                <span className="admin-user-name">Welcome, {user?.full_name}</span>
                {avatarUrl && !hasError ? (
                    <img
                        src={avatarUrl}
                        alt={user?.full_name || 'Admin'}
                        className="admin-user-avatar"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="admin-user-avatar" style={{ background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {initials}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;
