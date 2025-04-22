import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import Card from '../ui/Card';

interface ExperienceProps {
  experiences?: {
    id: number;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
  }[];
  loading?: boolean;
}

// Sample data, this would be replaced by the actual data from Supabase
const defaultExperiences = [
  {
    id: 1,
    company: 'Elite Marketing Digital',
    position: 'Senior Full Stack Developer',
    startDate: '2024-08-01',
    endDate: null,
    description: 'Desarrollo de aplicaciones web para marketing digital, optimización de SEO y rendimiento. Implementación de estrategias de analytics y automatización de procesos de marketing.'
  },
  {
    id: 2,
    company: 'Supranet',
    position: 'Full Stack Developer',
    startDate: '2023-01-01',
    endDate: null,
    description: 'Diseño y desarrollo de aplicaciones web y móviles. Gestión de bases de datos, implementación de APIs REST y GraphQL. Trabajo con tecnologías modernas como React, Node.js y Supabase.'
  },
  {
    id: 3,
    company: 'APAS Catamarca y La Rioja',
    position: 'Web Developer',
    startDate: '2020-03-01',
    endDate: '2022-12-31',
    description: 'Desarrollo y mantenimiento del sitio web institucional. Implementación de sistemas de gestión interna y portales de servicios para asociados. Optimización de bases de datos y seguridad web.'
  }
];

const ExperienceTimeline: React.FC<ExperienceProps> = ({ 
  experiences = defaultExperiences,
  loading = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="relative">
        {/* Main timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-indigo-700 opacity-30 rounded-full"></div>
        
        {/* Animated sailing ship along the timeline */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "95%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-500">
              <path d="M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 15C3 15 6 9 12 9C18 9 21 15 21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 15L12 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
        
        {/* Experience cards */}
        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <motion.div 
              key={experience.id}
              className={`relative ${index % 2 === 0 ? 'ml-auto pr-12 text-right' : 'mr-auto pl-12'}`}
              style={{ width: 'calc(50% - 20px)' }}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline node */}
              <div 
                className={`absolute top-5 w-5 h-5 rounded-full bg-amber-500 z-10 ${
                  index % 2 === 0 ? 'left-[calc(0%-10px)]' : 'left-[calc(100%+6px)]'
                }`}
              ></div>
              
              {/* Connecting line */}
              <div 
                className={`absolute top-7 h-0.5 bg-amber-500/70 z-0 ${
                  index % 2 === 0 ? 'right-0 left-[calc(0%-10px)]' : 'left-12 right-[calc(0%-10px)]'
                }`}
              ></div>
              
              <Card className={`${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                <div className="p-6">
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className="bg-indigo-900/60 p-2 rounded-full">
                      <Briefcase className="h-4 w-4 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-400">{experience.company}</h3>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">{experience.position}</h4>
                  
                  <div className={`flex items-center text-sm text-gray-300 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    <span>
                      {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Presente'}
                    </span>
                  </div>
                  
                  <p className={`text-gray-300 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {experience.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;