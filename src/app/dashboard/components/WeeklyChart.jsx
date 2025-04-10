"use client";

import React from 'react';

const WeeklyChart = ({ weeklyHours }) => {
  return (
    <div className="dashboard-card">
      <h3>Haftalık Çalışma Saatleri</h3>
      <div className="chart-container">
        <div className="weekly-chart">
          {weeklyHours.map((hours, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${Math.min(100, (hours / Math.max(...weeklyHours, 0.1)) * 100)}%` 
                }}
              ></div>
              <div className="chart-label">
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][index]}
              </div>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div>Toplam: {weeklyHours.reduce((sum, h) => sum + h, 0).toFixed(1)} saat</div>
          <div>Günlük Ort: {(weeklyHours.reduce((sum, h) => sum + h, 0) / 7).toFixed(1)} saat</div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart; 