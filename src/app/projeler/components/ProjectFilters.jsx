"use client";

import React from 'react';

const ProjectFilters = ({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) => {
  return (
    <div className="search-filter">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Proje ara..." 
          className="search-input" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter">
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tüm Projeler</option>
          <option value="active">Aktif</option>
          <option value="completed">Tamamlanan</option>
          <option value="pending">Beklemede</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectFilters; 