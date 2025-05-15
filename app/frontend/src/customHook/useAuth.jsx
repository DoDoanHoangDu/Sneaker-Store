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
    // Case-insensitive admin check for UI purposes
    isAdmin: userRole?.toLowerCase() === 'admin'
  };

  // Return the provider with the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Get the stored user data
  const storedUser = localStorage.getItem('user');
  let userData = null;
  let token = null;
  
  if (storedUser) {
    try {
      userData = JSON.parse(storedUser);
      token = userData.access_token;
      
      // Log token details for debugging
      if (token) {
        console.log('Token available:', token.substring(0, 10) + '...');
      } else {
        console.warn('No token found in stored user data');
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
  }
    // Added refreshToken method to handle token refresh
  const refreshToken = async () => {
    try {
      if (!userData || !userData.username) {
        console.error('No user data available to refresh token');
        return false;
      }
      
      // Try to get a fresh token by forcing a re-login
      console.log('Attempting to refresh token for user:', userData.username);
      
      // If we have the password in local storage for development purposes
      // In production, you would use a refresh token or prompt for re-login
      if (userData.originalPassword) {
        try {
          // Attempt to get a new token by logging in again
          const response = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: userData.username,
              password: userData.originalPassword
            })
          });
          
          if (response.ok) {
            const newTokenData = await response.json();
            
            // Update the token in localStorage
            const updatedUserData = {
              ...userData,
              access_token: newTokenData.access_token
            };
            
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            console.log('Token refreshed successfully');
            
            // Force page reload to get the new token
            window.location.reload();
            return true;
          } else {
            console.error('Failed to refresh token:', response.status);
          }
        } catch (error) {
          console.error('Error during token refresh:', error);
        }
      } else {
        console.log('No credentials available for automatic refresh');
      }
      
      // Could not refresh automatically - show a message to the user
      const needsRelogin = window.confirm(
        'Your session has expired. Would you like to log in again?'
      );
      
      if (needsRelogin) {
        // Force logout and redirect to login page
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };
  
  // Add token and isAdmin accessor to the context values
  return {
    ...context,
    token,
    userData,
    refreshToken,
    // Ensure consistent case-insensitive admin check
    isAdmin: (context.userRole?.toLowerCase() === 'admin') || 
             (userData?.role?.toLowerCase() === 'admin')
  };
};
