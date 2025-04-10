"use client";

import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, filteredProjects, onEditProject, onDeleteProject }) => {
  return (
    <>
      {projects.length === 0 ? (
        <div className="no-projects">
          <p>Henüz proje bulunmuyor. "Yeni Proje" butonuna tıklayarak ilk projenizi oluşturabilirsiniz.</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>Aramanızla eşleşen proje bulunamadı.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectList; 