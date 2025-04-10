"use client";

import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="project-card">
      <div className="project-header">
        <div className={`status-badge ${project.status}`}>
          {project.status === 'active' && 'Aktif'}
          {project.status === 'pending' && 'Beklemede'}
          {project.status === 'completed' && 'Tamamlandı'}
        </div>
        <div className="project-actions">
          <button 
            className="action-btn edit" 
            onClick={() => onEdit(project)}
          >
            ✏️
          </button>
          <button 
            className="action-btn delete"
            onClick={() => onDelete(project.id)}
          >
            🗑️
          </button>
        </div>
      </div>
      <h2 className="project-title">{project.title}</h2>
      <p className="project-desc">{project.description}</p>
      <div className="project-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span className="meta-text">
            Bitiş: {project.end_date ? new Date(project.end_date).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          <span className="meta-text">
            {new Date(project.created_at).toLocaleDateString('tr-TR')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 