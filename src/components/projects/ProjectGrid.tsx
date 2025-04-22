import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search } from 'lucide-react';
import Card from '../ui/Card';

interface ProjectGridProps {
  projects?: {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    technologies: string[];
    url: string | null;
    githubUrl: string | null;
  }[];
  loading?: boolean;
}

// Sample data, this would be replaced by the actual data from Supabase
const defaultProjects = [
  {
    id: 1,
    title: 'Tesoros Digitales',
    description: 'Plataforma para compartir recursos digitales con un sistema de gamificación inspirado en la búsqueda de tesoros.',
    imageUrl: 'https://images.pexels.com/photos/7107664/pexels-photo-7107664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 2,
    title: 'Nakamas Tienda Online',
    description: 'eCommerce especializado en productos relacionados con anime, optimizado para conversión y experiencia de usuario.',
    imageUrl: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'Supabase'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 3,
    title: 'CAMYENCRAFT',
    description: 'Minijuego inspirado en mecánicas de construcción y exploración, desarrollado con tecnologías web modernas.',
    imageUrl: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Three.js', 'TypeScript', 'WebGL', 'Firebase'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 4,
    title: 'Replace-RSS Plugin',
    description: 'Plugin para WordPress que permite reemplazar y personalizar los feeds RSS, mejorando la distribución de contenido.',
    imageUrl: 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['PHP', 'WordPress', 'JavaScript', 'XML'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 5,
    title: 'API-CRUD Laravel',
    description: 'Sistema de gestión para distribuidores de TV Box con API RESTful para integraciones con aplicaciones móviles.',
    imageUrl: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Laravel', 'MySQL', 'REST API', 'JWT Auth'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 6,
    title: 'Sensorial Arduino',
    description: 'Proyecto de IoT que utiliza sensores Arduino para crear instalaciones interactivas controladas vía web.',
    imageUrl: 'https://images.pexels.com/photos/163173/keyboard-technology-computing-computer-163173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Arduino', 'WebSockets', 'Node.js', 'Vue.js'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 7,
    title: 'Login Lomoro',
    description: 'Sistema de autenticación seguro con múltiples factores y protección contra ataques para aplicaciones empresariales.',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Firebase Auth', 'Express', 'JWT'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 8,
    title: 'Dozu eCommerce',
    description: 'Plataforma de comercio electrónico personalizada con sistema de gestión de inventario y pasarelas de pago múltiples.',
    imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Next.js', 'Stripe', 'Supabase', 'TypeScript'],
    url: 'https://example.com',
    githubUrl: 'https://github.com'
  }
];

const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  projects = defaultProjects,
  loading = false 
}) => {
  const [filter, setFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.description.toLowerCase().includes(filter.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Search */}
      <div className="mb-8 relative">
        <div className="flex items-center max-w-md mx-auto bg-gray-800/50 rounded-lg border border-gray-700 px-4 py-2 focus-within:border-indigo-500 transition-colors">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o tecnología..."
            className="flex-grow bg-transparent border-none outline-none text-white placeholder-gray-400"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full flex flex-col cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
                hover={true}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.imageUrl || 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-amber-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-200 border border-indigo-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 pt-0 mt-auto flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-300 hover:text-amber-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-300 hover:text-amber-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No se encontraron proyectos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {filteredProjects.filter(p => p.id === selectedProject).map(project => (
                <div key={project.id} className="relative">
                  <div className="relative h-64">
                    <img 
                      src={project.imageUrl || 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <button 
                      className="absolute top-4 right-4 bg-gray-900/60 p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setSelectedProject(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-amber-400">{project.title}</h2>
                    <p className="text-gray-300 mb-6">{project.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Tecnologías</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-200 border border-indigo-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white flex items-center transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Ver proyecto
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center transition-colors"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          Ver código
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGrid;