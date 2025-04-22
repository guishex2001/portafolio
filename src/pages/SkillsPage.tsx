import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SkillMap from '../components/skills/SkillMap';

const SkillsPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Mapa de Habilidades | Guillermo García';
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
              Mapa de <span className="text-amber-500">Habilidades</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Navega por mi atlas de tecnologías y conocimientos que he adquirido a lo largo de mi viaje.
            </p>
          </motion.div>
          
          <SkillMap />
        </div>
      </section>
    </Layout>
  );
};

export default SkillsPage;