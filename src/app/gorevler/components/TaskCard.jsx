"use client";

import React from 'react';

const TaskCard = ({ task, projectName, onEdit, onDelete }) => {
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

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-info">
        <div className="task-header">
          {getPriorityIcon(task.priority)}
          <h3 className="task-title">{task.title}</h3>
          <span className="project-tag">{projectName}</span>
        </div>
        
        <p className="task-desc">{task.description}</p>
        
        <div className="task-meta">
          <div className="meta-item">
            <span className="meta-icon">👤</span>
            {task.assignee || 'Atanmamış'}
          </div>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            {task.due_date ? new Date(task.due_date).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        <div className={`task-status status-${task.status}`}>
          {getStatusText(task.status)}
        </div>
        <button 
          className="action-btn edit"
          onClick={() => onEdit(task)}
        >
          ✏️
        </button>
        <button 
          className="action-btn delete"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 