import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Mock data for featured projects
const featuredProjects = [
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
  }
];

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-amber-500">Tesoros</span> Digitales
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubre algunos de mis proyectos más destacados, 
            fruto de aventuras en el vasto océano del desarrollo web.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.imageUrl}
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
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <NavLink to="/projects">
            <Button 
              variant="outline"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Ver todos los proyectos
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;