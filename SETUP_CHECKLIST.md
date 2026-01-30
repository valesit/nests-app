# NESTS Database Setup Checklist

Use this checklist to track your database setup progress.

## Pre-Setup

- [ ] Supabase account created at [supabase.com](https://supabase.com)
- [ ] Supabase project created and active
- [ ] Project reference ID confirmed: `rxikvjmjiixnowpftnoa`

## Database Setup

- [ ] **SQL Editor opened** in Supabase dashboard
- [ ] **Schema created** - Run `supabase/complete_setup.sql`
  - [ ] All 9 tables created successfully
  - [ ] RLS policies enabled
  - [ ] Triggers created
  - [ ] Indexes created
- [ ] **Service categories seeded** (12 categories)
- [ ] **Demo data loaded** (4 users, 5 portfolios)

## Storage Setup

- [ ] **Storage section opened** in Supabase dashboard
- [ ] **Bucket created: `avatars`** (set to public)
- [ ] **Bucket created: `portfolio-images`** (set to public)
- [ ] **Storage policies configured** - Run `supabase/storage_setup.sql`

## Environment Configuration

- [ ] `.env.local` file created (copy from `.env.local.example`)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set
  - Get from: Project Settings → API → Project URL
  - Format: `https://rxikvjmjiixnowpftnoa.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
  - Get from: Project Settings → API → Project API keys → anon public

## Verification

- [ ] **Tables verified** - Run query:
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' ORDER BY table_name;
  ```
  Expected: 9 tables

- [ ] **Service categories verified** - Run query:
  ```sql
  SELECT COUNT(*) FROM service_categories;
  ```
  Expected: 12

- [ ] **Demo vendors verified** - Run query:
  ```sql
  SELECT business_name FROM vendor_profiles;
  ```
  Expected: 3 vendors

- [ ] **Demo users verified** - Run query:
  ```sql
  SELECT full_name, role FROM profiles;
  ```
  Expected: 4 users (3 vendors, 1 client)

## Application Setup

- [ ] Dependencies installed: `npm install`
- [ ] Development server started: `npm run dev`
- [ ] Application opens at http://localhost:3000
- [ ] Landing page loads correctly
- [ ] Can navigate to `/auth/login`

## Testing

### Client Flow Test
- [ ] Log in as client: `client1@demo.com` / `demo123`
- [ ] Can access client dashboard at `/client/dashboard`
- [ ] Can view vendors at `/vendors`
- [ ] Can view vendor profiles and portfolios
- [ ] Can see existing project: "4-Bedroom Family Home"
- [ ] Can see quote from vendor

### Vendor Flow Test
- [ ] Log in as vendor: `vendor1@demo.com` / `demo123`
- [ ] Can access vendor dashboard at `/vendor/dashboard`
- [ ] Can view profile at `/vendor/profile`
- [ ] Can view portfolios at `/vendor/portfolio`
- [ ] Can see existing portfolios:
  - Modern 4-Bedroom Family Home
  - Luxury Townhouse Complex

### Additional Vendor Tests
- [ ] Test vendor2: `vendor2@demo.com` / `demo123` (ZimDesign Architects)
- [ ] Test vendor3: `vendor3@demo.com` / `demo123` (PowerUp Electrical)

## Optional: Data Customization

- [ ] Update vendor profiles with real business information
- [ ] Add real portfolio images (upload to storage buckets)
- [ ] Update service categories if needed
- [ ] Add more demo data if desired
- [ ] Customize project descriptions

## Troubleshooting

If you encounter issues:

### Database Connection Issues
- [ ] Verify project is not paused in Supabase dashboard
- [ ] Check if correct connection string format is used
- [ ] Try using Transaction mode pooler for migrations

### RLS Policy Issues
- [ ] Verify user is authenticated
- [ ] Check policy conditions match user context
- [ ] Review policy definitions in `complete_setup.sql`

### Storage Issues
- [ ] Verify buckets are set to public
- [ ] Check storage policies are applied
- [ ] Confirm file upload permissions

### Authentication Issues
- [ ] Verify environment variables are set correctly
- [ ] Check Supabase URL includes `https://`
- [ ] Confirm anon key is from correct project
- [ ] Try clearing browser cache and cookies

---

## Quick Reference

### Demo Accounts
| Email | Password | Role | Business |
|-------|----------|------|----------|
| vendor1@demo.com | demo123 | Vendor | Harare Master Builders |
| vendor2@demo.com | demo123 | Vendor | ZimDesign Architects |
| vendor3@demo.com | demo123 | Vendor | PowerUp Electrical Services |
| client1@demo.com | demo123 | Client | Grace Mutasa |

### Key URLs
- Supabase Dashboard: https://supabase.com/dashboard
- Project Settings: Dashboard → Settings (gear icon)
- SQL Editor: Dashboard → SQL Editor
- Storage: Dashboard → Storage
- Authentication: Dashboard → Authentication

### Important Files
- Complete Setup: `supabase/complete_setup.sql`
- Setup Guide: `supabase/SETUP_GUIDE.md`
- Schema Reference: `supabase/schema_reference.sql`
- Storage Policies: `supabase/storage_setup.sql`

---

**Status: [ ] Setup Complete** ✅

Once all items are checked, you're ready to start developing!
