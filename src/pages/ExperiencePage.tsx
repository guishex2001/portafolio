import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ExperienceTimeline from '../components/experience/ExperienceTimeline';

const ExperiencePage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Trayectoria Pirata | Guillermo García';
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
              Trayectoria <span className="text-amber-500">Pirata</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mi bitácora de viaje a través del mundo del desarrollo web.
            </p>
          </motion.div>
          
          <ExperienceTimeline />
        </div>
      </section>
    </Layout>
  );
};

export default ExperiencePage;