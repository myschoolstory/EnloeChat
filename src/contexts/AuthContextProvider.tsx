import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthUser } from '../types';
import { AuthContext } from './AuthContext';
import {
  checkAuthState,
  signIn,
  signUp,
  signOut,
  updateProfile
} from './AuthContextUtils';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    const initializeAuth = async () => {
      const authState = await checkAuthState();
      if (authState) {
        setUser(authState.user);
        setProfile(authState.profile);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await signIn(email, password);
    if (result.user && result.profile) {
      setUser(result.user);
      setProfile(result.profile);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: result.error };
    }
  };

  const handleSignUp = async (email: string, password: string, nickname: string) => {
    setIsLoading(true);
    const result = await signUp(email, password, nickname);
    if (result.user && result.profile) {
      setUser(result.user);
      setProfile(result.profile);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: result.error };
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const result = await updateProfile(user, updates);
    if (result.profile) {
      setProfile(result.profile);
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateProfile: handleUpdateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
