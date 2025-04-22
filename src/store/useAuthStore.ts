import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types/database.types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email || '',
          } 
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },
  
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },
  
  checkUser: async () => {
    try {
      set({ loading: true });
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        set({ 
          user: {
            id: data.user.id,
            email: data.user.email || '',
          } 
        });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));