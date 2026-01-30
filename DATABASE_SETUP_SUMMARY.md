# Database Setup Summary

## What Was Created

I've prepared a complete database schema setup for your NESTS application with the following files:

### 1. **Complete Setup Script** 
   📄 `supabase/complete_setup.sql`
   
   This is your all-in-one database setup script that includes:
   - ✅ 9 database tables with relationships
   - ✅ Row Level Security (RLS) policies for data protection
   - ✅ Automated triggers for timestamp updates
   - ✅ Performance indexes
   - ✅ 12 service categories (pre-seeded)
   - ✅ 4 demo user accounts with sample data
   - ✅ Sample portfolios and projects

### 2. **Setup Guide** 
   📄 `supabase/SETUP_GUIDE.md`
   
   Comprehensive guide with 3 different setup methods:
   - Method 1: Using Supabase SQL Editor (Recommended ⭐)
   - Method 2: Using Command Line Tools
   - Method 3: Step-by-Step Manual Setup
   - Plus troubleshooting tips

### 3. **Schema Reference** 
   📄 `supabase/schema_reference.sql`
   
   Quick reference guide showing:
   - Table structures
   - Relationships diagram
   - Sample queries
   - JSON formats

### 4. **Node.js Setup Script** 
   📄 `scripts/setup-database.js`
   
   Automated setup script (requires correct connection string)

---

## Database Schema Overview

Your NESTS platform has **9 tables** organized into 4 functional areas:

### 👤 Authentication & Profiles (3 tables)
- `profiles` - Base user profiles (client or vendor)
- `client_profiles` - Client-specific data (residence, target city)
- `vendor_profiles` - Vendor business profiles (business name, bio, service areas)

### 🏗️ Services (2 tables)
- `service_categories` - Types of services (Architect, Electrician, etc.)
- `vendor_categories` - Links vendors to their offered services

### 📸 Portfolio (2 tables)
- `portfolios` - Vendor project showcases
- `portfolio_images` - Portfolio photos and captions

### 📋 Projects & Quotes (2 tables)
- `projects` - Client project requests
- `quotes` - Vendor quotes with detailed line items

---

## Demo Accounts Included

After setup, you'll have these ready-to-use accounts:

### Vendors:
1. **vendor1@demo.com** (password: `demo123`)
   - Harare Master Builders
   - Services: General Contractor, Mason
   - 2 portfolio projects

2. **vendor2@demo.com** (password: `demo123`)
   - ZimDesign Architects
   - Services: Architect, Interior Designer
   - 2 portfolio projects

3. **vendor3@demo.com** (password: `demo123`)
   - PowerUp Electrical Services
   - Services: Electrician
   - 1 portfolio project

### Client:
4. **client1@demo.com** (password: `demo123`)
   - Grace Mutasa
   - Location: London, UK → Harare
   - 1 active project seeking quotes

---

## Issue with Connection String

⚠️ **The connection string you provided could not be resolved:**
```
postgresql://postgres:#Prayer2023_08@db.rxikvjmjiixnowpftnoa.supabase.co:5432/postgres
```

**Possible reasons:**
1. The Supabase project might be paused or inactive
2. The hostname format might be incorrect
3. The project might not exist

### Getting the Correct Connection String

To get your actual connection string:

1. Go to [supabase.com](https://supabase.com) and log in
2. Open your project (reference: `rxikvjmjiixnowpftnoa`)
3. Click on **"Project Settings"** (gear icon)
4. Go to **"Database"** section
5. Under **"Connection String"**, select **"URI"**
6. Choose **"Transaction"** mode (important for migrations!)
7. Copy the connection string

The correct format should look like:
```
postgresql://postgres.PROJECT_REF:[PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres
```

---

## Recommended Next Steps

### Step 1: Set Up the Database (Choose one method)

#### Option A: Supabase SQL Editor (Easiest ⭐)
1. Go to your Supabase dashboard
2. Open "SQL Editor"
3. Copy and paste contents of `supabase/complete_setup.sql`
4. Click "Run"
5. Done! ✅

#### Option B: Command Line (If you have the correct connection string)
```bash
node scripts/setup-database.js "YOUR_ACTUAL_CONNECTION_STRING"
```

### Step 2: Set Up Storage Buckets
1. In Supabase dashboard, go to "Storage"
2. Create two public buckets:
   - `avatars`
   - `portfolio-images`
3. Run `supabase/storage_setup.sql` in SQL Editor

### Step 3: Configure Environment Variables
Create/update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://rxikvjmjiixnowpftnoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these values from:
- Supabase Dashboard → Project Settings → API

### Step 4: Start Development
```bash
npm run dev
```

Then visit: http://localhost:3000

---

## Verifying the Setup

After running the setup, verify it worked by running these queries in Supabase SQL Editor:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check service categories (should be 12)
SELECT COUNT(*) FROM service_categories;

-- Check demo vendors (should be 3)
SELECT business_name, verification_status FROM vendor_profiles;

-- Check demo users (should be 4)
SELECT full_name, role FROM profiles ORDER BY role;
```

Expected results:
- ✅ 9 tables: client_profiles, portfolios, portfolio_images, profiles, projects, quotes, service_categories, vendor_categories, vendor_profiles
- ✅ 12 service categories
- ✅ 3 approved vendors with portfolios
- ✅ 4 user profiles (3 vendors, 1 client)

---

## Testing the Application

Once everything is set up:

### As a Client (client1@demo.com):
1. Browse available vendors at `/vendors`
2. View vendor portfolios
3. Request quotes for your project
4. View your dashboard at `/client/dashboard`

### As a Vendor (vendor1@demo.com):
1. View your dashboard at `/vendor/dashboard`
2. Update your profile at `/vendor/profile`
3. Manage portfolio at `/vendor/portfolio`
4. Respond to quote requests

---

## Need Help?

- See detailed instructions in `supabase/SETUP_GUIDE.md`
- Check schema reference in `supabase/schema_reference.sql`
- Review individual migration files in `supabase/migrations/`

## Files Reference

```
supabase/
├── complete_setup.sql          # All-in-one setup script
├── SETUP_GUIDE.md             # Detailed setup instructions
├── schema_reference.sql       # Database schema documentation
├── storage_setup.sql          # Storage bucket policies
└── migrations/                # Individual migration files
    ├── 001_initial_schema.sql
    ├── 002_seed_categories.sql
    └── 003_seed_demo_data.sql

scripts/
└── setup-database.js          # Automated Node.js setup script
```

---

**Ready to build homes across Zimbabwe! 🏡🇿🇼**
