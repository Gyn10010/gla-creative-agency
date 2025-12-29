-- GLA Creative Agency - Supabase Database Schema
-- Execute this SQL in the Supabase SQL Editor

-- Criar tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserções públicas (para o formulário de contato)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Criar política para leitura (apenas com service_role key)
CREATE POLICY "Allow service role to read" ON contacts
  FOR SELECT
  TO service_role
  USING (true);

-- Comentários para documentação
COMMENT ON TABLE contacts IS 'Armazena submissões do formulário de contato do site GLA';
COMMENT ON COLUMN contacts.id IS 'ID único do contato';
COMMENT ON COLUMN contacts.name IS 'Nome do contato';
COMMENT ON COLUMN contacts.email IS 'Email do contato';
COMMENT ON COLUMN contacts.service IS 'Serviço de interesse';
COMMENT ON COLUMN contacts.message IS 'Mensagem do contato';
COMMENT ON COLUMN contacts.created_at IS 'Data e hora da submissão';
COMMENT ON COLUMN contacts.ip_address IS 'Endereço IP do cliente';
COMMENT ON COLUMN contacts.user_agent IS 'User agent do navegador';
