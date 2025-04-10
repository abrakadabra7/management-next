"use client";

import React, { useState, useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, project, mode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    endDate: '',
  });

  useEffect(() => {
    // Eğer düzenleme modundaysa ve proje verileri varsa
    if (mode === 'edit' && project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'active',
        endDate: project.endDate || '',
      });
    } else {
      // Yeni proje oluşturma modunda varsayılan değerleri ayarla
      setFormData({
        title: '',
        description: '',
        status: 'active',
        endDate: '',
      });
    }
  }, [project, mode, isOpen]);

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
            {mode === 'edit' ? 'Projeyi Düzenle' : 'Yeni Proje Oluştur'}
          </h2>
          <button className="close-button" onClick={handleCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Proje Adı</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="Proje adını girin"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">Proje Açıklaması</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Proje detaylarını girin"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="status" className="form-label">Durum</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Aktif</option>
                <option value="pending">Beklemede</option>
                <option value="completed">Tamamlandı</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">Bitiş Tarihi</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="form-input"
                value={formData.endDate}
                onChange={handleChange}
              />
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

export default ProjectModal; 