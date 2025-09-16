import { authService } from '../services/insforge';
import type { User, AuthUser } from '../types';

export const checkAuthState = async () => {
  try {
    const response = await authService.getCurrentUser();
    if (response.data) {
      return {
        user: response.data.user,
        profile: response.data.profile
      };
    }
    return null;
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await authService.signIn(email, password);
    if (response.data) {
      // Get profile after sign in
      const profileResponse = await authService.getCurrentUser();
      if (profileResponse.data) {
        return {
          user: response.data.user,
          profile: profileResponse.data.profile
        };
      }
    }
    return { error: response.error };
  } catch (error) {
    return { error: error as string };
  }
};

export const signUp = async (email: string, password: string, nickname: string) => {
  try {
    const response = await authService.signUp(email, password);
    if (response.data) {
      // Set initial profile
      const profileResponse = await authService.setProfile({ nickname });
      if (profileResponse.data) {
        return {
          user: response.data.user,
          profile: profileResponse.data
        };
      }
    }
    return { error: response.error };
  } catch (error) {
    return { error: error as string };
  }
};

export const signOut = async () => {
  try {
    await authService.signOut();
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

export const updateProfile = async (user: AuthUser | null, updates: Partial<User>) => {
  if (!user) return { error: 'Not authenticated' };

  try {
    const response = await authService.setProfile(updates);
    if (response.data) {
      return { profile: response.data };
    } else {
      return { error: response.error };
    }
  } catch (error) {
    return { error: error as string };
  }
};