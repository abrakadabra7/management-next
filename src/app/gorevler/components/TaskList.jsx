"use client";

import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, projects, onEditTask, onDeleteTask }) => {
  // Proje adını ID'ye göre bul
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.title : '';
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>Henüz görev bulunmuyor. "Yeni Görev" butonuna tıklayarak ilk görevinizi oluşturabilirsiniz.</p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              projectName={getProjectName(task.project_id)}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList; 