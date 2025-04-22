import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, user } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/admin');
    }
    
    // Update document title
    document.title = 'Login | Admin Panel';
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Compass decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-5">
        <svg viewBox="0 0 400 400" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="160" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <circle cx="200" cy="200" r="120" stroke="#F59E0B" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="80" stroke="#F59E0B" strokeWidth="1" fill="none" />
          <path d="M 200 40 L 200 360 M 40 200 L 360 200" stroke="#F59E0B" strokeWidth="2" />
          <path d="M 200 200 L 120 120 M 200 200 L 280 280" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <motion.div
          className="max-w-md w-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Anchor className="h-12 w-12 text-amber-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6">
              Panel de Administración
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-200 text-center">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
              
              <Input
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
                icon={<LogIn className="w-5 h-5" />}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ingresando...
                  </span>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </div>
          
          <div className="px-8 py-4 bg-gray-900/50 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              Acceso exclusivo para administradores. Si eres el propietario del sitio y 
              olvidaste tus credenciales, contacta al soporte técnico.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;