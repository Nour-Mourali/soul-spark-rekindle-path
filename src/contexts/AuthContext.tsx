
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  walletAddress: string;
  nickname?: string;
  age?: number;
  mentalState?: string;
  hasSeenDoctor?: boolean;
}

interface AuthContextType {
  user: User | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  updateUserProfile: (profile: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    // Mock wallet connection for now - will implement actual WalletConnect later
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    setUser({ walletAddress: mockAddress });
    setIsConnected(true);
    console.log('Mock wallet connected:', mockAddress);
  };

  const disconnect = () => {
    setUser(null);
    setIsConnected(false);
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...profile });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isConnected, connect, disconnect, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
