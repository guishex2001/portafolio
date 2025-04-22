/*
  # Initial portfolio database schema
  
  1. New Tables
    - `projects`: Stores portfolio projects
      - `id` (primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image_url` (text)
      - `technologies` (text array, required)
      - `url` (text)
      - `github_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `experiences`: Stores work experience entries
      - `id` (primary key)
      - `company` (text, required)
      - `position` (text, required)
      - `start_date` (date, required)
      - `end_date` (date)
      - `description` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
    - `contact`: Stores contact form submissions
      - `id` (primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] NOT NULL,
  url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Projects policies
CREATE POLICY "Public users can read projects"
  ON projects
  FOR SELECT
  TO PUBLIC
  USING (true);
  
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
  
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Experiences policies
CREATE POLICY "Public users can read experiences"
  ON experiences
  FOR SELECT
  TO PUBLIC
  USING (true);
  
CREATE POLICY "Authenticated users can insert experiences"
  ON experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
  
CREATE POLICY "Authenticated users can update experiences"
  ON experiences
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete experiences"
  ON experiences
  FOR DELETE
  TO authenticated
  USING (true);

-- Contact policies
CREATE POLICY "Public users can insert contact"
  ON contact
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);
  
CREATE POLICY "Authenticated users can read contact"
  ON contact
  FOR SELECT
  TO authenticated
  USING (true);