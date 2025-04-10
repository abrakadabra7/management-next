"use client";

import React from 'react';
import TimeEntryCard from './TimeEntryCard';

const TimeEntryList = ({ 
  timeEntries, 
  filteredEntries, 
  getProjectName, 
  getTaskName, 
  formatDuration, 
  onEditTimeEntry, 
  onDeleteTimeEntry 
}) => {
  return (
    <>
      {timeEntries.length === 0 ? (
        <div className="no-timeentries">
          <p>Henüz zaman kaydı bulunmuyor. "Yeni Zaman Kaydı" butonuna tıklayarak ilk kaydınızı oluşturabilirsiniz.</p>
        </div>
      ) : (
        filteredEntries.length > 0 ? (
          <div className="timetracking-list">
            {filteredEntries.map(entry => (
              <TimeEntryCard 
                key={entry.id} 
                entry={entry} 
                projectName={getProjectName(entry.project_id)} 
                taskName={getTaskName(entry.task_id)}
                formatDuration={formatDuration}
                onEdit={onEditTimeEntry}
                onDelete={onDeleteTimeEntry}
              />
            ))}
          </div>
        ) : (
          <div className="no-timeentries">
            <p>Seçtiğiniz filtrelere uygun zaman kaydı bulunamadı.</p>
          </div>
        )
      )}
    </>
  );
};

export default TimeEntryList; 