"use client";

import React from 'react';

const RecentTasks = ({ recentTasks }) => {
  return (
    <div className="dashboard-card">
      <h3>Son Eklenen Görevler</h3>
      {recentTasks.length > 0 ? (
        <ul className="task-list">
          {recentTasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-name">{task.title}</div>
              <div className="task-date">
                {new Date(task.created_at).toLocaleDateString('tr-TR')}
              </div>
              <div className={`task-status status-${task.status}`}>
                {task.status === 'todo' && 'Yapılacak'}
                {task.status === 'inprogress' && 'Devam Ediyor'}
                {task.status === 'completed' && 'Tamamlandı'}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">Henüz görev eklenmemiş.</p>
      )}
    </div>
  );
};

export default RecentTasks; 