import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, MessageSquare, Folder, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Card from '../../components/ui/Card';

interface Stats {
  projectCount: number;
  experienceCount: number;
  messageCount: number;
  latestMessage: {
    name: string;
    email: string;
    date: string;
  } | null;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    projectCount: 0,
    experienceCount: 0,
    messageCount: 0,
    latestMessage: null
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Update document title
    document.title = 'Dashboard | Panel Admin';
    
    const fetchStats = async () => {
      try {
        // Get project count
        const { count: projectCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        // Get experience count
        const { count: experienceCount } = await supabase
          .from('experiences')
          .select('*', { count: 'exact', head: true });
        
        // Get message count
        const { count: messageCount } = await supabase
          .from('contact')
          .select('*', { count: 'exact', head: true });
        
        // Get latest message
        const { data: messages } = await supabase
          .from('contact')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        
        setStats({
          projectCount: projectCount || 0,
          experienceCount: experienceCount || 0,
          messageCount: messageCount || 0,
          latestMessage: messages && messages.length > 0 ? {
            name: messages[0].name,
            email: messages[0].email,
            date: new Date(messages[0].created_at).toLocaleDateString()
          } : null
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Bienvenido al panel de administración de tu portafolio.
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Proyectos</p>
                <h3 className="text-3xl font-bold">{stats.projectCount}</h3>
              </div>
              <div className="bg-indigo-900/50 p-3 rounded-full">
                <Folder className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Experiencias</p>
                <h3 className="text-3xl font-bold">{stats.experienceCount}</h3>
              </div>
              <div className="bg-amber-900/50 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Mensajes</p>
                <h3 className="text-3xl font-bold">{stats.messageCount}</h3>
              </div>
              <div className="bg-emerald-900/50 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Visitantes (mensual)</p>
                <h3 className="text-3xl font-bold">--</h3>
              </div>
              <div className="bg-red-900/50 p-3 rounded-full">
                <Users className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent activity and overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-amber-500" />
              Actividad Reciente
            </h2>
            
            <div className="space-y-4">
              {stats.latestMessage ? (
                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <p className="font-medium">Nuevo mensaje de {stats.latestMessage.name}</p>
                  <p className="text-sm text-gray-400">{stats.latestMessage.email}</p>
                  <p className="text-xs text-gray-500">{stats.latestMessage.date}</p>
                </div>
              ) : (
                <p className="text-gray-400">No hay actividad reciente para mostrar.</p>
              )}
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Accesos Rápidos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="/admin/projects" 
                className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center text-center"
              >
                <Folder className="w-8 h-8 mb-2 text-amber-500" />
                <span>Gestionar Proyectos</span>
              </a>
              
              <a 
                href="/admin/experience" 
                className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center text-center"
              >
                <Calendar className="w-8 h-8 mb-2 text-amber-500" />
                <span>Gestionar Experiencia</span>
              </a>
              
              <a 
                href="/admin/messages" 
                className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center text-center"
              >
                <MessageSquare className="w-8 h-8 mb-2 text-amber-500" />
                <span>Ver Mensajes</span>
              </a>
              
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex flex-col items-center text-center"
              >
                <Users className="w-8 h-8 mb-2 text-amber-500" />
                <span>Ver Sitio Web</span>
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;