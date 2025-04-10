"use client";

import React, { useState } from 'react';
import TimeHeader from './components/TimeHeader';
import TimeSummary from './components/TimeSummary';
import TimeFilters from './components/TimeFilters';
import TimeEntryList from './components/TimeEntryList';
import TimeTracker from './components/TimeTracker';
import TimeEntryModal from '../../components/modals/TimeEntryModal';
import useTimeEntries from '../../hooks/useTimeEntries';
import useProjects from '../../hooks/useProjects';
import useTasks from '../../hooks/useTasks';
import './timetracking.css';

export default function ZamanTakibi() {
  const { timeEntries, loading, error, addTimeEntry, editTimeEntry, removeTimeEntry } = useTimeEntries();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  
  const [filterProject, setFilterProject] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeEntry, setSelectedTimeEntry] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  
  // Filtreleme işlevi
  const filteredEntries = timeEntries.filter(entry => {
    return (
      (filterProject === '' || entry.project_id === filterProject) &&
      (filterUser === '' || entry.user_name === filterUser) &&
      (filterDateFrom === '' || new Date(entry.entry_date) >= new Date(filterDateFrom)) &&
      (filterDateTo === '' || new Date(entry.entry_date) <= new Date(filterDateTo))
    );
  });
  
  // Unique proje ve kullanıcı listeleri
  const userOptions = [...new Set(timeEntries.map(entry => entry.user_name))];
  
  // Süreyi biçimlendirme (180 dakika -> 3s 0d)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}d`;
  };
  
  // Toplam süreyi hesaplama
  const totalDuration = filteredEntries.reduce((total, entry) => total + entry.duration, 0);
  
  // Proje bazında süreleri hesaplama
  const projectTotals = filteredEntries.reduce((totals, entry) => {
    if (!totals[entry.project_id]) {
      totals[entry.project_id] = 0;
    }
    totals[entry.project_id] += entry.duration;
    return totals;
  }, {});
  
  // Kullanıcı bazında süreleri hesaplama
  const userTotals = filteredEntries.reduce((totals, entry) => {
    if (!totals[entry.user_name]) {
      totals[entry.user_name] = 0;
    }
    totals[entry.user_name] += entry.duration;
    return totals;
  }, {});

  const openAddModal = () => {
    setModalMode('add');
    setSelectedTimeEntry(null);
    setIsModalOpen(true);
  };

  const openEditModal = (timeEntry) => {
    setModalMode('edit');
    setSelectedTimeEntry(timeEntry);
    setIsModalOpen(true);
  };

  const handleCloseModal = async (formData) => {
    setIsModalOpen(false);
    
    if (!formData) return; // Eğer form verileri yoksa (iptal edildi), işlem yapma
    
    try {
      if (modalMode === 'add') {
        // Yeni zaman kaydı ekleme
        await addTimeEntry({
          task_id: formData.task_id,
          project_id: formData.project_id,
          description: formData.description,
          duration: formData.duration,
          entry_date: formData.entry_date,
          user_name: formData.user_name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } else if (modalMode === 'edit' && selectedTimeEntry) {
        // Mevcut zaman kaydını güncelleme
        await editTimeEntry(selectedTimeEntry.id, {
          task_id: formData.task_id,
          project_id: formData.project_id,
          description: formData.description,
          duration: formData.duration,
          entry_date: formData.entry_date,
          user_name: formData.user_name
        });
      }
    } catch (err) {
      console.error('İşlem sırasında hata oluştu:', err);
    }
  };

  const handleDeleteTimeEntry = async (timeEntryId) => {
    if (window.confirm('Bu zaman kaydını silmek istediğinize emin misiniz?')) {
      try {
        await removeTimeEntry(timeEntryId);
      } catch (err) {
        console.error('Zaman kaydı silinirken hata oluştu:', err);
      }
    }
  };

  // Proje adını ID'ye göre bul
  const getProjectName = (projectId) => {
    if (!projectId) return 'Belirtilmemiş';
    const project = projects.find(p => p.id === projectId);
    return project ? project.title : 'Bilinmeyen Proje';
  };

  // Görev adını ID'ye göre bul
  const getTaskName = (taskId) => {
    if (!taskId) return 'Belirtilmemiş';
    const task = tasks.find(t => t.id === taskId);
    return task ? task.title : 'Bilinmeyen Görev';
  };

  const handleSaveTimeEntry = (timeEntryData) => {
    addTimeEntry(timeEntryData);
  };

  if (loading && timeEntries.length === 0) {
    return <div className="loading">Zaman kayıtları yükleniyor...</div>;
  }

  if (error && timeEntries.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="timetracking-page">
      <TimeHeader onAddTimeEntry={openAddModal} />
      
      <TimeTracker 
        onSaveTimeEntry={handleSaveTimeEntry}
        projects={projects}
        tasks={tasks}
      />
      
      <TimeSummary 
        totalDuration={totalDuration}
        entryCount={filteredEntries.length}
        projectCount={projects.length}
        userCount={userOptions.length}
        formatDuration={formatDuration}
      />
      
      <TimeFilters 
        projects={projects}
        userOptions={userOptions}
        filterProject={filterProject}
        setFilterProject={setFilterProject}
        filterUser={filterUser}
        setFilterUser={setFilterUser}
        filterDateFrom={filterDateFrom}
        setFilterDateFrom={setFilterDateFrom}
        filterDateTo={filterDateTo}
        setFilterDateTo={setFilterDateTo}
      />
      
      <TimeEntryList 
        timeEntries={timeEntries}
        filteredEntries={filteredEntries}
        getProjectName={getProjectName}
        getTaskName={getTaskName}
        formatDuration={formatDuration}
        onEditTimeEntry={openEditModal}
        onDeleteTimeEntry={handleDeleteTimeEntry}
      />

      <TimeEntryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        timeEntry={selectedTimeEntry}
        projects={projects.map(p => ({ id: p.id, title: p.title }))}
        tasks={tasks.map(t => ({ id: t.id, title: t.title, project_id: t.project_id }))}
        mode={modalMode}
      />
    </div>
  );
} 