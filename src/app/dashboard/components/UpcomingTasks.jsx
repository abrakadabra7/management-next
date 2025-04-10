"use client";

import React from 'react';

const UpcomingTasks = ({ upcomingTasks }) => {
  return (
    <div className="dashboard-card">
      <h3>Yaklaşan Görevler</h3>
      {upcomingTasks.length > 0 ? (
        <ul className="task-list">
          {upcomingTasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-name">{task.title}</div>
              <div className="task-due-date">
                {new Date(task.due_date).toLocaleDateString('tr-TR')}
              </div>
              <div className={`task-status status-${task.status}`}>
                {task.status === 'todo' && 'Yapılacak'}
                {task.status === 'inprogress' && 'Devam Ediyor'}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">Yaklaşan görev bulunmuyor.</p>
      )}
    </div>
  );
};

export default UpcomingTasks; 