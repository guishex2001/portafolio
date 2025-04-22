import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Bio from '../components/about/Bio';

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Sobre Mí | Guillermo García';
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
              Sobre <span className="text-amber-500">Mí</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conoce la historia detrás del desarrollador y navegante digital.
            </p>
          </motion.div>
        </div>
      </section>
      
      <Bio />
    </Layout>
  );
};

export default AboutPage;