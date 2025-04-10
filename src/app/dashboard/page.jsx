"use client";

import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StatCards from './components/StatCards';
import UpcomingTasks from './components/UpcomingTasks';
import RecentTasks from './components/RecentTasks';
import TopProjects from './components/TopProjects';
import WeeklyChart from './components/WeeklyChart';
import useProjects from '../../hooks/useProjects';
import useTasks from '../../hooks/useTasks';
import useTimeEntries from '../../hooks/useTimeEntries';
import './dashboard.css';

export default function Dashboard() {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { timeEntries } = useTimeEntries();
  
  // Duruma göre proje sayıları
  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    pending: projects.filter(p => p.status === 'pending').length
  };
  
  // Duruma göre görev sayıları
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'inprogress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };
  
  // Zaman istatistikleri
  const timeStats = {
    totalHours: timeEntries.reduce((total, entry) => total + entry.duration, 0) / 60, // Dakikadan saate çevirme
    entriesCount: timeEntries.length
  };
  
  // Yaklaşan görevler (bitiş tarihi bu hafta olanlar)
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingTasks = tasks
    .filter(task => {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      return dueDate >= today && dueDate <= nextWeek && task.status !== 'completed';
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  
  // En çok çalışılan projeler
  const projectTimeMap = {};
  timeEntries.forEach(entry => {
    if (!projectTimeMap[entry.project_id]) {
      projectTimeMap[entry.project_id] = 0;
    }
    projectTimeMap[entry.project_id] += entry.duration;
  });
  
  const topProjects = Object.keys(projectTimeMap)
    .map(projectId => ({
      project: projects.find(p => p.id === projectId) || { title: 'Bilinmeyen Proje' },
      time: projectTimeMap[projectId]
    }))
    .sort((a, b) => b.time - a.time)
    .slice(0, 5); // En çok zaman harcanan 5 proje
  
  // Son eklenen görevler
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);
    
  // Haftanın günlerine göre çalışma saatleri
  const [weeklyHours, setWeeklyHours] = useState([0, 0, 0, 0, 0, 0, 0]); // Pzt, Sal, Çar, Per, Cum, Cmt, Paz
  
  useEffect(() => {
    const days = [0, 0, 0, 0, 0, 0, 0];
    
    timeEntries.forEach(entry => {
      const entryDate = new Date(entry.entry_date);
      const dayIndex = entryDate.getDay(); // 0: Pazar, 1: Pazartesi, ...
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // 0: Pazartesi, 6: Pazar
      days[adjustedIndex] += entry.duration / 60; // Dakikadan saate çevirme
    });
    
    setWeeklyHours(days);
  }, [timeEntries]);
  
  // Süreyi formatla
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}d`;
  };
  
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <StatCards 
        projectStats={projectStats}
        taskStats={taskStats}
        timeStats={timeStats}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-column">
          <UpcomingTasks upcomingTasks={upcomingTasks} />
          <RecentTasks recentTasks={recentTasks} />
        </div>
        
        <div className="dashboard-column">
          <TopProjects 
            topProjects={topProjects} 
            formatDuration={formatDuration} 
          />
          <WeeklyChart weeklyHours={weeklyHours} />
        </div>
      </div>
    </div>
  );
} 