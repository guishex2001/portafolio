import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Heart, Compass } from 'lucide-react';

const Bio: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center mb-8"
            variants={itemVariants}
          >
            <Anchor className="w-6 h-6 text-amber-500 mr-3" />
            <h2 className="text-3xl font-bold">Mi Historia</h2>
          </motion.div>
          
          <motion.div 
            className="prose prose-lg prose-invert max-w-none"
            variants={itemVariants}
          >
            <p>
              ¡Bienvenidos a bordo! Soy Guillermo García, un <strong className="text-amber-400">navegante digital</strong> con 
              una pasión por crear experiencias web impactantes y funcionales. Mi travesía en el 
              mundo del desarrollo comenzó hace más de 5 años, cuando descubrí que podía combinar 
              mi creatividad con la lógica para construir soluciones digitales.
            </p>
            
            <p>
              Mi aventura comenzó estudiando en la <strong className="text-amber-400">Universidad Tecnológica Nacional</strong>, 
              donde aprendí los fundamentos de la programación y el diseño de sistemas. 
              Desde entonces, he navegado por diversos proyectos que me han permitido 
              perfeccionar mis habilidades como desarrollador Full Stack.
            </p>
            
            <div className="my-8 p-6 bg-indigo-900/20 border border-indigo-800/50 rounded-lg">
              <div className="flex items-center mb-4">
                <Compass className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="text-xl font-bold">Filosofía de trabajo</h3>
              </div>
              <p className="mb-0">
                Creo firmemente en que el código limpio y bien estructurado es como un mapa 
                bien trazado: facilita la navegación y evita tormentas futuras. Mi enfoque 
                siempre ha sido crear soluciones que no solo funcionen hoy, sino que puedan 
                adaptarse a los cambios del mañana.
              </p>
            </div>
            
            <p>
              A lo largo de mi carrera, he tenido el privilegio de colaborar con equipos 
              diversos, desde startups ágiles hasta empresas establecidas. Cada proyecto ha 
              sido como una isla diferente en mi viaje, aportando nuevas experiencias y 
              conocimientos a mi bitácora.
            </p>
            
            <p>
              Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, 
              leyendo sobre tendencias en diseño de UX/UI, o disfrutando de un buen anime —sí, 
              <strong className="text-amber-400"> One Piece</strong> es definitivamente uno de mis favoritos.
            </p>
            
            <div className="flex items-center mt-8 text-lg">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              <p className="mb-0 italic">
                "En el vasto océano digital, la creatividad es nuestra brújula y el código nuestro timón."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Bio;