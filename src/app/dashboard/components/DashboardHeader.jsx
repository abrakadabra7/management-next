"use client";

import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h1>Dashboard</h1>
      <p className="last-update">Son güncelleme: {new Date().toLocaleString('tr-TR')}</p>
    </div>
  );
};

export default DashboardHeader; 