export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number;
          title: string;
          description: string;
          image_url: string | null;
          technologies: string[];
          url: string | null;
          github_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description: string;
          image_url?: string | null;
          technologies: string[];
          url?: string | null;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string;
          image_url?: string | null;
          technologies?: string[];
          url?: string | null;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: number;
          company: string;
          position: string;
          start_date: string;
          end_date: string | null;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          company: string;
          position: string;
          start_date: string;
          end_date?: string | null;
          description: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          company?: string;
          position?: string;
          start_date?: string;
          end_date?: string | null;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact: {
        Row: {
          id: number;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  technologies: string[];
  url: string | null;
  githubUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
}