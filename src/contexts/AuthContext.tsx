
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: 'google' | 'firebase';
}

interface AuthContextType {
  user: User | null;
  login: (provider: 'google' | 'firebase') => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth state
    const checkAuthState = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const login = async (provider: 'google' | 'firebase') => {
    setLoading(true);
    
    // Simulate Firebase authentication
    const mockUser: User = {
      uid: `${provider}_${Date.now()}`,
      email: provider === 'google' ? 'user@gmail.com' : 'user@example.com',
      displayName: provider === 'google' ? 'Google User' : 'Firebase User',
      photoURL: provider === 'google' ? 'https://via.placeholder.com/150?text=G' : 'https://via.placeholder.com/150?text=F',
      provider
    };

    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('user');
      setLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
