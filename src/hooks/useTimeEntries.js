"use client";

import { useState, useEffect, useCallback } from 'react';
import { getTimeEntries, createTimeEntry, updateTimeEntry, deleteTimeEntry } from '../services/timeEntryService';

export default function useTimeEntries() {
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Zaman kayıtlarını yükle
  const fetchTimeEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTimeEntries();
      setTimeEntries(data || []);
    } catch (err) {
      console.error('Zaman kayıtları yüklenirken hata:', err);
      setError('Zaman kayıtları yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk yükleme
  useEffect(() => {
    fetchTimeEntries();
  }, [fetchTimeEntries]);

  // Zaman kaydı oluştur
  const addTimeEntry = async (timeEntryData) => {
    try {
      setLoading(true);
      const newTimeEntry = await createTimeEntry(timeEntryData);
      setTimeEntries(prev => [newTimeEntry, ...prev]);
      return newTimeEntry;
    } catch (err) {
      console.error('Zaman kaydı oluşturulurken hata:', err);
      setError('Zaman kaydı oluşturulurken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Zaman kaydı güncelle
  const editTimeEntry = async (id, timeEntryData) => {
    try {
      setLoading(true);
      const updatedTimeEntry = await updateTimeEntry(id, timeEntryData);
      setTimeEntries(prev => 
        prev.map(timeEntry => timeEntry.id === id ? updatedTimeEntry : timeEntry)
      );
      return updatedTimeEntry;
    } catch (err) {
      console.error('Zaman kaydı güncellenirken hata:', err);
      setError('Zaman kaydı güncellenirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Zaman kaydı sil
  const removeTimeEntry = async (id) => {
    try {
      setLoading(true);
      await deleteTimeEntry(id);
      setTimeEntries(prev => prev.filter(timeEntry => timeEntry.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Zaman kaydı silinirken hata:', err);
      setError('Zaman kaydı silinirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    timeEntries,
    loading,
    error,
    fetchTimeEntries,
    addTimeEntry,
    editTimeEntry,
    removeTimeEntry
  };
} 