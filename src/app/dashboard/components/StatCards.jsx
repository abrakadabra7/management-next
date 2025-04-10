"use client";

import React from 'react';

const StatCards = ({ projectStats, taskStats, timeStats }) => {
  return (
    <div className="stat-cards">
      <div className="stat-card">
        <h3>Projeler</h3>
        <div className="stat-value">{projectStats.total}</div>
        <div className="stat-details">
          <div className="stat-detail">
            <span className="label">Aktif:</span>
            <span className="value">{projectStats.active}</span>
          </div>
          <div className="stat-detail">
            <span className="label">Tamamlanan:</span>
            <span className="value">{projectStats.completed}</span>
          </div>
          <div className="stat-detail">
            <span className="label">Beklemede:</span>
            <span className="value">{projectStats.pending}</span>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <h3>Görevler</h3>
        <div className="stat-value">{taskStats.total}</div>
        <div className="stat-details">
          <div className="stat-detail">
            <span className="label">Yapılacak:</span>
            <span className="value">{taskStats.todo}</span>
          </div>
          <div className="stat-detail">
            <span className="label">Devam Eden:</span>
            <span className="value">{taskStats.inProgress}</span>
          </div>
          <div className="stat-detail">
            <span className="label">Tamamlanan:</span>
            <span className="value">{taskStats.completed}</span>
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <h3>Zaman Takibi</h3>
        <div className="stat-value">{timeStats.totalHours.toFixed(1)} saat</div>
        <div className="stat-details">
          <div className="stat-detail">
            <span className="label">Toplam Kayıt:</span>
            <span className="value">{timeStats.entriesCount}</span>
          </div>
          <div className="stat-detail">
            <span className="label">Verimlilik:</span>
            <span className="value">
              {taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards; 