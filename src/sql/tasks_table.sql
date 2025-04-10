-- Görevler (tasks) tablosunu oluştur
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'todo',
  priority TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  assignee TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Güvenlik Politikasını ayarlayalım
-- Önce RLS'yi etkinleştirelim
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Herkes için okuma izni verelim
CREATE POLICY "Herkes için okuma izni" ON tasks
  FOR SELECT USING (true);

-- Herkes için yazma izni verelim
CREATE POLICY "Herkes için ekleme izni" ON tasks
  FOR INSERT WITH CHECK (true);

-- Herkes için güncelleme izni verelim
CREATE POLICY "Herkes için güncelleme izni" ON tasks
  FOR UPDATE USING (true);

-- Herkes için silme izni verelim
CREATE POLICY "Herkes için silme izni" ON tasks
  FOR DELETE USING (true);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date); 