import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Code, Database, Compass, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const skills = [
  {
    category: 'Frontend',
    icon: <Code className="w-6 h-6" />,
    items: ['React', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion']
  },
  {
    category: 'Backend',
    icon: <Database className="w-6 h-6" />,
    items: ['Node.js', 'PHP', 'Laravel', 'Express', 'MongoDB', 'PostgreSQL', 'Supabase']
  },
  {
    category: 'Herramientas',
    icon: <Compass className="w-6 h-6" />,
    items: ['Git', 'Docker', 'AWS', 'Firebase', 'Jest', 'Figma', 'Adobe XD']
  }
];

const SkillsPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Mapa de <span className="text-amber-500">Habilidades</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Las herramientas y tecnologías que he dominado durante mi travesía por los mares digitales.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
            >
              <div className="bg-indigo-900/50 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-amber-400">
                {skillGroup.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4">{skillGroup.category}</h3>
              
              <ul className="space-y-2">
                {skillGroup.items.map((skill, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-gray-300">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <NavLink to="/skills">
            <Button 
              variant="outline"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Ver todas las habilidades
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;