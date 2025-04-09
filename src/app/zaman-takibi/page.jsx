"use client";

import React, { useState } from 'react';
import TimeEntryModal from '../../components/TimeEntryModal';
import './timetracking.css';

export default function ZamanTakibi() {
  // Örnek görev verileri - sadece modal için
  const tasks = [
    { id: 1, title: 'Ana Sayfa Tasarımı', project: 'Web Sitesi Tasarımı' },
    { id: 2, title: 'Veri Modelinin Oluşturulması', project: 'Veritabanı Migrasyonu' },
    { id: 3, title: 'API Endpoint Tasarımı', project: 'Mobil Uygulama Geliştirme' },
    { id: 4, title: 'Kullanıcı Arayüzü İyileştirmeleri', project: 'Web Sitesi Tasarımı' },
    { id: 5, title: 'Anahtar Kelime Analizi', project: 'SEO Optimizasyonu' }
  ];

  // Örnek zaman kaydı verileri - ileride Supabase'den gelecek
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      task: 'Ana Sayfa Tasarımı',
      project: 'Web Sitesi Tasarımı',
      description: 'Ana sayfa taslağının hazırlanması ve komponent oluşturma',
      duration: 180, // dakika cinsinden
      date: '2025-04-10',
      user: 'Ahmet Yılmaz'
    },
    {
      id: 2,
      task: 'Veritabanı Şeması',
      project: 'Veritabanı Migrasyonu',
      description: 'Yeni veritabanı yapısının tasarlanması',
      duration: 120,
      date: '2025-04-12',
      user: 'Mehmet Demir'
    },
    {
      id: 3,
      task: 'API Endpoint Geliştirme',
      project: 'Mobil Uygulama Geliştirme',
      description: 'Kullanıcı yönetimi için API endpointlerinin oluşturulması',
      duration: 240,
      date: '2025-04-15',
      user: 'Zeynep Kaya'
    },
    {
      id: 4,
      task: 'Form Validasyonu',
      project: 'Web Sitesi Tasarımı',
      description: 'İletişim formlarının validasyon kurallarının geliştirilmesi',
      duration: 90,
      date: '2025-04-14',
      user: 'Ayşe Yıldız'
    },
    {
      id: 5,
      task: 'İçerik Analizi',
      project: 'SEO Optimizasyonu',
      description: 'Mevcut içeriklerin SEO açısından analiz edilmesi',
      duration: 150,
      date: '2025-04-11',
      user: 'Ali Kara'
    }
  ]);
  
  const [filterProject, setFilterProject] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeEntry, setSelectedTimeEntry] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  
  // Filtreleme işlevi
  const filteredEntries = timeEntries.filter(entry => {
    return (
      (filterProject === '' || entry.project === filterProject) &&
      (filterUser === '' || entry.user === filterUser) &&
      (filterDateFrom === '' || new Date(entry.date) >= new Date(filterDateFrom)) &&
      (filterDateTo === '' || new Date(entry.date) <= new Date(filterDateTo))
    );
  });
  
  // Unique proje ve kullanıcı listeleri
  const projectOptions = [...new Set(timeEntries.map(entry => entry.project))];
  const userOptions = [...new Set(timeEntries.map(entry => entry.user))];
  
  // Süreyi biçimlendirme (180 dakika -> 3s 0d)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}d`;
  };
  
  // Toplam süreyi hesaplama
  const totalDuration = filteredEntries.reduce((total, entry) => total + entry.duration, 0);
  
  // Proje bazında süreleri hesaplama
  const projectTotals = filteredEntries.reduce((totals, entry) => {
    if (!totals[entry.project]) {
      totals[entry.project] = 0;
    }
    totals[entry.project] += entry.duration;
    return totals;
  }, {});
  
  // Kullanıcı bazında süreleri hesaplama
  const userTotals = filteredEntries.reduce((totals, entry) => {
    if (!totals[entry.user]) {
      totals[entry.user] = 0;
    }
    totals[entry.user] += entry.duration;
    return totals;
  }, {});

  const openAddModal = () => {
    setModalMode('add');
    setSelectedTimeEntry(null);
    setIsModalOpen(true);
  };

  const openEditModal = (timeEntry) => {
    setModalMode('edit');
    setSelectedTimeEntry(timeEntry);
    setIsModalOpen(true);
  };

  const handleCloseModal = (formData) => {
    setIsModalOpen(false);
    
    if (!formData) return; // Eğer form verileri yoksa (iptal edildi), işlem yapma
    
    if (modalMode === 'add') {
      // Yeni zaman kaydı ekleme
      const newTimeEntry = {
        id: Math.max(0, ...timeEntries.map(t => t.id)) + 1, // Yeni ID oluşturma
        ...formData
      };
      setTimeEntries([...timeEntries, newTimeEntry]);
    } else {
      // Mevcut zaman kaydını güncelleme
      const updatedTimeEntries = timeEntries.map(timeEntry => 
        timeEntry.id === selectedTimeEntry.id ? { ...timeEntry, ...formData } : timeEntry
      );
      setTimeEntries(updatedTimeEntries);
    }
  };

  const handleDeleteTimeEntry = (timeEntryId) => {
    if (window.confirm('Bu zaman kaydını silmek istediğinize emin misiniz?')) {
      setTimeEntries(timeEntries.filter(entry => entry.id !== timeEntryId));
    }
  };

  return (
    <div className="timetracking-page">
      <div className="header">
        <h1 className="title">Zaman Takibi</h1>
        <button className="add-button" onClick={openAddModal}>
          <span className="add-icon">+</span>
          Yeni Zaman Kaydı
        </button>
      </div>

      {/* Özet Bölümü */}
      <div className="summary-section">
        <h2 className="summary-title">Özet Bilgiler</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-value">{formatDuration(totalDuration)}</div>
            <div className="summary-label">Toplam Süre</div>
          </div>
          
          <div className="summary-card">
            <div className="summary-value">{filteredEntries.length}</div>
            <div className="summary-label">Toplam Kayıt</div>
          </div>
          
          <div className="summary-card">
            <div className="summary-value">{projectOptions.length}</div>
            <div className="summary-label">Proje Sayısı</div>
          </div>
          
          <div className="summary-card">
            <div className="summary-value">{userOptions.length}</div>
            <div className="summary-label">Çalışan Sayısı</div>
          </div>
        </div>
      </div>

      {/* Filtreler */}
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
              {projectOptions.map(project => (
                <option key={project} value={project}>{project}</option>
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

      {/* Zaman Kayıtları Listesi */}
      {filteredEntries.length > 0 ? (
        <div className="timetracking-list">
          {filteredEntries.map(entry => (
            <div key={entry.id} className="timetracking-card">
              <div className="timeentry-info">
                <div className="timeentry-header">
                  <h3 className="timeentry-task">{entry.task}</h3>
                  <span className="project-tag">{entry.project}</span>
                </div>
                
                <p className="timeentry-description">{entry.description}</p>
                
                <div className="timeentry-meta">
                  <div className="meta-item">
                    <span className="meta-icon">👤</span>
                    {entry.user}
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    {new Date(entry.date).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
              
              <div className="timeentry-duration">
                <span className="duration-icon">⏱️</span>
                {formatDuration(entry.duration)}
              </div>
              
              <div className="timeentry-actions">
                <button 
                  className="action-btn edit"
                  onClick={() => openEditModal(entry)}
                >
                  ✏️
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteTimeEntry(entry.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-entries">
          <div className="no-entries-icon">⏱️</div>
          <p>Kriterlere uygun zaman kaydı bulunamadı</p>
        </div>
      )}

      <TimeEntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        timeEntry={selectedTimeEntry}
        projects={projectOptions}
        tasks={tasks}
        mode={modalMode}
      />
    </div>
  );
} 