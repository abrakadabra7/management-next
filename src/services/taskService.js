import supabase from './supabase'

/**
 * Tüm görevleri getir
 * @returns {Promise} Görevler listesi
 */
export async function getTasks() {
  try {
    console.log('getTasks: Görevler getiriliyor...')
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('getTasks: Hata oluştu:', error)
      throw error
    }
    
    console.log('getTasks: Başarılı, veri sayısı:', data?.length)
    return data
  } catch (error) {
    console.error('getTasks: Görevler getirilirken hata oluştu:', error)
    throw error
  }
}

/**
 * Belirli bir görevi ID'ye göre getir
 * @param {number} id - Görev ID'si
 * @returns {Promise} Görev detayları
 */
export async function getTaskById(id) {
  try {
    console.log(`getTaskById: ID=${id} olan görev getiriliyor...`)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`getTaskById: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`getTaskById: ID=${id} için başarılı`)
    return data
  } catch (error) {
    console.error(`getTaskById: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Yeni görev oluştur
 * @param {Object} task - Görev verileri
 * @returns {Promise} Oluşturulan görev
 */
export async function createTask(task) {
  try {
    console.log('createTask: Yeni görev oluşturuluyor, veri:', task)
    
    // Tarih alanlarını kontrol et
    if (task.due_date === '') delete task.due_date
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
    
    if (error) {
      console.error('createTask: Hata oluştu:', error)
      throw error
    }
    
    console.log('createTask: Başarılı, yeni görev:', data[0])
    return data[0]
  } catch (error) {
    console.error('createTask: Görev oluşturulurken hata oluştu:', error)
    throw error
  }
}

/**
 * Mevcut görevi güncelle
 * @param {number} id - Görev ID'si
 * @param {Object} updates - Güncellenecek alanlar
 * @returns {Promise} Güncellenmiş görev
 */
export async function updateTask(id, updates) {
  try {
    console.log(`updateTask: ID=${id} olan görev güncelleniyor, veri:`, updates)
    
    // Tarih alanlarını kontrol et
    if (updates.due_date === '') delete updates.due_date
    
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`updateTask: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`updateTask: ID=${id} için başarılı, güncel veri:`, data[0])
    return data[0]
  } catch (error) {
    console.error(`updateTask: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Görevi sil
 * @param {number} id - Görev ID'si
 * @returns {Promise} İşlem sonucu
 */
export async function deleteTask(id) {
  try {
    console.log(`deleteTask: ID=${id} olan görev siliniyor...`)
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`deleteTask: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`deleteTask: ID=${id} için başarılı`)
    return { success: true }
  } catch (error) {
    console.error(`deleteTask: ID=${id} için hata:`, error)
    throw error
  }
} 