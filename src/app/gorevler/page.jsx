"use client";

import React, { useState } from 'react';
import TaskModal from '../../components/TaskModal';
import './tasks.css';

export default function Gorevler() {
  // Örnek görev verileri - ileride Supabase'den gelecek
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Ana Sayfa Tasarımı',
      description: 'Web sitesi için ana sayfa tasarımının yapılması',
      project: 'Web Sitesi Tasarımı',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-04-15',
      assignee: 'Ahmet Yılmaz'
    },
    {
      id: 2,
      title: 'Veri Modelinin Oluşturulması',
      description: 'Veritabanı şemasının tasarlanması ve ilişkilerin belirlenmesi',
      project: 'Veritabanı Migrasyonu',
      status: 'inprogress',
      priority: 'high',
      dueDate: '2025-04-22',
      assignee: 'Mehmet Demir'
    },
    {
      id: 3,
      title: 'API Endpoint Tasarımı',
      description: 'RESTful API için endpoint tasarımı ve dökümantasyonu',
      project: 'Mobil Uygulama Geliştirme',
      status: 'todo',
      priority: 'medium',
      dueDate: '2025-05-10',
      assignee: 'Zeynep Kaya'
    },
    {
      id: 4,
      title: 'Kullanıcı Arayüzü İyileştirmeleri',
      description: 'Formların ve bildirim sisteminin kullanılabilirliğinin artırılması',
      project: 'Web Sitesi Tasarımı',
      status: 'inprogress',
      priority: 'medium',
      dueDate: '2025-04-28',
      assignee: 'Ayşe Yıldız'
    },
    {
      id: 5,
      title: 'Anahtar Kelime Analizi',
      description: 'Hedef anahtar kelimelerin belirlenmesi ve içerik planı',
      project: 'SEO Optimizasyonu',
      status: 'completed',
      priority: 'low',
      dueDate: '2025-04-05',
      assignee: 'Ali Kara'
    }
  ]);
  
  const [filterProject, setFilterProject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  
  // Filtreleme işlevi
  const filteredTasks = tasks.filter(task => {
    return (
      (filterProject === '' || task.project === filterProject) &&
      (filterStatus === '' || task.status === filterStatus) &&
      (filterPriority === '' || task.priority === filterPriority) &&
      (searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
  // Unique proje isimlerini al
  const projectOptions = [...new Set(tasks.map(task => task.project))];
  
  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <span className="priority-flag priority-high">🔴</span>;
    if (priority === 'medium') return <span className="priority-flag priority-medium">🟠</span>;
    if (priority === 'low') return <span className="priority-flag priority-low">⚪</span>;
  };
  
  const getStatusText = (status) => {
    if (status === 'todo') return 'Yapılacak';
    if (status === 'inprogress') return 'Devam Ediyor';
    if (status === 'completed') return 'Tamamlandı';
  };

  const openAddModal = () => {
    setModalMode('add');
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setModalMode('edit');
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = (formData) => {
    setIsModalOpen(false);
    
    if (!formData) return; // Eğer form verileri yoksa (iptal edildi), işlem yapma
    
    if (modalMode === 'add') {
      // Yeni görev ekleme
      const newTask = {
        id: Math.max(0, ...tasks.map(t => t.id)) + 1, // Yeni ID oluşturma
        ...formData
      };
      setTasks([...tasks, newTask]);
    } else {
      // Mevcut görevi güncelleme
      const updatedTasks = tasks.map(task => 
        task.id === selectedTask.id ? { ...task, ...formData } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Bu görevi silmek istediğinize emin misiniz?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="tasks-page">
      <div className="header">
        <h1 className="title">Görevler</h1>
        <button className="add-button" onClick={openAddModal}>
          <span className="add-icon">+</span>
          Yeni Görev
        </button>
      </div>

      <div className="filters">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Proje</label>
            <select 
              className="filter-select" 
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
            >
              <option value="">Tüm Projeler</option>
              {projectOptions.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Durum</label>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tüm Durumlar</option>
              <option value="todo">Yapılacak</option>
              <option value="inprogress">Devam Ediyor</option>
              <option value="completed">Tamamlandı</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Öncelik</label>
            <select 
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">Tüm Öncelikler</option>
              <option value="high">Yüksek</option>
              <option value="medium">Orta</option>
              <option value="low">Düşük</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Arama</label>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Görev ara..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div key={task.id} className={`task-card ${task.status}`}>
            <div className="task-info">
              <div className="task-header">
                {getPriorityIcon(task.priority)}
                <h3 className="task-title">{task.title}</h3>
                <span className="project-tag">{task.project}</span>
              </div>
              
              <p className="task-desc">{task.description}</p>
              
              <div className="task-meta">
                <div className="meta-item">
                  <span className="meta-icon">👤</span>
                  {task.assignee}
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
            
            <div className="task-actions">
              <div className={`task-status status-${task.status}`}>
                {getStatusText(task.status)}
              </div>
              <button 
                className="action-btn edit"
                onClick={() => openEditModal(task)}
              >
                ✏️
              </button>
              <button 
                className="action-btn delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="no-tasks">
            <p>Bu kriterlere uyan görev bulunamadı.</p>
          </div>
        )}
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        projects={projectOptions}
        mode={modalMode}
      />
    </div>
  );
} 