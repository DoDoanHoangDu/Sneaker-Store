import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import './LoginHeader.css';

function LoginHeader({ onLoginClick, isLoggedIn, username, userRole }) {
    const source_login_logo = "/login.png";    const source_user_logo = "/group-icon.png";
    const source_admin_logo = "/group-icon.png"; // You might want a different icon for admin
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { logout } = useAuth();
    // Use case-insensitive comparison for role checking
    const isAdmin = userRole?.toLowerCase() === 'admin';
    
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClick = () => {
        if (isLoggedIn) {
            setShowDropdown(!showDropdown);
        } else {
            onLoginClick();
        }
    };
    
    const handleLogout = (e) => {
        e.stopPropagation();
        logout();
        setShowDropdown(false);
    };
      const navigate = useNavigate();
      const handleProfile = (e) => {
        e.stopPropagation();
        // Navigate to profile page using React Router
        navigate('/about');
        setShowDropdown(false);
    };
    
    const handleAdminNav = (e) => {
        e.stopPropagation();
        // Navigate to admin dashboard
        navigate('/admin');
        setShowDropdown(false);
    };
    
    return (
        <div className="login-header-container" ref={dropdownRef}>            <div className="login-header" onClick={handleClick}>                <img 
                    className="login-logo" 
                    src={isLoggedIn ? (isAdmin ? source_admin_logo : source_user_logo) : source_login_logo} 
                    alt={isLoggedIn ? (isAdmin ? "Admin" : "Account") : "Login"} 
                />                {isLoggedIn ? (
                    <span className="login-block-text username-text">
                        <span>{username}</span>
                        {isAdmin && <span style={{ marginLeft: '5px', color: 'red', fontSize: '0.7rem' }}>(Admin)</span>}
                    </span>
                ) : (
                    <span className="login-block-text">
                        <span>Đăng</span> <br />
                        <span>nhập</span>
                    </span>
                )}
            </div>            {isLoggedIn && showDropdown && (
                <div className="login-dropdown">
                    {isAdmin && (
                        <>
                            <div className="dropdown-item admin-role-indicator">
                                Admin User
                            </div>                            <div className="dropdown-item admin-dropdown-item" onClick={handleAdminNav}>
                                Quản lý hệ thống
                            </div>
                        </>
                    )}
                    <div className="dropdown-item" onClick={handleProfile}>
                        Xem hồ sơ
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginHeader;