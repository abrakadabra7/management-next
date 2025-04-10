"use client";

import React from 'react';

const TopProjects = ({ topProjects, formatDuration }) => {
  return (
    <div className="dashboard-card">
      <h3>En Çok Çalışılan Projeler</h3>
      {topProjects.length > 0 ? (
        <ul className="project-list">
          {topProjects.map((item, index) => (
            <li key={index} className="project-item">
              <div className="project-name">{item.project.title}</div>
              <div className="project-time">{formatDuration(item.time)}</div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ 
                    width: `${Math.min(100, (item.time / topProjects[0].time) * 100)}%` 
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">Henüz zaman kaydı yok.</p>
      )}
    </div>
  );
};

export default TopProjects; 