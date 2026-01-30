-- NESTS Demo MVP - Initial Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('client', 'vendor')),
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Public profiles for viewing vendors
CREATE POLICY "Anyone can view vendor profiles"
  ON profiles FOR SELECT
  USING (role = 'vendor');

-- ============================================
-- 2. CLIENT_PROFILES TABLE
-- ============================================
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  current_residence TEXT,
  target_city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for client_profiles
CREATE POLICY "Users can view own client profile"
  ON client_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own client profile"
  ON client_profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own client profile"
  ON client_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- 3. VENDOR_PROFILES TABLE
-- ============================================
CREATE TABLE vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT NOT NULL,
  bio TEXT,
  service_areas TEXT[] DEFAULT '{}',
  verification_status TEXT DEFAULT 'approved' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for vendor_profiles
CREATE POLICY "Anyone can view approved vendors"
  ON vendor_profiles FOR SELECT
  USING (verification_status = 'approved');

CREATE POLICY "Vendors can view own profile"
  ON vendor_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can update own profile"
  ON vendor_profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Vendors can insert own profile"
  ON vendor_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- 4. SERVICE_CATEGORIES TABLE
-- ============================================
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (public read)
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view service categories"
  ON service_categories FOR SELECT
  USING (true);

-- ============================================
-- 5. VENDOR_CATEGORIES (Junction Table)
-- ============================================
CREATE TABLE vendor_categories (
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (vendor_id, category_id)
);

-- Enable RLS
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vendor categories"
  ON vendor_categories FOR SELECT
  USING (true);

CREATE POLICY "Vendors can manage own categories"
  ON vendor_categories FOR ALL
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- 6. PORTFOLIOS TABLE
-- ============================================
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolios of approved vendors"
  ON portfolios FOR SELECT
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE verification_status = 'approved'
    )
  );

CREATE POLICY "Vendors can manage own portfolios"
  ON portfolios FOR ALL
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- 7. PORTFOLIO_IMAGES TABLE
-- ============================================
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolio images"
  ON portfolio_images FOR SELECT
  USING (
    portfolio_id IN (
      SELECT p.id FROM portfolios p
      JOIN vendor_profiles vp ON p.vendor_id = vp.id
      WHERE vp.verification_status = 'approved'
    )
  );

CREATE POLICY "Vendors can manage own portfolio images"
  ON portfolio_images FOR ALL
  USING (
    portfolio_id IN (
      SELECT p.id FROM portfolios p
      JOIN vendor_profiles vp ON p.vendor_id = vp.id
      WHERE vp.user_id = auth.uid()
    )
  );

-- ============================================
-- 8. PROJECTS TABLE (for quote tracking)
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  status TEXT DEFAULT 'seeking_quotes' CHECK (status IN ('seeking_quotes', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Clients can view their own projects
CREATE POLICY "Clients can view own projects"
  ON projects FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Clients can create projects
CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Clients can update their own projects
CREATE POLICY "Clients can update own projects"
  ON projects FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can view projects they're assigned to or have quotes for
CREATE POLICY "Vendors can view relevant projects"
  ON projects FOR SELECT
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
    OR
    id IN (
      SELECT project_id FROM quotes q
      JOIN vendor_profiles vp ON q.vendor_id = vp.id
      WHERE vp.user_id = auth.uid()
    )
  );

-- ============================================
-- 9. QUOTES TABLE
-- ============================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  line_items JSONB DEFAULT '[]',
  total_amount NUMERIC(12, 2),
  timeline_days INT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Clients can view quotes for their projects
CREATE POLICY "Clients can view quotes for own projects"
  ON quotes FOR SELECT
  USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN client_profiles cp ON p.client_id = cp.id
      WHERE cp.user_id = auth.uid()
    )
  );

-- Clients can update quote status (accept/reject)
CREATE POLICY "Clients can update quote status"
  ON quotes FOR UPDATE
  USING (
    project_id IN (
      SELECT p.id FROM projects p
      JOIN client_profiles cp ON p.client_id = cp.id
      WHERE cp.user_id = auth.uid()
    )
  );

-- Vendors can view their own quotes
CREATE POLICY "Vendors can view own quotes"
  ON quotes FOR SELECT
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can create quotes
CREATE POLICY "Vendors can create quotes"
  ON quotes FOR INSERT
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can update their own quotes
CREATE POLICY "Vendors can update own quotes"
  ON quotes FOR UPDATE
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- TRIGGERS: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_profiles_updated_at
  BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_profiles_updated_at
  BEFORE UPDATE ON vendor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  
  -- Create role-specific profile
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'client') = 'client' THEN
    INSERT INTO public.client_profiles (user_id, current_residence, target_city)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'current_residence',
      NEW.raw_user_meta_data->>'target_city'
    );
  ELSIF NEW.raw_user_meta_data->>'role' = 'vendor' THEN
    INSERT INTO public.vendor_profiles (user_id, business_name, bio, service_areas)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'business_name', 'My Business'),
      NEW.raw_user_meta_data->>'bio',
      COALESCE(
        ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'service_areas')),
        '{}'::TEXT[]
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_vendor_profiles_status ON vendor_profiles(verification_status);
CREATE INDEX idx_vendor_profiles_service_areas ON vendor_profiles USING GIN(service_areas);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_vendor_id ON projects(vendor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_quotes_project_id ON quotes(project_id);
CREATE INDEX idx_quotes_vendor_id ON quotes(vendor_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_portfolios_vendor_id ON portfolios(vendor_id);
