"use client";

import React, { useState, useEffect, useRef } from 'react';

const TimeTracker = ({ onSaveTimeEntry, projects, tasks }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [description, setDescription] = useState('');
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Başlat/Durdur fonksiyonu
  const toggleTimer = () => {
    if (isTracking) {
      // Durdur
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsTracking(false);
    } else {
      // Başlat
      startTimeRef.current = new Date();
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      setIsTracking(true);
    }
  };

  // Sıfırla fonksiyonu
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsTracking(false);
    setSeconds(0);
  };

  // Kaydet fonksiyonu
  const saveTimeEntry = () => {
    if (!selectedProject || !selectedTask) {
      alert('Lütfen proje ve görev seçin!');
      return;
    }

    const minutes = Math.ceil(seconds / 60); // Saniyeyi dakikaya çevirme
    const timeEntry = {
      project_id: selectedProject,
      task_id: selectedTask,
      description: description,
      duration: minutes,
      entry_date: new Date().toISOString().split('T')[0],
      user_name: 'Aktif Kullanıcı', // Bu kısmı gerçek kullanıcı bilgisine göre güncelle
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onSaveTimeEntry(timeEntry);
    resetTimer();
    setDescription('');
  };

  // Süreyi görsel olarak formatlama (saat:dakika:saniye)
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Filtrelenmiş görevler
  const filteredTasks = tasks.filter(task => 
    !selectedProject || task.project_id === selectedProject
  );

  return (
    <div className="time-tracker">
      <h2 className="tracker-title">Gerçek Zamanlı Takip</h2>
      
      <div className="tracker-timer">
        <div className="timer-display">{formatTime(seconds)}</div>
        
        <div className="tracker-controls">
          <button 
            className={`timer-button ${isTracking ? 'stop' : 'start'}`} 
            onClick={toggleTimer}
          >
            {isTracking ? 'Durdur' : 'Başlat'}
          </button>
          
          <button 
            className="timer-button reset" 
            onClick={resetTimer}
            disabled={seconds === 0}
          >
            Sıfırla
          </button>
        </div>
      </div>
      
      <div className="tracker-form">
        <div className="form-group">
          <label>Proje</label>
          <select 
            value={selectedProject} 
            onChange={e => setSelectedProject(e.target.value)}
          >
            <option value="">Proje Seçin</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Görev</label>
          <select 
            value={selectedTask} 
            onChange={e => setSelectedTask(e.target.value)}
            disabled={!selectedProject}
          >
            <option value="">Görev Seçin</option>
            {filteredTasks.map(task => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Ne üzerinde çalışıyorsunuz?"
          />
        </div>
        
        <button 
          className="save-button" 
          onClick={saveTimeEntry}
          disabled={seconds === 0 || !selectedProject || !selectedTask}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default TimeTracker; 