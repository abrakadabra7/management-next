-- Zaman Kayıtları (time_entries) tablosunu oluştur
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- dakika cinsinden
  entry_date DATE NOT NULL,
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Güvenlik Politikasını ayarlayalım
-- Önce RLS'yi etkinleştirelim
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

-- Herkes için okuma izni verelim
CREATE POLICY "Herkes için okuma izni" ON time_entries
  FOR SELECT USING (true);

-- Herkes için yazma izni verelim
CREATE POLICY "Herkes için ekleme izni" ON time_entries
  FOR INSERT WITH CHECK (true);

-- Herkes için güncelleme izni verelim
CREATE POLICY "Herkes için güncelleme izni" ON time_entries
  FOR UPDATE USING (true);

-- Herkes için silme izni verelim
CREATE POLICY "Herkes için silme izni" ON time_entries
  FOR DELETE USING (true);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_time_entries_task_id ON time_entries(task_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_entry_date ON time_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_name ON time_entries(user_name); 