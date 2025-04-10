import supabase from './supabase'

/**
 * Tüm zaman kayıtlarını getir
 * @returns {Promise} Zaman kayıtları listesi
 */
export async function getTimeEntries() {
  try {
    console.log('getTimeEntries: Zaman kayıtları getiriliyor...')
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .order('entry_date', { ascending: false })
    
    if (error) {
      console.error('getTimeEntries: Hata oluştu:', error)
      throw error
    }
    
    console.log('getTimeEntries: Başarılı, veri sayısı:', data?.length)
    return data
  } catch (error) {
    console.error('getTimeEntries: Zaman kayıtları getirilirken hata oluştu:', error)
    throw error
  }
}

/**
 * Belirli bir zaman kaydını ID'ye göre getir
 * @param {number} id - Zaman kaydı ID'si
 * @returns {Promise} Zaman kaydı detayları
 */
export async function getTimeEntryById(id) {
  try {
    console.log(`getTimeEntryById: ID=${id} olan zaman kaydı getiriliyor...`)
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error(`getTimeEntryById: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`getTimeEntryById: ID=${id} için başarılı`)
    return data
  } catch (error) {
    console.error(`getTimeEntryById: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Yeni zaman kaydı oluştur
 * @param {Object} timeEntry - Zaman kaydı verileri
 * @returns {Promise} Oluşturulan zaman kaydı
 */
export async function createTimeEntry(timeEntry) {
  try {
    console.log('createTimeEntry: Yeni zaman kaydı oluşturuluyor, veri:', timeEntry)
    
    const { data, error } = await supabase
      .from('time_entries')
      .insert([timeEntry])
      .select()
    
    if (error) {
      console.error('createTimeEntry: Hata oluştu:', error)
      throw error
    }
    
    console.log('createTimeEntry: Başarılı, yeni zaman kaydı:', data[0])
    return data[0]
  } catch (error) {
    console.error('createTimeEntry: Zaman kaydı oluşturulurken hata oluştu:', error)
    throw error
  }
}

/**
 * Mevcut zaman kaydını güncelle
 * @param {number} id - Zaman kaydı ID'si
 * @param {Object} updates - Güncellenecek alanlar
 * @returns {Promise} Güncellenmiş zaman kaydı
 */
export async function updateTimeEntry(id, updates) {
  try {
    console.log(`updateTimeEntry: ID=${id} olan zaman kaydı güncelleniyor, veri:`, updates)
    
    const { data, error } = await supabase
      .from('time_entries')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    if (error) {
      console.error(`updateTimeEntry: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`updateTimeEntry: ID=${id} için başarılı, güncel veri:`, data[0])
    return data[0]
  } catch (error) {
    console.error(`updateTimeEntry: ID=${id} için hata:`, error)
    throw error
  }
}

/**
 * Zaman kaydını sil
 * @param {number} id - Zaman kaydı ID'si
 * @returns {Promise} İşlem sonucu
 */
export async function deleteTimeEntry(id) {
  try {
    console.log(`deleteTimeEntry: ID=${id} olan zaman kaydı siliniyor...`)
    const { error } = await supabase
      .from('time_entries')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error(`deleteTimeEntry: ID=${id} için hata oluştu:`, error)
      throw error
    }
    
    console.log(`deleteTimeEntry: ID=${id} için başarılı`)
    return { success: true }
  } catch (error) {
    console.error(`deleteTimeEntry: ID=${id} için hata:`, error)
    throw error
  }
} 