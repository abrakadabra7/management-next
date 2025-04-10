import supabase from './supabase'

/**
 * Tüm projeleri getir
 * @returns {Promise} Projeler listesi
 */
export async function getProjects() {
  try {
    console.log('getProjects: Projeler getiriliyor...')
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('getProjects: Hata oluştu:', error)
      throw error
    }
    
    console.log('getProjects: Başarılı, veri sayısı:', data?.length)
    return data
  } catch (error) {
    console.error('getProjects: Projeler getirilirken hata oluştu:', error)
    throw error
  }
}

/**
 * Belirli bir projeyi ID'ye göre getir
 * @param {number} id - Proje ID'si
 * @returns {Promise} Proje detayları
 */
export async function getProjectById(id) {
  try {
    console.log(`getProjectById: ID=${id} olan proje getiriliyor...`)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`getProjectById: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`getProjectById: ID=${id} için başarılı`)
    return data
  } catch (error) {
    console.error(`getProjectById: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Yeni proje oluştur
 * @param {Object} project - Proje verileri
 * @returns {Promise} Oluşturulan proje
 */
export async function createProject(project) {
  try {
    console.log('createProject: Yeni proje oluşturuluyor, veri:', project)
    
    // Tarih alanlarını kontrol et
    if (project.start_date === '') delete project.start_date
    if (project.end_date === '') delete project.end_date
    
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
    
    if (error) {
      console.error('createProject: Hata oluştu:', error)
      throw error
    }
    
    console.log('createProject: Başarılı, yeni proje:', data[0])
    return data[0]
  } catch (error) {
    console.error('createProject: Proje oluşturulurken hata oluştu:', error)
    throw error
  }
}

/**
 * Mevcut projeyi güncelle
 * @param {number} id - Proje ID'si
 * @param {Object} updates - Güncellenecek alanlar
 * @returns {Promise} Güncellenmiş proje
 */
export async function updateProject(id, updates) {
  try {
    console.log(`updateProject: ID=${id} olan proje güncelleniyor, veri:`, updates)
    
    // Tarih alanlarını kontrol et
    if (updates.start_date === '') delete updates.start_date
    if (updates.end_date === '') delete updates.end_date
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`updateProject: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`updateProject: ID=${id} için başarılı, güncel veri:`, data[0])
    return data[0]
  } catch (error) {
    console.error(`updateProject: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Projeyi sil
 * @param {number} id - Proje ID'si
 * @returns {Promise} İşlem sonucu
 */
export async function deleteProject(id) {
  try {
    console.log(`deleteProject: ID=${id} olan proje siliniyor...`)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`deleteProject: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`deleteProject: ID=${id} için başarılı`)
    return { success: true }
  } catch (error) {
    console.error(`deleteProject: ID=${id} için hata:`, error)
    throw error
  }
} 