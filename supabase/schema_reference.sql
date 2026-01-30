-- =================================================================
-- NESTS DATABASE SCHEMA REFERENCE
-- =================================================================
-- Quick reference guide to the database structure
-- For full setup, use: complete_setup.sql
-- =================================================================

-- =================================================================
-- AUTHENTICATION & USER PROFILES
-- =================================================================

-- Base profile for all users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,                    -- Links to auth.users.id
  role TEXT NOT NULL,                     -- 'client' or 'vendor'
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Extended profile for clients
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE,                    -- Links to profiles.id
  current_residence TEXT,                 -- Where they live now
  target_city TEXT,                       -- Where they're building
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Extended profile for vendors
CREATE TABLE vendor_profiles (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE,                    -- Links to profiles.id
  business_name TEXT NOT NULL,
  bio TEXT,
  service_areas TEXT[],                   -- Array of cities/regions
  verification_status TEXT,               -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- =================================================================
-- SERVICES & CATEGORIES
-- =================================================================

-- Types of services (e.g., Architect, Electrician, Plumber)
CREATE TABLE service_categories (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMPTZ
);

-- Junction table linking vendors to their services
CREATE TABLE vendor_categories (
  vendor_id UUID,                         -- Links to vendor_profiles.id
  category_id UUID,                       -- Links to service_categories.id
  PRIMARY KEY (vendor_id, category_id)
);

-- =================================================================
-- VENDOR PORTFOLIOS
-- =================================================================

-- Portfolio projects showcasing vendor work
CREATE TABLE portfolios (
  id UUID PRIMARY KEY,
  vendor_id UUID,                         -- Links to vendor_profiles.id
  project_name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Images for portfolio projects
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY,
  portfolio_id UUID,                      -- Links to portfolios.id
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ
);

-- =================================================================
-- PROJECTS & QUOTES
-- =================================================================

-- Client project requests (for getting quotes)
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  client_id UUID,                         -- Links to client_profiles.id
  vendor_id UUID,                         -- Vendor if project awarded
  project_name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  status TEXT,                            -- 'seeking_quotes', 'in_progress', 'completed', 'cancelled'
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- Vendor quotes for client projects
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  project_id UUID,                        -- Links to projects.id
  vendor_id UUID,                         -- Links to vendor_profiles.id
  line_items JSONB,                       -- Array of quote line items
  total_amount NUMERIC(12, 2),
  timeline_days INT,
  notes TEXT,
  status TEXT,                            -- 'pending', 'submitted', 'accepted', 'rejected'
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

-- =================================================================
-- LINE ITEMS JSON STRUCTURE
-- =================================================================
/*
line_items format:
[
  {
    "item": "Foundation & Groundwork",
    "description": "Excavation, foundation, and concrete slab",
    "quantity": 1,
    "unit": "lot",
    "unitPrice": 25000,
    "total": 25000
  },
  ...
]
*/

-- =================================================================
-- RELATIONSHIPS
-- =================================================================
/*
┌──────────────┐
│  auth.users  │ (Supabase managed)
└──────┬───────┘
       │
       │ 1:1
       ↓
┌──────────────┐
│   profiles   │ (role: client/vendor)
└───┬──────┬───┘
    │      │
  1:1    1:1
    ↓      ↓
┌─────────┐  ┌──────────────────┐
│ client_ │  │ vendor_profiles  │
│profiles │  └────┬─────────────┘
└────┬────┘       │
     │            │ 1:n          1:n
     │            ↓              ↓
     │      ┌─────────┐    ┌─────────────┐
     │      │portfolio│    │vendor_      │
     │      │    s    │    │categories   │
     │      └────┬────┘    └─────┬───────┘
     │           │               │
     │         1:n              n:1
     │           ↓               ↓
     │      ┌─────────┐    ┌──────────┐
     │      │portfolio│    │ service_ │
     │      │ _images │    │categories│
     │      └─────────┘    └──────────┘
     │
   1:n
     ↓
┌─────────┐
│projects │
└────┬────┘
     │
   1:n
     ↓
┌─────────┐
│ quotes  │
└─────────┘
*/

-- =================================================================
-- ROW LEVEL SECURITY (RLS)
-- =================================================================
/*
All tables have RLS enabled with the following policies:

profiles:
- Users can view/update their own profile
- Anyone can view vendor profiles

client_profiles:
- Users can view/update their own profile

vendor_profiles:
- Anyone can view approved vendors
- Vendors can manage their own profile

projects:
- Clients can view/manage their own projects
- Vendors can view projects they're involved with

quotes:
- Clients can view quotes for their projects
- Vendors can view/manage their own quotes

portfolios:
- Anyone can view portfolios of approved vendors
- Vendors can manage their own portfolios
*/

-- =================================================================
-- INDEXES
-- =================================================================
/*
Performance indexes on frequently queried columns:
- vendor_profiles.verification_status
- vendor_profiles.service_areas (GIN index for array search)
- projects.client_id, vendor_id, status
- quotes.project_id, vendor_id, status
- portfolios.vendor_id
*/

-- =================================================================
-- SAMPLE QUERIES
-- =================================================================

-- Find all approved vendors in Harare offering electrical services
SELECT DISTINCT vp.*, p.full_name, p.phone
FROM vendor_profiles vp
JOIN profiles p ON vp.user_id = p.id
JOIN vendor_categories vc ON vp.id = vc.vendor_id
JOIN service_categories sc ON vc.category_id = sc.id
WHERE vp.verification_status = 'approved'
  AND 'Harare' = ANY(vp.service_areas)
  AND sc.slug = 'electrician';

-- Get all portfolios for a specific vendor
SELECT 
  po.*, 
  array_agg(pi.image_url ORDER BY pi.display_order) as images
FROM portfolios po
LEFT JOIN portfolio_images pi ON po.id = pi.portfolio_id
WHERE po.vendor_id = 'VENDOR_UUID'
GROUP BY po.id;

-- Get all projects for a client with their quotes
SELECT 
  pr.*,
  json_agg(
    json_build_object(
      'id', q.id,
      'vendor_name', vp.business_name,
      'total_amount', q.total_amount,
      'status', q.status
    )
  ) as quotes
FROM projects pr
LEFT JOIN quotes q ON pr.id = q.project_id
LEFT JOIN vendor_profiles vp ON q.vendor_id = vp.id
WHERE pr.client_id = 'CLIENT_UUID'
GROUP BY pr.id;

-- Get quote with full details including line items
SELECT 
  q.*,
  pr.project_name,
  pr.description as project_description,
  vp.business_name,
  p.full_name as vendor_name,
  p.phone as vendor_phone
FROM quotes q
JOIN projects pr ON q.project_id = pr.id
JOIN vendor_profiles vp ON q.vendor_id = vp.id
JOIN profiles p ON vp.user_id = p.id
WHERE q.id = 'QUOTE_UUID';
