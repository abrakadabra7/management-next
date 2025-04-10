"use client";

import React, { useState, useEffect } from 'react';
import './TimeEntryModal.css';

const TimeEntryModal = ({ isOpen, onClose, timeEntry, projects, tasks, mode }) => {
  const [formData, setFormData] = useState({
    task_id: '',
    project_id: '',
    description: '',
    duration: 60, // dakika cinsinden
    entry_date: '',
    user_name: ''
  });

  // Proje seçildiğinde o projeye ait görevleri filtreleme
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    // Eğer düzenleme modundaysa ve zaman kaydı verileri varsa
    if (mode === 'edit' && timeEntry) {
      setFormData({
        task_id: timeEntry.task_id || '',
        project_id: timeEntry.project_id || '',
        description: timeEntry.description || '',
        duration: timeEntry.duration || 60,
        entry_date: timeEntry.entry_date || '',
        user_name: timeEntry.user_name || ''
      });
    } else {
      // Yeni zaman kaydı oluşturma modunda varsayılan değerleri ayarla
      setFormData({
        task_id: tasks && tasks.length > 0 ? tasks[0].id : '',
        project_id: projects && projects.length > 0 ? projects[0].id : '',
        description: '',
        duration: 60,
        entry_date: new Date().toISOString().split('T')[0],
        user_name: ''
      });
    }
  }, [timeEntry, mode, projects, tasks, isOpen]);

  useEffect(() => {
    // Proje değiştiğinde görevleri filtrele
    if (tasks && formData.project_id) {
      const filtered = tasks.filter(task => task.project_id === formData.project_id);
      setProjectTasks(filtered);

      // Eğer seçili görev bu projeye ait değilse, ilk görevi seç
      if (filtered.length > 0 && !filtered.find(t => t.id === formData.task_id)) {
        setFormData(prev => ({
          ...prev,
          task_id: filtered[0].id
        }));
      }
    }
  }, [formData.project_id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form verilerini ana bileşene iletme
    onClose(formData);
  };

  const handleCancel = () => {
    // Modalı kapatma
    onClose(null);
  };

  // Saat ve dakika değerlerini ayarlama
  const hours = Math.floor(formData.duration / 60);
  const minutes = formData.duration % 60;

  const handleHoursChange = (e) => {
    const newHours = parseInt(e.target.value, 10) || 0;
    setFormData(prev => ({
      ...prev,
      duration: (newHours * 60) + minutes
    }));
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value, 10) || 0;
    setFormData(prev => ({
      ...prev,
      duration: (hours * 60) + newMinutes
    }));
  };

  // Görev ve proje bilgilerini göstermek için yardımcı fonksiyonlar
  const getTaskName = (taskId) => {
    const task = tasks?.find(t => t.id === taskId);
    return task ? task.title : '';
  };

  const getProjectName = (projectId) => {
    const project = projects?.find(p => p.id === projectId);
    return project ? project.title : '';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? 'Zaman Kaydını Düzenle' : 'Yeni Zaman Kaydı Oluştur'}
          </h2>
          <button className="close-button" onClick={handleCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="project_id" className="form-label">Proje</label>
              <select
                id="project_id"
                name="project_id"
                className="form-select"
                value={formData.project_id}
                onChange={handleChange}
                required
              >
                {projects && projects.map(project => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="task_id" className="form-label">Görev</label>
              <select
                id="task_id"
                name="task_id"
                className="form-select"
                value={formData.task_id}
                onChange={handleChange}
                required
              >
                {tasks && tasks
                  .filter(task => !formData.project_id || task.project_id === formData.project_id)
                  .map(task => (
                    <option key={task.id} value={task.id}>{task.title}</option>
                  ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Açıklama</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Yapılan işin açıklaması"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="entry_date" className="form-label">Tarih</label>
                <input
                  type="date"
                  id="entry_date"
                  name="entry_date"
                  className="form-input"
                  value={formData.entry_date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="user_name" className="form-label">Çalışan</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  className="form-input"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Çalışanın adı"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Süre</label>
              <div className="duration-inputs">
                <div className="duration-input-group">
                  <input
                    type="number"
                    min="0"
                    className="form-input duration-input"
                    value={hours}
                    onChange={handleHoursChange}
                  />
                  <span className="duration-label">Saat</span>
                </div>
                <div className="duration-input-group">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    className="form-input duration-input"
                    value={minutes}
                    onChange={handleMinutesChange}
                  />
                  <span className="duration-label">Dakika</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={handleCancel}>
              İptal
            </button>
            <button type="submit" className="btn btn-save">
              {mode === 'edit' ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeEntryModal; 