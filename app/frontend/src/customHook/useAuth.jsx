import { createContext, useState, useContext, useEffect } from 'react';

// Create a context
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('user'); // default role is 'user'
  
  // Check if user is already logged in from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(userData.username);
      setUserRole(userData.role || 'user');
    }
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername(userData.username);
    setUserRole(userData.role || 'user');
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('user');
  };  // Debug effect to watch for role changes
  useEffect(() => {
    console.log('Auth Context - userRole changed:', userRole);
  }, [userRole]);
  
  // Create the value object
  const value = {
    isLoggedIn,
    username,
    userRole,
    login,
    logout,
    isAdmin: userRole === 'admin'
  };

  // Return the provider with the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
