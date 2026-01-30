-- ============================================
-- RESET DEMO USER PASSWORDS
-- ============================================
-- Run this in Supabase SQL Editor to reset
-- demo account passwords to: demo123
-- ============================================

-- Update vendor1@demo.com
UPDATE auth.users 
SET 
  encrypted_password = crypt('demo123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'vendor1@demo.com';

-- Update vendor2@demo.com
UPDATE auth.users 
SET 
  encrypted_password = crypt('demo123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'vendor2@demo.com';

-- Update vendor3@demo.com
UPDATE auth.users 
SET 
  encrypted_password = crypt('demo123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'vendor3@demo.com';

-- Update client1@demo.com
UPDATE auth.users 
SET 
  encrypted_password = crypt('demo123', gen_salt('bf')),
  email_confirmed_at = NOW(),
  updated_at = NOW()
WHERE email = 'client1@demo.com';

-- Verify the updates
SELECT 
  email, 
  email_confirmed_at,
  CASE 
    WHEN encrypted_password IS NOT NULL THEN '✓ Password set'
    ELSE '✗ No password'
  END as password_status
FROM auth.users
WHERE email LIKE '%@demo.com'
ORDER BY email;
