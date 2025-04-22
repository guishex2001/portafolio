import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error: supabaseError } = await supabase
        .from('contact')
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (supabaseError) throw supabaseError;
      
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-12 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="wave" width="200" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10" fill="none" stroke="#4F46E5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-2">Contacto</h2>
              <p className="text-gray-300">
                ¿Tienes un proyecto en mente o quieres navegar juntos en una nueva aventura digital? 
                ¡Envíame un mensaje!
              </p>
            </motion.div>
            
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/30 border border-emerald-800 rounded-lg p-6 text-center"
              >
                <Check className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">¡Mensaje enviado con éxito!</h3>
                <p className="text-gray-300">
                  Gracias por contactarme. Te responderé lo antes posible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                    <p className="text-red-200">{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    id="name"
                    label="Nombre"
                    placeholder="Tu nombre"
                    error={errors.name?.message}
                    required
                    {...register('name', {
                      required: 'El nombre es obligatorio',
                      minLength: {
                        value: 2,
                        message: 'El nombre debe tener al menos 2 caracteres'
                      }
                    })}
                  />
                  
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="tu.email@ejemplo.com"
                    error={errors.email?.message}
                    required
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Dirección de email inválida'
                      }
                    })}
                  />
                  
                  <TextArea
                    id="message"
                    label="Mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    error={errors.message?.message}
                    required
                    {...register('message', {
                      required: 'El mensaje es obligatorio',
                      minLength: {
                        value: 10,
                        message: 'El mensaje debe tener al menos 10 caracteres'
                      }
                    })}
                  />
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          <div className="bg-indigo-900/40 border-t border-gray-700 p-6">
            <div className="flex flex-col md:flex-row justify-center md:space-x-12 text-center">
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-amber-400 mb-1">Email</h3>
                <a href="mailto:supraguille@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  supraguille@gmail.com
                </a>
              </div>
              
              <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-amber-400 mb-1">Teléfono</h3>
                <a href="tel:+542664649201" className="text-gray-300 hover:text-white transition-colors">
                  +54 266 4649-201
                </a>
              </div>
              
              <div>
                <h3 className="font-semibold text-amber-400 mb-1">Ubicación</h3>
                <p className="text-gray-300">Catamarca, Argentina (GMT-3)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;