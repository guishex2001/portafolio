import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1200 800">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <pattern id="compass" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 100 0 L 100 200 M 0 100 L 200 100" stroke="currentColor" strokeWidth="1" />
              <path d="M 100 100 L 70 70 M 100 100 L 130 130" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect x="50%" y="50%" width="200" height="200" transform="translate(-100, -100)" fill="url(#compass)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-amber-500 font-bold text-xl mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-indigo-400" />
                <a href="mailto:supraguille@gmail.com" className="hover:text-amber-400 transition-colors">
                  supraguille@gmail.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-indigo-400" />
                <a href="tel:+542664649201" className="hover:text-amber-400 transition-colors">
                  +54 266 4649-201
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2 text-indigo-400" />
                <span>Catamarca, Argentina (GMT-3)</span>
              </li>
            </ul>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-amber-500 font-bold text-xl mb-4">Navegación</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Sobre Mí
                </a>
              </li>
              <li>
                <a href="/experience" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Trayectoria
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="/skills" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Habilidades
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social & Connect */}
          <div>
            <h3 className="text-amber-500 font-bold text-xl mb-4">Conecta</h3>
            <div className="flex space-x-4 mb-6">
              <motion.a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white transition-all"
                whileHover={{ y: -3 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white transition-all"
                whileHover={{ y: -3 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
            <p className="text-gray-400 text-sm">
              Full Stack Developer con experiencia en desarrollo web moderno y creación de soluciones digitales impactantes.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Guillermo García. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;