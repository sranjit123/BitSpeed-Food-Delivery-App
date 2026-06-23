import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (email) => {
    setUser({ email, name: email.split('@')[0] });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      isLoginModalOpen,
      setIsLoginModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};
