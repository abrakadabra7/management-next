"use client";

import React, { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, task, projects, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignee: ''
  });

  useEffect(() => {
    // Eğer düzenleme modundaysa ve görev verileri varsa
    if (mode === 'edit' && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        project: task.project_id || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.due_date || '',
        assignee: task.assignee || ''
      });
    } else {
      // Yeni görev oluşturma modunda varsayılan değerleri ayarla
      setFormData({
        title: '',
        description: '',
        project: projects && projects.length > 0 ? projects[0].id : '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        assignee: ''
      });
    }
  }, [task, mode, projects, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
          </h2>
          <button className="close-button" onClick={handleCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Görev Adı</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Görev adını girin"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Görev Açıklaması</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Görev detaylarını girin"
              />
            </div>
            
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
                {projects && projects.map((project) => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))}
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="status" className="form-label">Durum</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="todo">Yapılacak</option>
                  <option value="inprogress">Devam Ediyor</option>
                  <option value="completed">Tamamlandı</option>
                </select>
              </div>
              
              <div className="form-group half">
                <label htmlFor="priority" className="form-label">Öncelik</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="dueDate" className="form-label">Bitiş Tarihi</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="assignee" className="form-label">Atanan Kişi</label>
                <input
                  type="text"
                  id="assignee"
                  name="assignee"
                  className="form-input"
                  value={formData.assignee}
                  onChange={handleChange}
                  placeholder="Atanan kişinin adı"
                />
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

export default TaskModal; 