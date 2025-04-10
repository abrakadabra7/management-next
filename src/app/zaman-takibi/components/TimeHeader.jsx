"use client";

import React from 'react';

const TimeHeader = ({ onAddTimeEntry }) => {
  return (
    <div className="header">
      <h1 className="title">Zaman Takibi</h1>
      <button className="add-button" onClick={onAddTimeEntry}>
        <span className="add-icon">+</span>
        Yeni Zaman Kaydı
      </button>
    </div>
  );
};

export default TimeHeader; 