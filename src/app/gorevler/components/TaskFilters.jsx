"use client";

import React from 'react';

const TaskFilters = ({ 
  projects, 
  filterProject, 
  setFilterProject, 
  filterStatus, 
  setFilterStatus, 
  filterPriority, 
  setFilterPriority, 
  searchQuery, 
  setSearchQuery 
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
          <label className="filter-label">Durum</label>
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tüm Durumlar</option>
            <option value="todo">Yapılacak</option>
            <option value="inprogress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Öncelik</label>
          <select 
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Tüm Öncelikler</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Arama</label>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Görev ara..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters; 