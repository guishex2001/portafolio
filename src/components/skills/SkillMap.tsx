import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 5, category: 'frontend' },
  { name: 'Vue.js', level: 4, category: 'frontend' },
  { name: 'Angular', level: 3, category: 'frontend' },
  { name: 'TypeScript', level: 4, category: 'frontend' },
  { name: 'JavaScript', level: 5, category: 'frontend' },
  { name: 'HTML5', level: 5, category: 'frontend' },
  { name: 'CSS3', level: 5, category: 'frontend' },
  { name: 'Tailwind CSS', level: 5, category: 'frontend' },
  { name: 'SASS/SCSS', level: 4, category: 'frontend' },
  { name: 'Next.js', level: 4, category: 'frontend' },
  { name: 'Framer Motion', level: 3, category: 'frontend' },
  { name: 'GSAP', level: 3, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 4, category: 'backend' },
  { name: 'Express', level: 4, category: 'backend' },
  { name: 'PHP', level: 4, category: 'backend' },
  { name: 'Laravel', level: 3, category: 'backend' },
  { name: 'Python', level: 3, category: 'backend' },
  { name: 'Django', level: 2, category: 'backend' },
  { name: 'MySQL', level: 4, category: 'backend' },
  { name: 'PostgreSQL', level: 4, category: 'backend' },
  { name: 'MongoDB', level: 3, category: 'backend' },
  { name: 'GraphQL', level: 3, category: 'backend' },
  { name: 'REST API', level: 5, category: 'backend' },
  { name: 'Supabase', level: 4, category: 'backend' },
  { name: 'Firebase', level: 4, category: 'backend' },
  
  // Tools & Others
  { name: 'Git', level: 5, category: 'tools' },
  { name: 'Docker', level: 3, category: 'tools' },
  { name: 'AWS', level: 3, category: 'tools' },
  { name: 'Netlify', level: 4, category: 'tools' },
  { name: 'Vercel', level: 4, category: 'tools' },
  { name: 'Jest', level: 3, category: 'tools' },
  { name: 'Cypress', level: 3, category: 'tools' },
  { name: 'Figma', level: 4, category: 'tools' },
  { name: 'Adobe XD', level: 3, category: 'tools' },
  { name: 'Photoshop', level: 3, category: 'tools' },
  { name: 'Webpack', level: 3, category: 'tools' },
  { name: 'Vite', level: 4, category: 'tools' },
];

const categories = [
  { id: 'frontend', name: 'Frontend', color: 'from-amber-500 to-amber-600' },
  { id: 'backend', name: 'Backend', color: 'from-indigo-500 to-indigo-600' },
  { id: 'tools', name: 'Herramientas', color: 'from-emerald-500 to-emerald-600' },
];

const SkillMap: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Nautical map background */}
          <div className="relative mb-12 border-4 border-amber-800/30 rounded-lg p-8 overflow-hidden bg-gray-800/50">
            {/* Map grid lines */}
            <div className="absolute inset-0 z-0 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#F59E0B" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Compass decoration */}
            <div className="absolute bottom-8 right-8 opacity-20 w-64 h-64">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="#F59E0B" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="60" stroke="#F59E0B" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="40" stroke="#F59E0B" strokeWidth="1" fill="none" />
                <path d="M 100 20 L 100 180 M 20 100 L 180 100" stroke="#F59E0B" strokeWidth="2" />
                <path d="M 100 100 L 60 60 M 100 100 L 140 140" stroke="#F59E0B" strokeWidth="3" />
                <text x="95" y="30" fill="#F59E0B" fontSize="12">N</text>
                <text x="95" y="175" fill="#F59E0B" fontSize="12">S</text>
                <text x="175" y="104" fill="#F59E0B" fontSize="12">E</text>
                <text x="25" y="104" fill="#F59E0B" fontSize="12">O</text>
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-8 relative z-10">Mapa de Habilidades</h2>
            
            {/* Skill categories */}
            <div className="grid gap-8 relative z-10">
              {categories.map((category) => (
                <div key={category.id} className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                    {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills
                      .filter((skill) => skill.category === category.id)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          whileHover={{ 
                            y: -5,
                            boxShadow: `0 10px 25px -5px rgba(${
                              category.id === 'frontend' 
                                ? '245, 158, 11' 
                                : category.id === 'backend' 
                                  ? '79, 70, 229' 
                                  : '16, 185, 129'
                            }, 0.2)`
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold">{skill.name}</h4>
                            <div className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-700">
                              {skill.level}/5
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <motion.div 
                              className={`h-2.5 rounded-full bg-gradient-to-r ${category.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level * 20}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillMap;