import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabase, createExperience, updateExperience } from '../../lib/supabase';
import type { Experience } from '../../types/database.types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { useExperienceStore } from '../../store/useExperienceStore';

interface ExperienceFormProps {
  experience?: Experience;
  onCancel: () => void;
}

// Define the form data structure
interface FormData {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  experience: initialExperience,
  onCancel
}) => {
  const router = useRouter();
  const { addExperience, updateAnExperience } = useExperienceStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience | undefined>(initialExperience)
  useEffect(() => {
    if(initialExperience){
      setExperience(initialExperience)
    }
  }, [initialExperience])

  // Initialize the form using react-hook-form with default values if experience is provided

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
        const updatedExperience = { ...experience, ...data } as Experience

        const { error: supabaseError, data: updatedData } = await updateExperience(updatedExperience)

        updateAnExperience(updatedData[0])
        
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
        addExperience(supabaseResponse.data[0])    
      }
      
      onSuccess();
    } catch (err) {
      console.error('Error saving experience:', err);
      setError('Hubo un error al guardar la experiencia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
    function onSuccess() {
      router.refresh()
      router.push('/admin/experience')
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
            initialExperience ? 'Actualizar Experiencia' : 'Crear Experiencia'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExperienceForm;