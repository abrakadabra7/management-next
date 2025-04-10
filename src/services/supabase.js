import { createClient } from '@supabase/supabase-js'

// Supabase bağlantı bilgileri
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase bağlantı kuruluyor... URL var mı:', !!supabaseUrl, 'Key var mı:', !!supabaseKey)

// URL kontrolü ve düzeltme
let finalUrl = supabaseUrl
if (supabaseUrl && !supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://')) {
  finalUrl = 'https:' + supabaseUrl
  console.log('URL düzeltildi:', finalUrl)
}

// Supabase istemcisini oluştur
const supabase = createClient(finalUrl, supabaseKey)

export default supabase 