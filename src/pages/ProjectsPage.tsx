import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ProjectGrid from '../components/projects/ProjectGrid';

const ProjectsPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Tesoros Digitales | Guillermo García';
  }, []);
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tesoros <span className="text-amber-500">Digitales</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explora mi colección de proyectos y descubre las soluciones digitales que he creado.
            </p>
          </motion.div>
          
          <ProjectGrid />
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;