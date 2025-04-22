import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useProjectStore } from '../../store/useProjectStore';
import type { Project } from '../../types/database.types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProjectForm from '../../components/admin/ProjectForm';

const AdminProjects: React.FC = () => {
  const { projects, loading, error, fetchProjects, deleteProject } = useProjectStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);  
  
  useEffect(() => {
    document.title = 'Gestionar Proyectos | Panel Admin';
  
  const handleAddNew = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };
  
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };
  
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedProject(null);
    fetchProjects();
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedProject(null);
  };
  
  const handleDeleteClick = (projectId: number) => {
    setShowDeleteConfirm(projectId);
  };
  
  const confirmDelete = async (projectId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    
    try {
      await deleteProject(projectId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestionar Proyectos</h1>
          <p className="text-gray-400">
            Administra los proyectos mostrados en tu portafolio.
          </p>
        </div>
        
        <Button 
          onClick={handleAddNew}
          icon={<Plus className="w-5 h-5" />}
        >
          Nuevo Proyecto
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
                  {selectedProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                </h2>
              </div>
              
              <div className="p-6">
                <ProjectForm 
                  project={selectedProject || undefined}
                  onSuccess={handleFormSuccess}
                  onCancel={handleFormCancel}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Projects list */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 h-48 md:h-auto">
                  <img 
                    src={project.imageUrl || 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 md:w-3/4 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-amber-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-auto">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-200 border border-indigo-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    {showDeleteConfirm === project.id ? (
                      <>
                        <span className="flex items-center mr-2 text-sm text-gray-400">
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
                          onClick={() => confirmDelete(project.id)}
                        >
                          Eliminar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => handleEdit(project)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => handleDeleteClick(project.id)}
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 mb-4">
              No hay proyectos guardados. ¡Crea tu primer proyecto!
            </p>
            <Button 
              onClick={handleAddNew}
              icon={<Plus className="w-5 h-5" />}
            >
              Nuevo Proyecto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;