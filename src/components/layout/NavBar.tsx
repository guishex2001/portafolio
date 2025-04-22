import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Anchor } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();
  
  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Trayectoria Pirata', path: '/experience' },
    { name: 'Tesoros Digitales', path: '/projects' },
    { name: 'Habilidades', path: '/skills' },
    { name: 'Contacto', path: '/contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <Anchor className="h-8 w-8 text-amber-500 mr-2" />
            <span className="text-white font-bold text-xl">Guillermo García</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink 
                    to={link.path}
                    className={({ isActive }) => 
                      `relative text-sm font-medium py-2 px-1 transition-colors hover:text-amber-400 ${
                        isActive ? 'text-amber-500' : 'text-gray-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                            layoutId="navbar-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
              
              {user && (
                <li>
                  <NavLink 
                    to="/admin"
                    className={({ isActive }) => 
                      `relative text-sm font-medium py-2 px-1 transition-colors hover:text-amber-400 ${
                        isActive ? 'text-amber-500' : 'text-gray-200'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        Dashboard
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                            layoutId="navbar-indicator"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900/95 backdrop-blur-lg shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3">
              <ul className="space-y-4 pb-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink 
                      to={link.path}
                      className={({ isActive }) => 
                        `block py-2 px-4 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-indigo-900/50 text-amber-500' 
                            : 'text-gray-200 hover:bg-gray-800/50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                
                {user && (
                  <li>
                    <NavLink 
                      to="/admin"
                      className={({ isActive }) => 
                        `block py-2 px-4 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-indigo-900/50 text-amber-500' 
                            : 'text-gray-200 hover:bg-gray-800/50'
                        }`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;