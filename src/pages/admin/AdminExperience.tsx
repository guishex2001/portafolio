import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, AlertTriangle, Calendar } from 'lucide-react';
import { useExperienceStore } from '../../store/useExperienceStore';
import type { Experience } from '../../types/database.types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ExperienceForm from '../../components/admin/ExperienceForm';

const AdminExperience: React.FC = () => {
  const { experiences, loading, error, fetchExperiences, deleteExperience: deleteExperienceStore } = useExperienceStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  
  useEffect(() => {
    document.title = 'Gestionar Experiencia | Panel Admin';
  
  const handleAddNew = () => {
    setSelectedExperience(null);
    setIsFormOpen(true);
  };
  
  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsFormOpen(true);
  };
  
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedExperience(null);
    fetchExperiences();
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedExperience(null);
  };
  
  const handleDeleteClick = (experienceId: number) => {
    setShowDeleteConfirm(experienceId);
  };
  
  const confirmDelete = async (experienceId: number) => {
    try {
      await deleteExperienceStore(experienceId);
      const experienceIndex = experiences.findIndex(experience => experience.id === experienceId)
      experiences.splice(experienceIndex,1);

      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestionar Experiencia</h1>
          <p className="text-gray-400">
            Administra tu experiencia laboral mostrada en el portafolio.
          </p>
        </div>
        
        <Button 
          onClick={handleAddNew}
          icon={<Plus className="w-5 h-5" />}
        >
          Nueva Experiencia
        </Button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-200">{error}</p>
        </div>
      )}
      
      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">
                  {selectedExperience ? 'Editar Experiencia' : 'Nueva Experiencia'}
                </h2>
              </div>
              
              <div className="p-6">
                <ExperienceForm 
                  experience={selectedExperience || undefined}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </div>
            </motion.div>
          </motion.div>
        )}  
      </AnimatePresence>
      
      {/* Experiences list */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (experiences.length > 0) ? (
          experiences.map((experience) => (
            <Card key={experience.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-amber-900/50 p-2 rounded-full mr-2">
                      <Calendar className="h-5 w-5 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-400">{experience.company}</h3>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-2">{experience.position}</h4>
                  
                  <div className="text-sm text-gray-400 mb-4">
                    {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Presente'}
                  </div>
                  
                  <p className="text-gray-300">{experience.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Edit className="w-4 h-4" />}
                    onClick={() => handleEdit(experience)}
                  >
                    Editar
                  </Button>
                  
                  {showDeleteConfirm === experience.id ? (
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm text-gray-400 text-center">
                        ¿Estás seguro?
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => confirmDelete(experience.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="danger" 
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDeleteClick(experience.id)}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 mb-4">
              No hay experiencias guardadas. ¡Agrega tu primera experiencia!
            </p>
            <Button 
              onClick={handleAddNew}
              icon={<Plus className="w-5 h-5" />}
            >
              Nueva Experiencia
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminExperience;