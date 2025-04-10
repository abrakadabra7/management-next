"use client";

import React from 'react';

const TimeSummary = ({ totalDuration, entryCount, projectCount, userCount, formatDuration }) => {
  return (
    <div className="summary-section">
      <h2 className="summary-title">Özet Bilgiler</h2>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-value">{formatDuration(totalDuration)}</div>
          <div className="summary-label">Toplam Süre</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-value">{entryCount}</div>
          <div className="summary-label">Toplam Kayıt</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-value">{projectCount}</div>
          <div className="summary-label">Proje Sayısı</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-value">{userCount}</div>
          <div className="summary-label">Çalışan Sayısı</div>
        </div>
      </div>
    </div>
  );
};

export default TimeSummary; 