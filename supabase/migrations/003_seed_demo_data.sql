-- NESTS Demo MVP - Seed Demo Data
-- Run this AFTER creating test users in the Supabase Auth dashboard
-- This script assumes you've created the following test users:
-- 1. vendor1@demo.com (vendor)
-- 2. vendor2@demo.com (vendor)
-- 3. vendor3@demo.com (vendor)
-- 4. client1@demo.com (client)

-- NOTE: Replace the UUIDs below with actual user IDs from your Supabase Auth

-- ============================================
-- DEMO VENDOR PROFILES
-- ============================================

-- You'll need to manually insert these after creating users
-- Example (replace UUIDs with actual auth.users IDs):

/*
-- Vendor 1: General Contractor
INSERT INTO vendor_profiles (user_id, business_name, bio, service_areas, verification_status)
VALUES (
  'REPLACE_WITH_VENDOR1_USER_ID',
  'Harare Master Builders',
  'With over 15 years of experience in residential construction, Harare Master Builders has completed more than 200 successful projects across Zimbabwe. We specialize in modern home construction, renovations, and extensions. Our team of skilled craftsmen ensures quality workmanship on every project.',
  ARRAY['Harare', 'Chitungwiza', 'Norton', 'Ruwa'],
  'approved'
);

-- Vendor 2: Architect
INSERT INTO vendor_profiles (user_id, business_name, bio, service_areas, verification_status)
VALUES (
  'REPLACE_WITH_VENDOR2_USER_ID',
  'ZimDesign Architects',
  'Award-winning architectural firm specializing in sustainable and modern African design. We blend contemporary aesthetics with traditional Zimbabwean elements to create unique, functional spaces. From concept to completion, we guide you through every step of the design process.',
  ARRAY['Harare', 'Bulawayo', 'Victoria Falls'],
  'approved'
);

-- Vendor 3: Electrician
INSERT INTO vendor_profiles (user_id, business_name, bio, service_areas, verification_status)
VALUES (
  'REPLACE_WITH_VENDOR3_USER_ID',
  'PowerUp Electrical Services',
  'Licensed electrical contractor providing residential and commercial electrical services. We specialize in new installations, solar systems, backup power solutions, and smart home wiring. Safety and quality are our top priorities.',
  ARRAY['Harare', 'Chitungwiza', 'Marondera', 'Bindura'],
  'approved'
);

-- Link vendors to categories
-- Get vendor IDs and category IDs first, then insert:

-- Vendor 1 categories (General Contractor, Mason)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'Harare Master Builders'
AND sc.slug IN ('general-contractor', 'mason');

-- Vendor 2 categories (Architect, Interior Designer)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'ZimDesign Architects'
AND sc.slug IN ('architect', 'interior-designer');

-- Vendor 3 categories (Electrician)
INSERT INTO vendor_categories (vendor_id, category_id)
SELECT vp.id, sc.id
FROM vendor_profiles vp, service_categories sc
WHERE vp.business_name = 'PowerUp Electrical Services'
AND sc.slug = 'electrician';

-- Sample portfolios for Vendor 1
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Modern 4-Bedroom Family Home', 
  'Complete construction of a 350sqm modern family home featuring open-plan living, en-suite master bedroom, and landscaped garden. Project completed in 8 months.',
  'Borrowdale, Harare'
FROM vendor_profiles WHERE business_name = 'Harare Master Builders';

INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Luxury Townhouse Complex',
  'Construction of 6 luxury townhouse units with shared amenities including swimming pool and security. Each unit features 3 bedrooms and modern finishes.',
  'Mount Pleasant, Harare'
FROM vendor_profiles WHERE business_name = 'Harare Master Builders';

-- Sample portfolios for Vendor 2
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Contemporary Safari Lodge',
  'Architectural design for an eco-friendly safari lodge featuring sustainable materials and passive cooling. The design won the Zimbabwe Architecture Award 2023.',
  'Victoria Falls'
FROM vendor_profiles WHERE business_name = 'ZimDesign Architects';

INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Urban Apartment Building',
  'Design of a 12-story mixed-use building combining retail space with modern apartments. Focus on maximizing natural light and cross-ventilation.',
  'Harare CBD'
FROM vendor_profiles WHERE business_name = 'ZimDesign Architects';

-- Sample portfolios for Vendor 3
INSERT INTO portfolios (vendor_id, project_name, description, location)
SELECT id, 'Solar Installation - Residential',
  'Complete solar system installation including 10kW panels, inverter, and battery backup. Provides 100% off-grid capability for a 5-bedroom home.',
  'Highlands, Harare'
FROM vendor_profiles WHERE business_name = 'PowerUp Electrical Services';
*/

-- ============================================
-- QUICK SETUP INSTRUCTIONS
-- ============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Create test users with the emails above
-- 3. Note down their UUIDs
-- 4. Replace 'REPLACE_WITH_...' placeholders above
-- 5. Uncomment and run the SQL

-- For a quick demo without real users, you can also:
-- 1. Sign up through the app as each user type
-- 2. The profiles will be created automatically
-- 3. Then manually update vendor profiles with better data
