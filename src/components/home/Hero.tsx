import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Anchor, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const element = scrollRef.current;
      if (element) {
        element.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated background element */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={scrollRef} 
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent rounded-full blur-[100px] transform scale-150"
          style={{ top: '-30%', left: '30%' }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Text content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="inline-flex items-center bg-gray-800/60 rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-gray-700"
            variants={itemVariants}
          >
            <Anchor className="w-4 h-4 text-amber-500 mr-2" />
            <span className="text-sm font-medium">Desarrollador Full Stack</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            variants={itemVariants}
          >
            Guillermo García
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Navegante Digital
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            variants={itemVariants}
          >
            Creador de soluciones digitales que transforman ideas en experiencias memorables. 
            Explorando el vasto océano del desarrollo web con pasión y creatividad.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            variants={itemVariants}
          >
            <NavLink to="/projects">
              <Button 
                size="lg" 
                variant="primary"
                icon={<ChevronRight className="w-5 h-5" />}
              >
                Ver Proyectos
              </Button>
            </NavLink>
            
            <NavLink to="/contact">
              <Button 
                size="lg" 
                variant="outline"
              >
                Contactar
              </Button>
            </NavLink>
          </motion.div>
        </motion.div>
        
        {/* Image/Illustration */}
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative w-full max-w-md mx-auto">
            {/* Circular frame */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 animate-pulse"></div>
            
            {/* Compass decoration */}
            <svg className="absolute -z-10 w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" stroke="#4F46E5" strokeWidth="1" fill="none" opacity="0.2" />
              <circle cx="100" cy="100" r="60" stroke="#4F46E5" strokeWidth="1" fill="none" opacity="0.15" />
              <path d="M 100 20 L 100 180 M 20 100 L 180 100" stroke="#4F46E5" strokeWidth="1" opacity="0.2" />
            </svg>
            
            {/* Profile image */}
            <img 
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Guillermo García" 
              className="w-full h-full object-cover rounded-full aspect-square shadow-2xl shadow-indigo-500/20 border-4 border-gray-800"
            />
            
            {/* Animated dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-amber-500"
                style={{
                  top: `${50 + 45 * Math.sin(i * (Math.PI / 4))}%`,
                  left: `${50 + 45 * Math.cos(i * (Math.PI / 4))}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;