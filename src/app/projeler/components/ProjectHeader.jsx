"use client";

import React from 'react';

const ProjectHeader = ({ onAddProject }) => {
  return (
    <div className="header">
      <h1 className="title">Projeler</h1>
      <button className="add-button" onClick={onAddProject}>
        <span className="add-icon">+</span>
        Yeni Proje
      </button>
    </div>
  );
};

export default ProjectHeader; 