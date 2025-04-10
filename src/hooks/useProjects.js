"use client";

import { useState, useEffect, useCallback } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectService';

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Projeleri yükle
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Projeler yüklenirken hata:', err);
      setError('Projeler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk yükleme
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Proje oluştur
  const addProject = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      console.error('Proje oluşturulurken hata:', err);
      setError('Proje oluşturulurken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Proje güncelle
  const editProject = async (id, projectData) => {
    try {
      setLoading(true);
      const updatedProject = await updateProject(id, projectData);
      setProjects(prev => 
        prev.map(project => project.id === id ? updatedProject : project)
      );
      return updatedProject;
    } catch (err) {
      console.error('Proje güncellenirken hata:', err);
      setError('Proje güncellenirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Proje sil
  const removeProject = async (id) => {
    try {
      setLoading(true);
      await deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Proje silinirken hata:', err);
      setError('Proje silinirken bir hata oluştu.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    editProject,
    removeProject
  };
} 