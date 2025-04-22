import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/database.types';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: number, project: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,
  
  fetchProjects: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const projects = data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image_url,
        technologies: project.technologies,
        url: project.url,
        githubUrl: project.github_url,
        createdAt: project.created_at,
        updatedAt: project.updated_at
      }));
      
      set({ projects, loading: false });
    } catch (error) {
      console.error('Error fetching projects:', error);
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },
  
  addProject: async (project) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          description: project.description,
          image_url: project.imageUrl,
          technologies: project.technologies,
          url: project.url,
          github_url: project.githubUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        const newProject = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description,
          imageUrl: data[0].image_url,
          technologies: data[0].technologies,
          url: data[0].url,
          githubUrl: data[0].github_url,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at
        };
        
        set({ 
          projects: [newProject, ...get().projects],
          loading: false 
        });
      }
    } catch (error) {
      console.error('Error adding project:', error);
      set({ error: 'Failed to add project', loading: false });
    }
  },
  
  updateProject: async (id, projectData) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          description: projectData.description,
          image_url: projectData.imageUrl,
          technologies: projectData.technologies,
          url: projectData.url,
          github_url: projectData.githubUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        projects: get().projects.map(project => 
          project.id === id 
            ? { ...project, ...projectData, updatedAt: new Date().toISOString() } 
            : project
        ),
        loading: false
      });
    } catch (error) {
      console.error('Error updating project:', error);
      set({ error: 'Failed to update project', loading: false });
    }
  },
  
  deleteProject: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        projects: get().projects.filter(project => project.id !== id),
        loading: false
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      set({ error: 'Failed to delete project', loading: false });
    }
  }
}));