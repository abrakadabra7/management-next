"use client";

import React from 'react';

const TimeFilters = ({ 
  projects, 
  userOptions, 
  filterProject, 
  setFilterProject, 
  filterUser, 
  setFilterUser, 
  filterDateFrom, 
  setFilterDateFrom, 
  filterDateTo, 
  setFilterDateTo 
}) => {
  return (
    <div className="filters">
      <div className="filters-row">
        <div className="filter-group">
          <label className="filter-label">Proje</label>
          <select 
            className="filter-select" 
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">Tüm Projeler</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Çalışan</label>
          <select 
            className="filter-select"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          >
            <option value="">Tüm Çalışanlar</option>
            {userOptions.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Başlangıç Tarihi</label>
          <input
            type="date"
            className="filter-input"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Bitiş Tarihi</label>
          <input
            type="date"
            className="filter-input"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeFilters; 