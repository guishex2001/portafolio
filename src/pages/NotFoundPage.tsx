import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'Página no encontrada | Guillermo García';
  }, []);
  
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated compass */}
            <motion.div 
              className="mx-auto mb-8 w-32 h-32 text-amber-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-full h-full" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Tesoro no encontrado
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              ¡Tierra a la vista! Pero no es la que buscábamos. Parece que has navegado 
              a aguas desconocidas. Esta página no existe en nuestro mapa.
            </p>
            
            <NavLink to="/">
              <Button 
                size="lg" 
                icon={<ArrowLeft className="w-5 h-5" />}
              >
                Volver a puerto seguro
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;