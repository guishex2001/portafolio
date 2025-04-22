import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import type { Experience } from '../../types/database.types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface ExperienceFormProps {
  experience?: Experience;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  experience,
  onSuccess,
  onCancel
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: experience ? {
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate.substring(0, 10), // Format for input[type="date"]
      endDate: experience.endDate ? experience.endDate.substring(0, 10) : '',
      description: experience.description
    } : undefined
  });
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (experience) {
        // Update existing experience
        const { error: supabaseError } = await supabase
          .from('experiences')
          .update({
            company: data.company,
            position: data.position,
            start_date: data.startDate,
            end_date: data.endDate || null,
            description: data.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', experience.id);
        
        if (supabaseError) throw supabaseError;
      } else {
        // Create new experience
        const { error: supabaseError } = await supabase
          .from('experiences')
          .insert([{
            company: data.company,
            position: data.position,
            start_date: data.startDate,
            end_date: data.endDate || null,
            description: data.description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (supabaseError) throw supabaseError;
      }
      
      onSuccess();
    } catch (err) {
      console.error('Error saving experience:', err);
      setError('Hubo un error al guardar la experiencia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800 rounded-lg">
          <p className="text-red-200">{error}</p>
        </div>
      )}
      
      <Input
        id="company"
        label="Empresa"
        placeholder="Nombre de la empresa"
        error={errors.company?.message}
        required
        {...register('company', {
          required: 'El nombre de la empresa es obligatorio'
        })}
      />
      
      <Input
        id="position"
        label="Cargo"
        placeholder="Tu posición en la empresa"
        error={errors.position?.message}
        required
        {...register('position', {
          required: 'El cargo es obligatorio'
        })}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="startDate"
          label="Fecha de Inicio"
          type="date"
          error={errors.startDate?.message}
          required
          {...register('startDate', {
            required: 'La fecha de inicio es obligatoria'
          })}
        />
        
        <Input
          id="endDate"
          label="Fecha de Fin (dejar vacío si es actual)"
          type="date"
          error={errors.endDate?.message}
          {...register('endDate')}
        />
      </div>
      
      <TextArea
        id="description"
        label="Descripción"
        placeholder="Describe tus responsabilidades y logros..."
        rows={4}
        error={errors.description?.message}
        required
        {...register('description', {
          required: 'La descripción es obligatoria'
        })}
      />
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            experience ? 'Actualizar Experiencia' : 'Crear Experiencia'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm;