"use client";

import React from 'react';

const TaskHeader = ({ onAddTask }) => {
  return (
    <div className="header">
      <h1 className="title">Görevler</h1>
      <button className="add-button" onClick={onAddTask}>
        <span className="add-icon">+</span>
        Yeni Görev
      </button>
    </div>
  );
};

export default TaskHeader; 