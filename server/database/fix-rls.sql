-- Fix RLS Policies for GLA Contacts Table
-- Execute this in Supabase SQL Editor

-- First, drop existing policies
DROP POLICY IF EXISTS "Allow public inserts" ON contacts;
DROP POLICY IF EXISTS "Allow service role to read" ON contacts;

-- Disable RLS temporarily to test
-- ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- Or keep RLS enabled but create better policies:

-- Policy 1: Allow inserts from anyone (for contact form)
CREATE POLICY "Enable insert for all users" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Allow service_role to do everything
CREATE POLICY "Enable all for service role" ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy 3: Allow authenticated users to read (optional)
CREATE POLICY "Enable read for authenticated users" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'contacts';
