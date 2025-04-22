import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { Project } from '../../types/database.types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { createProject, updateProject } from '../../lib/supabase';
import { useProjectStore } from '../../store/useProjectStore';

interface ProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string;
  url: string;
  githubUrl: string;
}

interface Props {
  project?: Project;
}

const ProjectForm: React.FC<Props> = ({ project }) => {
  const { addProject, updateProject: updateProjectStore } = useProjectStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(project);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: project ? {
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      technologies: project.technologies.join(', '),
      url: project.url || '',
      githubUrl: project.githubUrl || ''
    } : undefined
  });
  
  useEffect(() => {
    setCurrentProject(project);
  }, [project]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const technologies = data.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '');
      
      if (project) {
        const { data: updatedProject, error: supabaseError } = await updateProject({
          ...data,
          id: currentProject?.id,
          technologies,
        } as Project);

        if (supabaseError) {
          throw supabaseError;
        }

        if (updatedProject) {
          updateProjectStore(updatedProject);
          router.push('/admin/projects');
        }
      } else {
        const { data: newProject, error: supabaseError } = await createProject({
          ...data,
          technologies,
        } as Project);
        if (supabaseError) {
          throw supabaseError;
        }
        if (newProject) {
          addProject(newProject);
          router.push('/admin/projects');
        }
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Hubo un error al guardar el proyecto. Por favor, inténtalo de nuevo.');
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
        id="title"
        label="Título del Proyecto"
        placeholder="Nombre del proyecto"
        error={errors.title?.message}
        required
        {...register('title', {
          required: 'El título es obligatorio'
        })}
      />
      
      <TextArea
        id="description"
        label="Descripción"
        placeholder="Describe el proyecto..."
        rows={4}
        error={errors.description?.message}
        required
        {...register('description', {
          required: 'La descripción es obligatoria'
        })}
      />
      
      <Input
        id="imageUrl"
        label="URL de la Imagen"
        placeholder="https://ejemplo.com/imagen.jpg"
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />
      
      <Input
        id="technologies"
        label="Tecnologías"
        placeholder="React, TypeScript, Tailwind CSS, etc."
        error={errors.technologies?.message}
        required
        {...register('technologies', {
          required: 'Las tecnologías son obligatorias'
        })}
      />
      
      <Input
        id="url"
        label="URL del Proyecto"
        placeholder="https://ejemplo.com"
        error={errors.url?.message}
        {...register('url')}
      />
      
      <Input
        id="githubUrl"
        label="URL de GitHub"
        placeholder="https://github.com/usuario/proyecto"
        error={errors.githubUrl?.message}
        {...register('githubUrl')}
      />
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
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
            project ? 'Actualizar Proyecto' : 'Crear Proyecto'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;