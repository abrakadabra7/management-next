"use client";

import React, { useState, useEffect } from 'react';
import './TimeEntryModal.css';

const TimeEntryModal = ({ isOpen, onClose, timeEntry, projects, tasks, mode }) => {
  const [formData, setFormData] = useState({
    task: '',
    project: '',
    description: '',
    duration: 60, // dakika cinsinden
    date: '',
    user: ''
  });

  // Proje seçildiğinde o projeye ait görevleri filtreleme
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    // Eğer düzenleme modundaysa ve zaman kaydı verileri varsa
    if (mode === 'edit' && timeEntry) {
      setFormData({
        task: timeEntry.task || '',
        project: timeEntry.project || '',
        description: timeEntry.description || '',
        duration: timeEntry.duration || 60,
        date: timeEntry.date || '',
        user: timeEntry.user || ''
      });
    } else {
      // Yeni zaman kaydı oluşturma modunda varsayılan değerleri ayarla
      setFormData({
        task: tasks && tasks.length > 0 ? tasks[0] : '',
        project: projects && projects.length > 0 ? projects[0] : '',
        description: '',
        duration: 60,
        date: new Date().toISOString().split('T')[0],
        user: ''
      });
    }
  }, [timeEntry, mode, projects, tasks, isOpen]);

  useEffect(() => {
    // Proje değiştiğinde görevleri filtrele
    if (tasks && formData.project) {
      const filtered = tasks.filter(task => task.project === formData.project);
      setProjectTasks(filtered);

      // Eğer seçili görev bu projeye ait değilse, ilk görevi seç
      if (filtered.length > 0 && !filtered.find(t => t.title === formData.task)) {
        setFormData(prev => ({
          ...prev,
          task: filtered[0].title
        }));
      }
    }
  }, [formData.project, tasks]);

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
              <label htmlFor="project" className="form-label">Proje</label>
              <select
                id="project"
                name="project"
                className="form-select"
                value={formData.project}
                onChange={handleChange}
                required
              >
                {projects && projects.map((project, index) => (
                  <option key={index} value={project}>{project}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="task" className="form-label">Görev</label>
              <select
                id="task"
                name="task"
                className="form-select"
                value={formData.task}
                onChange={handleChange}
                required
              >
                {tasks && tasks
                  .filter(task => !formData.project || task.project === formData.project)
                  .map((task, index) => (
                    <option key={index} value={task.title}>{task.title}</option>
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
                <label htmlFor="date" className="form-label">Tarih</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="user" className="form-label">Çalışan</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  className="form-input"
                  value={formData.user}
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