-- NESTS Demo MVP - Storage Buckets Setup
-- Run this in Supabase SQL Editor after creating the buckets in the dashboard

-- ============================================
-- STORAGE BUCKET POLICIES
-- ============================================

-- Note: First create these buckets in Supabase Dashboard:
-- 1. avatars (public)
-- 2. portfolio-images (public)

-- ============================================
-- AVATARS BUCKET POLICIES
-- ============================================

-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to update their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own avatar
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to avatars
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- ============================================
-- PORTFOLIO-IMAGES BUCKET POLICIES
-- ============================================

-- Allow vendors to upload portfolio images
CREATE POLICY "Vendors can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' AND
  EXISTS (
    SELECT 1 FROM vendor_profiles
    WHERE user_id = auth.uid()
    AND id::text = (storage.foldername(name))[1]
  )
);

-- Allow vendors to update their portfolio images
CREATE POLICY "Vendors can update portfolio images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-images' AND
  EXISTS (
    SELECT 1 FROM vendor_profiles
    WHERE user_id = auth.uid()
    AND id::text = (storage.foldername(name))[1]
  )
);

-- Allow vendors to delete their portfolio images
CREATE POLICY "Vendors can delete portfolio images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' AND
  EXISTS (
    SELECT 1 FROM vendor_profiles
    WHERE user_id = auth.uid()
    AND id::text = (storage.foldername(name))[1]
  )
);

-- Allow public read access to portfolio images
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');
