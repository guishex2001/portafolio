import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { User, MapPin, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

const AboutPreview: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with decorations */}
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Map background */}
              <div className="absolute inset-0 -z-10 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 1000">
                  <path d="M200,200 C300,150 400,250 500,200 C600,150 700,250 800,200" stroke="#F59E0B" strokeWidth="2" fill="none" />
                  <path d="M200,300 C300,250 400,350 500,300 C600,250 700,350 800,300" stroke="#F59E0B" strokeWidth="2" fill="none" />
                  <path d="M200,400 C300,350 400,450 500,400 C600,350 700,450 800,400" stroke="#F59E0B" strokeWidth="2" fill="none" />
                  <path d="M200,500 C300,450 400,550 500,500 C600,450 700,550 800,500" stroke="#F59E0B" strokeWidth="2" fill="none" />
                  <path d="M400,200 L400,600" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                  <path d="M600,200 L600,600" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5,5" fill="none" />
                  <circle cx="300" cy="350" r="10" fill="#4F46E5" opacity="0.5" />
                  <circle cx="500" cy="450" r="10" fill="#4F46E5" opacity="0.5" />
                  <circle cx="700" cy="350" r="10" fill="#4F46E5" opacity="0.5" />
                </svg>
              </div>
              
              {/* Profile image */}
              <img
                src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Guillermo García trabajando"
                className="rounded-lg shadow-2xl shadow-indigo-500/20 border-4 border-gray-800 relative z-10"
              />
              
              {/* Decorated corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-500 -translate-x-4 -translate-y-4 z-0"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-500 translate-x-4 translate-y-4 z-0"></div>
            </div>
          </motion.div>
          
          {/* Text content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sobre <span className="text-amber-500">Mí</span>
            </h2>
            
            <p className="text-gray-300 mb-6 text-lg">
              ¡Saludos, navegante digital! Soy Guillermo García, un apasionado desarrollador 
              full stack con más de 5 años de experiencia en la gran travesía del desarrollo web. 
              Mi viaje comenzó explorando las aguas del frontend, para luego aventurarme en las 
              profundidades del backend.
            </p>
            
            <p className="text-gray-300 mb-8">
              Como todo buen explorador, he navegado por diversos mares tecnológicos, desde 
              la creación de experiencias interactivas y responsivas hasta el desarrollo de 
              robustas APIs y eficientes bases de datos. Mi brújula siempre apunta hacia la 
              innovación y la calidad.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-900/50 p-3 rounded-full">
                  <User className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-medium">Desarrollador Full Stack</h3>
                  <p className="text-sm text-gray-400">5+ años de experiencia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-900/50 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-medium">Catamarca, Argentina</h3>
                  <p className="text-sm text-gray-400">GMT-3</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-900/50 p-3 rounded-full">
                  <BookOpen className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-medium">Idiomas</h3>
                  <p className="text-sm text-gray-400">Español (nativo), Inglés (conversacional)</p>
                </div>
              </div>
            </div>
            
            <NavLink to="/about">
              <Button variant="secondary">
                Conocer más
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;