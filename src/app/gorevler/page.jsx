"use client";

import React, { useState } from 'react';
import TaskHeader from './components/TaskHeader';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from '../../components/modals/TaskModal';
import useTasks from '../../hooks/useTasks';
import useProjects from '../../hooks/useProjects';
import './tasks.css';

export default function Gorevler() {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
  const { projects } = useProjects();
  
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
      (filterProject === '' || task.project_id === filterProject) &&
      (filterStatus === '' || task.status === filterStatus) &&
      (filterPriority === '' || task.priority === filterPriority) &&
      (searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

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

  const handleCloseModal = async (formData) => {
    setIsModalOpen(false);
    
    if (!formData) return; // Eğer form verileri yoksa (iptal edildi), işlem yapma
    
    try {
      if (modalMode === 'add') {
        // Yeni görev ekleme
        await addTask({
          title: formData.title,
          description: formData.description,
          project_id: formData.project,
          status: formData.status,
          priority: formData.priority,
          due_date: formData.dueDate,
          assignee: formData.assignee,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } else if (modalMode === 'edit' && selectedTask) {
        // Mevcut görevi güncelleme
        await editTask(selectedTask.id, {
          title: formData.title,
          description: formData.description,
          project_id: formData.project,
          status: formData.status,
          priority: formData.priority,
          due_date: formData.dueDate,
          assignee: formData.assignee
        });
      }
    } catch (err) {
      console.error('İşlem sırasında hata oluştu:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Bu görevi silmek istediğinize emin misiniz?')) {
      try {
        await removeTask(taskId);
      } catch (err) {
        console.error('Görev silinirken hata oluştu:', err);
      }
    }
  };

  if (loading && tasks.length === 0) {
    return <div className="loading">Görevler yükleniyor...</div>;
  }

  if (error && tasks.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="tasks-page">
      <TaskHeader onAddTask={openAddModal} />
      
      <TaskFilters 
        projects={projects}
        filterProject={filterProject}
        setFilterProject={setFilterProject}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <TaskList 
        tasks={filteredTasks}
        projects={projects}
        onEditTask={openEditModal}
        onDeleteTask={handleDeleteTask}
      />

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        task={selectedTask}
        projects={projects.map(p => ({ id: p.id, title: p.title }))}
        mode={modalMode}
      />
    </div>
  );
} 