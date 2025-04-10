"use client";

import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Görevleri yükle
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data || []);
    } catch (err) {
      console.error('Görevler yüklenirken hata:', err);
      setError('Görevler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk yükleme
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Görev oluştur
  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const newTask = await createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      console.error('Görev oluşturulurken hata:', err);
      setError('Görev oluşturulurken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Görev güncelle
  const editTask = async (id, taskData) => {
    try {
      setLoading(true);
      const updatedTask = await updateTask(id, taskData);
      setTasks(prev => 
        prev.map(task => task.id === id ? updatedTask : task)
      );
      return updatedTask;
    } catch (err) {
      console.error('Görev güncellenirken hata:', err);
      setError('Görev güncellenirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Görev sil
  const removeTask = async (id) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Görev silinirken hata:', err);
      setError('Görev silinirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask
  };
} 