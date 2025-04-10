"use client";

import React from 'react';

const TimeEntryCard = ({ entry, projectName, taskName, formatDuration, onEdit, onDelete }) => {
  return (
    <div className="timetracking-card">
      <div className="timeentry-info">
        <div className="timeentry-header">
          <h3 className="timeentry-title">{taskName}</h3>
          <span className="project-tag">{projectName}</span>
        </div>
        
        <p className="timeentry-desc">{entry.description}</p>
        
        <div className="timeentry-meta">
          <div className="meta-item">
            <span className="meta-icon">👤</span>
            {entry.user_name}
          </div>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            {new Date(entry.entry_date).toLocaleDateString('tr-TR')}
          </div>
          <div className="meta-item">
            <span className="meta-icon">⏱️</span>
            {formatDuration(entry.duration)}
          </div>
        </div>
      </div>
      
      <div className="timeentry-actions">
        <button 
          className="action-btn edit"
          onClick={() => onEdit(entry)}
        >
          ✏️
        </button>
        <button 
          className="action-btn delete"
          onClick={() => onDelete(entry.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TimeEntryCard; 