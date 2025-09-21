import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'farmer' | 'distributor' | 'retailer';

export interface UserProfile {
  principal: string;
  role: Role;
  name: string;
  phone: string;
  origin?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (phone: string, role: Role) => Promise<boolean>;
  register: (role: Role, name: string, phone: string, origin: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock authentication - replace with actual Motoko backend calls
  const login = async (phone: string, role: Role): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage (mock database)
    const storedUsers = JSON.parse(localStorage.getItem('agriTrace_users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.phone === phone && u.role === role);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('agriTrace_currentUser', JSON.stringify(existingUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (role: Role, name: string, phone: string, origin: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('agriTrace_users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.phone === phone);
    
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: UserProfile = {
      principal: `principal_${Date.now()}`,
      role,
      name,
      phone,
      origin: role === 'farmer' ? origin : undefined,
    };
    
    // Save to localStorage (mock database)
    storedUsers.push(newUser);
    localStorage.setItem('agriTrace_users', JSON.stringify(storedUsers));
    localStorage.setItem('agriTrace_currentUser', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriTrace_currentUser');
  };

  // Load user on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('agriTrace_currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};