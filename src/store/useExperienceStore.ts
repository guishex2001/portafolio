import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Experience } from '../types/database.types';

interface ExperienceState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  fetchExperiences: () => Promise<void>;
  addExperience: (experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateExperience: (id: number, experience: Partial<Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteExperience: (id: number) => Promise<void>;
}

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  experiences: [],
  loading: false,
  error: null,
  
  fetchExperiences: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      
      const experiences = data.map(exp => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        startDate: exp.start_date,
        endDate: exp.end_date,
        description: exp.description,
        createdAt: exp.created_at,
        updatedAt: exp.updated_at
      }));
      
      set({ experiences, loading: false });
    } catch (error) {
      console.error('Error fetching experiences:', error);
      set({ error: 'Failed to fetch experiences', loading: false });
    }
  },
  
  addExperience: async (experience) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('experiences')
        .insert([{
          company: experience.company,
          position: experience.position,
          start_date: experience.startDate,
          end_date: experience.endDate,
          description: experience.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        const newExperience = {
          id: data[0].id,
          company: data[0].company,
          position: data[0].position,
          startDate: data[0].start_date,
          endDate: data[0].end_date,
          description: data[0].description,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at
        };
        
        set({ 
          experiences: [newExperience, ...get().experiences],
          loading: false 
        });
      }
    } catch (error) {
      console.error('Error adding experience:', error);
      set({ error: 'Failed to add experience', loading: false });
    }
  },
  
  updateExperience: async (id, experienceData) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('experiences')
        .update({
          company: experienceData.company,
          position: experienceData.position,
          start_date: experienceData.startDate,
          end_date: experienceData.endDate,
          description: experienceData.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        experiences: get().experiences.map(exp => 
          exp.id === id 
            ? { ...exp, ...experienceData, updatedAt: new Date().toISOString() } 
            : exp
        ),
        loading: false
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      set({ error: 'Failed to update experience', loading: false });
    }
  },
  
  deleteExperience: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        experiences: get().experiences.filter(exp => exp.id !== id),
        loading: false
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      set({ error: 'Failed to delete experience', loading: false });
    }
  }
}));