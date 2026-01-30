-- ============================================
-- NESTS Complete Database Setup Script
-- ============================================
-- This script includes:
-- 1. Initial schema with all tables
-- 2. Service categories seed data
-- 3. Demo users and sample data
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
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
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Public profiles for viewing vendors
DROP POLICY IF EXISTS "Anyone can view vendor profiles" ON profiles;
CREATE POLICY "Anyone can view vendor profiles"
  ON profiles FOR SELECT
  USING (role = 'vendor');

-- ============================================
-- 2. CLIENT_PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS client_profiles (
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
DROP POLICY IF EXISTS "Users can view own client profile" ON client_profiles;
CREATE POLICY "Users can view own client profile"
  ON client_profiles FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own client profile" ON client_profiles;
CREATE POLICY "Users can update own client profile"
  ON client_profiles FOR UPDATE
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own client profile" ON client_profiles;
CREATE POLICY "Users can insert own client profile"
  ON client_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- 3. VENDOR_PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS vendor_profiles (
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
DROP POLICY IF EXISTS "Anyone can view approved vendors" ON vendor_profiles;
CREATE POLICY "Anyone can view approved vendors"
  ON vendor_profiles FOR SELECT
  USING (verification_status = 'approved');

DROP POLICY IF EXISTS "Vendors can view own profile" ON vendor_profiles;
CREATE POLICY "Vendors can view own profile"
  ON vendor_profiles FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Vendors can update own profile" ON vendor_profiles;
CREATE POLICY "Vendors can update own profile"
  ON vendor_profiles FOR UPDATE
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Vendors can insert own profile" ON vendor_profiles;
CREATE POLICY "Vendors can insert own profile"
  ON vendor_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================
-- 4. SERVICE_CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (public read)
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view service categories" ON service_categories;
CREATE POLICY "Anyone can view service categories"
  ON service_categories FOR SELECT
  USING (true);

-- ============================================
-- 5. VENDOR_CATEGORIES (Junction Table)
-- ============================================
CREATE TABLE IF NOT EXISTS vendor_categories (
  vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (vendor_id, category_id)
);

-- Enable RLS
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view vendor categories" ON vendor_categories;
CREATE POLICY "Anyone can view vendor categories"
  ON vendor_categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Vendors can manage own categories" ON vendor_categories;
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
CREATE TABLE IF NOT EXISTS portfolios (
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

DROP POLICY IF EXISTS "Anyone can view portfolios of approved vendors" ON portfolios;
CREATE POLICY "Anyone can view portfolios of approved vendors"
  ON portfolios FOR SELECT
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE verification_status = 'approved'
    )
  );

DROP POLICY IF EXISTS "Vendors can manage own portfolios" ON portfolios;
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
CREATE TABLE IF NOT EXISTS portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view portfolio images" ON portfolio_images;
CREATE POLICY "Anyone can view portfolio images"
  ON portfolio_images FOR SELECT
  USING (
    portfolio_id IN (
      SELECT p.id FROM portfolios p
      JOIN vendor_profiles vp ON p.vendor_id = vp.id
      WHERE vp.verification_status = 'approved'
    )
  );

DROP POLICY IF EXISTS "Vendors can manage own portfolio images" ON portfolio_images;
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
CREATE TABLE IF NOT EXISTS projects (
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
DROP POLICY IF EXISTS "Clients can view own projects" ON projects;
CREATE POLICY "Clients can view own projects"
  ON projects FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Clients can create projects
DROP POLICY IF EXISTS "Clients can create projects" ON projects;
CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  WITH CHECK (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Clients can update their own projects
DROP POLICY IF EXISTS "Clients can update own projects" ON projects;
CREATE POLICY "Clients can update own projects"
  ON projects FOR UPDATE
  USING (
    client_id IN (
      SELECT id FROM client_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can view projects they're assigned to or have quotes for
DROP POLICY IF EXISTS "Vendors can view relevant projects" ON projects;
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
CREATE TABLE IF NOT EXISTS quotes (
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
DROP POLICY IF EXISTS "Clients can view quotes for own projects" ON quotes;
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
DROP POLICY IF EXISTS "Clients can update quote status" ON quotes;
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
DROP POLICY IF EXISTS "Vendors can view own quotes" ON quotes;
CREATE POLICY "Vendors can view own quotes"
  ON quotes FOR SELECT
  USING (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can create quotes
DROP POLICY IF EXISTS "Vendors can create quotes" ON quotes;
CREATE POLICY "Vendors can create quotes"
  ON quotes FOR INSERT
  WITH CHECK (
    vendor_id IN (
      SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
    )
  );

-- Vendors can update their own quotes
DROP POLICY IF EXISTS "Vendors can update own quotes" ON quotes;
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

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_client_profiles_updated_at ON client_profiles;
CREATE TRIGGER update_client_profiles_updated_at
  BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendor_profiles_updated_at ON vendor_profiles;
CREATE TRIGGER update_vendor_profiles_updated_at
  BEFORE UPDATE ON vendor_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolios_updated_at ON portfolios;
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_status ON vendor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_service_areas ON vendor_profiles USING GIN(service_areas);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_vendor_id ON projects(vendor_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_quotes_project_id ON quotes(project_id);
CREATE INDEX IF NOT EXISTS idx_quotes_vendor_id ON quotes(vendor_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_portfolios_vendor_id ON portfolios(vendor_id);

-- ============================================
-- SEED SERVICE CATEGORIES
-- ============================================
INSERT INTO service_categories (name, slug, icon_url) VALUES
  ('General Contractor', 'general-contractor', NULL),
  ('Architect', 'architect', NULL),
  ('Electrician', 'electrician', NULL),
  ('Plumber', 'plumber', NULL),
  ('Roofer', 'roofer', NULL),
  ('Mason', 'mason', NULL),
  ('Painter', 'painter', NULL),
  ('Carpenter', 'carpenter', NULL),
  ('Tiler', 'tiler', NULL),
  ('HVAC Specialist', 'hvac-specialist', NULL),
  ('Landscaper', 'landscaper', NULL),
  ('Interior Designer', 'interior-designer', NULL)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SEED DEMO DATA (Users & Sample Content)
-- ============================================

-- Insert demo vendor users directly into auth.users
-- Note: These will automatically create profiles via the trigger
DO $$
DECLARE
  vendor1_id UUID := '11111111-1111-1111-1111-111111111111';
  vendor2_id UUID := '22222222-2222-2222-2222-222222222222';
  vendor3_id UUID := '33333333-3333-3333-3333-333333333333';
  client1_id UUID := '44444444-4444-4444-4444-444444444444';
BEGIN
  -- Insert demo users into auth.users if they don't exist
  -- Note: In production, users should sign up via the app
  -- This is for demo/development purposes only
  
  -- Check and insert Vendor 1
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = vendor1_id) THEN
    INSERT INTO auth.users (
      id, 
      email, 
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      vendor1_id,
      'vendor1@demo.com',
      crypt('demo123', gen_salt('bf')),
      NOW(),
      jsonb_build_object(
        'full_name', 'John Moyo',
        'role', 'vendor',
        'business_name', 'Harare Master Builders',
        'phone', '+263 77 123 4567'
      ),
      NOW(),
      NOW()
    );
  END IF;

  -- Check and insert Vendor 2
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = vendor2_id) THEN
    INSERT INTO auth.users (
      id, 
      email, 
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      vendor2_id,
      'vendor2@demo.com',
      crypt('demo123', gen_salt('bf')),
      NOW(),
      jsonb_build_object(
        'full_name', 'Sarah Ncube',
        'role', 'vendor',
        'business_name', 'ZimDesign Architects',
        'phone', '+263 77 234 5678'
      ),
      NOW(),
      NOW()
    );
  END IF;

  -- Check and insert Vendor 3
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = vendor3_id) THEN
    INSERT INTO auth.users (
      id, 
      email, 
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      vendor3_id,
      'vendor3@demo.com',
      crypt('demo123', gen_salt('bf')),
      NOW(),
      jsonb_build_object(
        'full_name', 'Michael Chikwanha',
        'role', 'vendor',
        'business_name', 'PowerUp Electrical Services',
        'phone', '+263 77 345 6789'
      ),
      NOW(),
      NOW()
    );
  END IF;

  -- Check and insert Client 1
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = client1_id) THEN
    INSERT INTO auth.users (
      id, 
      email, 
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      client1_id,
      'client1@demo.com',
      crypt('demo123', gen_salt('bf')),
      NOW(),
      jsonb_build_object(
        'full_name', 'Grace Mutasa',
        'role', 'client',
        'current_residence', 'London, UK',
        'target_city', 'Harare',
        'phone', '+44 20 1234 5678'
      ),
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- Update vendor profiles with detailed information
UPDATE vendor_profiles
SET 
  bio = 'With over 15 years of experience in residential construction, Harare Master Builders has completed more than 200 successful projects across Zimbabwe. We specialize in modern home construction, renovations, and extensions. Our team of skilled craftsmen ensures quality workmanship on every project.',
  service_areas = ARRAY['Harare', 'Chitungwiza', 'Norton', 'Ruwa'],
  verification_status = 'approved'
WHERE business_name = 'Harare Master Builders';

UPDATE vendor_profiles
SET 
  bio = 'Award-winning architectural firm specializing in sustainable and modern African design. We blend contemporary aesthetics with traditional Zimbabwean elements to create unique, functional spaces. From concept to completion, we guide you through every step of the design process.',
  service_areas = ARRAY['Harare', 'Bulawayo', 'Victoria Falls'],
  verification_status = 'approved'
WHERE business_name = 'ZimDesign Architects';

UPDATE vendor_profiles
SET 
  bio = 'Licensed electrical contractor providing residential and commercial electrical services. We specialize in new installations, solar systems, backup power solutions, and smart home wiring. Safety and quality are our top priorities.',
  service_areas = ARRAY['Harare', 'Chitungwiza', 'Marondera', 'Bindura'],
  verification_status = 'approved'
WHERE business_name = 'PowerUp Electrical Services';

-- Link vendors to categories
-- Vendor 1 categories (General Contractor, Mason)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'Harare Master Builders'
AND sc.slug IN ('general-contractor', 'mason')
ON CONFLICT DO NOTHING;

-- Vendor 2 categories (Architect, Interior Designer)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'ZimDesign Architects'
AND sc.slug IN ('architect', 'interior-designer')
ON CONFLICT DO NOTHING;

-- Vendor 3 categories (Electrician)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'PowerUp Electrical Services'
AND sc.slug = 'electrician'
ON CONFLICT DO NOTHING;

-- Sample portfolios for Vendor 1
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Modern 4-Bedroom Family Home', 
  'Complete construction of a 350sqm modern family home featuring open-plan living, en-suite master bedroom, and landscaped garden. Project completed in 8 months.',
  'Borrowdale, Harare'
FROM vendor_profiles WHERE business_name = 'Harare Master Builders'
ON CONFLICT DO NOTHING;

INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Luxury Townhouse Complex',
  'Construction of 6 luxury townhouse units with shared amenities including swimming pool and security. Each unit features 3 bedrooms and modern finishes.',
  'Mount Pleasant, Harare'
FROM vendor_profiles WHERE business_name = 'Harare Master Builders'
ON CONFLICT DO NOTHING;

-- Sample portfolios for Vendor 2
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Contemporary Safari Lodge',
  'Architectural design for an eco-friendly safari lodge featuring sustainable materials and passive cooling. The design won the Zimbabwe Architecture Award 2023.',
  'Victoria Falls'
FROM vendor_profiles WHERE business_name = 'ZimDesign Architects'
ON CONFLICT DO NOTHING;

INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Urban Apartment Building',
  'Design of a 12-story mixed-use building combining retail space with modern apartments. Focus on maximizing natural light and cross-ventilation.',
  'Harare CBD'
FROM vendor_profiles WHERE business_name = 'ZimDesign Architects'
ON CONFLICT DO NOTHING;

-- Sample portfolios for Vendor 3
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Solar Installation - Residential',
  'Complete solar system installation including 10kW panels, inverter, and battery backup. Provides 100% off-grid capability for a 5-bedroom home.',
  'Highlands, Harare'
FROM vendor_profiles WHERE business_name = 'PowerUp Electrical Services'
ON CONFLICT DO NOTHING;

-- Sample project for client
INSERT INTO projects (client_id, project_name, location, description, status)
SELECT cp.id, '4-Bedroom Family Home',
  'Borrowdale, Harare',
  'Looking to build a modern 4-bedroom family home with open-plan living spaces, en-suite bathrooms, and a landscaped garden. Budget: $150,000 - $200,000',
  'seeking_quotes'
FROM client_profiles cp
JOIN profiles p ON cp.user_id = p.id
WHERE p.full_name = 'Grace Mutasa'
ON CONFLICT DO NOTHING;

-- Sample quote from vendor 1 for the project
INSERT INTO quotes (project_id, vendor_id, line_items, total_amount, timeline_days, notes, status)
SELECT 
  pr.id,
  vp.id,
  '[
    {"item": "Foundation & Groundwork", "description": "Excavation, foundation, and concrete slab", "quantity": 1, "unit": "lot", "unitPrice": 25000, "total": 25000},
    {"item": "Structural Work", "description": "Walls, beams, columns", "quantity": 1, "unit": "lot", "unitPrice": 45000, "total": 45000},
    {"item": "Roofing", "description": "Roof structure and tiles", "quantity": 1, "unit": "lot", "unitPrice": 20000, "total": 20000},
    {"item": "Plumbing & Electrical", "description": "Complete plumbing and electrical installation", "quantity": 1, "unit": "lot", "unitPrice": 18000, "total": 18000},
    {"item": "Doors & Windows", "description": "Aluminum windows and solid wood doors", "quantity": 1, "unit": "lot", "unitPrice": 15000, "total": 15000},
    {"item": "Finishes", "description": "Plastering, painting, tiling, fixtures", "quantity": 1, "unit": "lot", "unitPrice": 35000, "total": 35000},
    {"item": "Landscaping", "description": "Garden setup and paving", "quantity": 1, "unit": "lot", "unitPrice": 12000, "total": 12000}
  ]'::jsonb,
  170000.00,
  240,
  'This quote includes all materials and labor. We will provide a detailed project timeline with milestones. Payment terms: 30% upfront, 40% at halfway point, 30% on completion.',
  'submitted'
FROM projects pr
JOIN vendor_profiles vp ON vp.business_name = 'Harare Master Builders'
WHERE pr.project_name = '4-Bedroom Family Home'
ON CONFLICT DO NOTHING;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Schema created successfully!
-- Demo data added:
-- - 3 Vendor accounts (vendor1@demo.com, vendor2@demo.com, vendor3@demo.com)
-- - 1 Client account (client1@demo.com)
-- - Password for all demo accounts: demo123
-- - 12 Service categories
-- - 5 Portfolio projects
-- - 1 Sample project with quote
-- ============================================
