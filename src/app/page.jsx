"use client";

import React, { useState } from 'react';
import ProjectModal from '../components/ProjectModal';
import './page.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' veya 'edit'
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleCloseModal = (formData) => {
    setIsModalOpen(false);
    
    if (formData) {
      console.log('Form verileri:', formData);
      // Burada formData'yı kullanarak proje ekleyebilir veya güncelleyebilirsiniz
      // İlerleyen aşamalarda Supabase'e bağlanacağız
    }
  };

  // Örnek projeler - ileride Supabase'den gelecek
  const projects = [
    {
      id: 1,
      title: 'Web Sitesi Tasarımı',
      description: 'Şirket web sitesinin yeniden tasarlanması ve responsive hale getirilmesi',
      status: 'active',
      endDate: '2025-05-15',
      tasksCompleted: 5,
      totalTasks: 12
    },
    {
      id: 2,
      title: 'Mobil Uygulama Geliştirme',
      description: 'Müşteri portalının mobil uygulamasının geliştirilmesi',
      status: 'pending',
      endDate: '2025-06-30',
      tasksCompleted: 2,
      totalTasks: 18
    },
    {
      id: 3,
      title: 'SEO Optimizasyonu',
      description: 'Mevcut web sitesi için SEO çalışması ve içerik stratejisi',
      status: 'completed',
      endDate: '2025-04-10',
      tasksCompleted: 8,
      totalTasks: 8
    },
    {
      id: 4,
      title: 'Veritabanı Migrasyonu',
      description: 'Legacy sistemlerden yeni veritabanı migrasyonu ve optimizasyon',
      status: 'active',
      endDate: '2025-05-22',
      tasksCompleted: 3,
      totalTasks: 10
    }
  ];

  return (
    <div className="projects-page">
      <div className="header">
        <h1 className="title">Projeler</h1>
        <button className="add-button" onClick={openAddModal}>
          <span className="add-icon">+</span>
          Yeni Proje
        </button>
      </div>

      <div className="search-filter">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Proje ara..." className="search-input" />
        </div>
        <div className="filter">
          <select className="filter-select">
            <option value="all">Tüm Projeler</option>
            <option value="active">Aktif</option>
            <option value="completed">Tamamlanan</option>
            <option value="pending">Beklemede</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <div className={`status-badge ${project.status}`}>
                {project.status === 'active' && 'Aktif'}
                {project.status === 'pending' && 'Beklemede'}
                {project.status === 'completed' && 'Tamamlandı'}
              </div>
              <div className="project-actions">
                <button 
                  className="action-btn edit" 
                  onClick={() => openEditModal(project)}
                >
                  ✏️
                </button>
                <button className="action-btn delete">🗑️</button>
              </div>
            </div>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>
            <div className="project-meta">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">
                  Bitiş: {new Date(project.endDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">✓</span>
                <span className="meta-text">
                  {project.tasksCompleted}/{project.totalTasks} görev
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        project={selectedProject}
        mode={modalMode}
      />
    </div>
  );
} 