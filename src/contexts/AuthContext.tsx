import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/insforge';
import type { User, AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  profile: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, nickname: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        setUser(response.data.user);
        setProfile(response.data.profile);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.signIn(email, password);
      if (response.data) {
        setUser(response.data.user);
        // Get profile after sign in
        const profileResponse = await authService.getCurrentUser();
        if (profileResponse.data) {
          setProfile(profileResponse.data.profile);
        }
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error as string };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, nickname: string) => {
    setIsLoading(true);
    try {
      const response = await authService.signUp(email, password);
      if (response.data) {
        setUser(response.data.user);
        // Set initial profile
        const profileResponse = await authService.setProfile({ nickname });
        if (profileResponse.data) {
          setProfile(profileResponse.data);
        }
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error as string };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const response = await authService.setProfile(updates);
      if (response.data) {
        setProfile(response.data);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};