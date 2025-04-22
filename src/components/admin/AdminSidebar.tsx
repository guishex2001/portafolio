import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Anchor,
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  User,
  Mail,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../ui/Button';

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin' },
    { icon: <FolderKanban className="w-5 h-5" />, label: 'Proyectos', path: '/admin/projects' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Experiencia', path: '/admin/experience' },
    { icon: <User className="w-5 h-5" />, label: 'Perfil', path: '/admin/profile' },
    { icon: <Mail className="w-5 h-5" />, label: 'Mensajes', path: '/admin/messages' },
  ];
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900/80 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <Anchor className="h-8 w-8 text-amber-500 mr-2" />
            <span className="text-white font-bold text-xl">Admin Panel</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-indigo-900/60 text-white' 
                        : 'text-gray-300 hover:bg-gray-700/60 hover:text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3 text-gray-400">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleSignOut}
            icon={<LogOut className="w-5 h-5" />}
          >
            Cerrar Sesión
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;