import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
// These would come from environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';


export const getAllExperiences = async () => {
  try {
    const { data, error } = await supabase.from('experience').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return null;
  }
};

export const createExperience = async (
  newExperience: Database['public']['Tables']['experience']['Insert']
) => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .insert(newExperience)
      .select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating new experience:', error);
  }
};

export const updateExperience = async (
  experience: Database['public']['Tables']['experience']['Update'], id: number
) => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .update(experience).eq('id', id).select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating experience:', error);
  }
};

export const deleteExperience = async (
  id: number
) => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .delete().eq('id', id);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting experience:', error);
  }
};


export const getAllProjects = async () => {
  try {
    const { data, error } = await supabase.from('project').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
};


export const createProject = async (
  newProject: Database['public']['Tables']['project']['Insert']
) => {
  try {
    const { data, error } = await supabase
      .from('project')
      .insert(newProject)
      .select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error creating new project:', error);
  }
};

export const updateProject = async (
  project: Database['public']['Tables']['project']['Update'], id: number
) => {
  try {
    const { data, error } = await supabase
      .from('project')
      .update(project).eq('id', id).select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
  }
};

export const deleteProject = async (
  id: number
) => {
  try {
    const { data, error } = await supabase
      .from('project')
      .delete().eq('id', id);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

