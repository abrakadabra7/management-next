"use client";

import React, { useState } from 'react';
import ProjectHeader from './projeler/components/ProjectHeader';
import ProjectFilters from './projeler/components/ProjectFilters';
import ProjectList from './projeler/components/ProjectList';
import ProjectModal from '../components/modals/ProjectModal';
import useProjects from '../hooks/useProjects';
import './page.css';

export default function Home() {
  const { projects, loading, error, addProject, editProject, removeProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Filtreleme ve arama için state'ler
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filtrelenmiş projeleri hesapla
  const filteredProjects = projects.filter(project => {
    // Duruma göre filtrele
    const statusMatch = filterStatus === 'all' || project.status === filterStatus;
    
    // Arama sorgusuna göre filtrele
    const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  const openAddModal = () => {
    setModalMode('add');
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setModalMode('edit');
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = async (formData) => {
    setIsModalOpen(false);
    
    if (formData) {
      try {
        if (modalMode === 'add') {
          await addProject({
            title: formData.title,
            description: formData.description,
            status: formData.status,
            end_date: formData.endDate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        } else if (modalMode === 'edit' && selectedProject) {
          await editProject(selectedProject.id, {
            title: formData.title,
            description: formData.description,
            status: formData.status,
            end_date: formData.endDate
          });
        }
      } catch (err) {
        console.error('İşlem sırasında hata oluştu:', err);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        await removeProject(projectId);
      } catch (err) {
        console.error('Proje silinirken hata oluştu:', err);
      }
    }
  };

  if (loading && projects.length === 0) {
    return <div className="loading">Projeler yükleniyor...</div>;
  }

  if (error && projects.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="projects-page">
      <ProjectHeader onAddProject={openAddModal} />
      
      <ProjectFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      
      <ProjectList 
        projects={projects}
        filteredProjects={filteredProjects}
        onEditProject={openEditModal}
        onDeleteProject={handleDeleteProject}
      />

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        project={selectedProject}
        mode={modalMode}
      />
    </div>
  );
} 