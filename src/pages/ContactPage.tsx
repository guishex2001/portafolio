import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

const ContactPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Contacto | Guillermo García';
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
              <span className="text-amber-500">Contacto</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ¿Listo para embarcarte en una nueva aventura digital? ¡Envíame un mensaje!
            </p>
          </motion.div>
          
          <ContactForm />
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;