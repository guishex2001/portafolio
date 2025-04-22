import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import SkillsPreview from '../components/home/SkillsPreview';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Guillermo García | Full Stack Developer';
  }, []);
  
  return (
    <Layout>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
    </Layout>
  );
};

export default HomePage;