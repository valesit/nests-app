# NESTS Database Setup Guide

## Method 1: Using Supabase SQL Editor (Recommended)

This is the easiest and most reliable method to set up your database schema.

### Steps:

1. **Go to your Supabase project dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Open your project: `rxikvjmjiixnowpftnoa`

2. **Open the SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click "New Query"

3. **Run the setup script**
   - Copy the contents of `supabase/complete_setup.sql`
   - Paste it into the SQL Editor
   - Click "Run" or press `Ctrl/Cmd + Enter`

4. **Verify the setup**
   - Go to "Table Editor" in the sidebar
   - You should see all 9 tables created:
     - profiles
     - client_profiles
     - vendor_profiles
     - service_categories
     - vendor_categories
     - portfolios
     - portfolio_images
     - projects
     - quotes

5. **Set up Storage Buckets** (Important!)
   - Go to "Storage" in the sidebar
   - Create two public buckets:
     - `avatars`
     - `portfolio-images`
   - After creating the buckets, run `supabase/storage_setup.sql` in the SQL Editor

### Demo Accounts Created:

After running the setup, you'll have these test accounts:

- **Vendor 1**: `vendor1@demo.com` (password: `demo123`)
  - Business: Harare Master Builders
  - Services: General Contractor, Mason

- **Vendor 2**: `vendor2@demo.com` (password: `demo123`)
  - Business: ZimDesign Architects
  - Services: Architect, Interior Designer

- **Vendor 3**: `vendor3@demo.com` (password: `demo123`)
  - Business: PowerUp Electrical Services
  - Services: Electrician

- **Client 1**: `client1@demo.com` (password: `demo123`)
  - Name: Grace Mutasa
  - Location: London, UK → Harare

---

## Method 2: Using Command Line (if connection string is correct)

If your connection string is correct and the database is accessible:

### Prerequisites:
- PostgreSQL client installed OR Docker running

### Option A: With PostgreSQL installed

```bash
psql "postgresql://postgres:PASSWORD@HOST:5432/postgres" -f supabase/complete_setup.sql
```

### Option B: With Docker

```bash
docker run --rm -v "$(pwd)/supabase:/scripts" postgres:16-alpine \
  psql "postgresql://postgres:PASSWORD@HOST:5432/postgres" \
  -f /scripts/complete_setup.sql
```

### Option C: Using Node.js script

```bash
node scripts/setup-database.js "postgresql://postgres:PASSWORD@HOST:5432/postgres"
```

---

## Method 3: Step-by-Step Manual Setup

If you prefer to run migrations individually:

### Step 1: Create the schema
Run in SQL Editor:
```bash
# Contents of supabase/migrations/001_initial_schema.sql
```

### Step 2: Seed categories
Run in SQL Editor:
```bash
# Contents of supabase/migrations/002_seed_categories.sql
```

### Step 3: Add demo data
Run in SQL Editor:
```bash
# Contents of supabase/migrations/003_seed_demo_data.sql
```

---

## Troubleshooting

### Issue: "Cannot resolve database host"

**Solution**: 
- Check if your Supabase project is active (not paused)
- Verify the project reference ID in your dashboard
- Make sure you're using the correct connection pooler mode (use Transaction mode for migrations)

### Issue: "Already exists" errors

**Solution**: 
- This is normal if you're re-running the setup
- The script uses `IF NOT EXISTS` and `ON CONFLICT DO NOTHING` to handle this
- You can safely ignore these warnings

### Issue: "Permission denied" errors

**Solution**:
- Make sure you're using the service role key, not the anon key
- Check that Row Level Security (RLS) policies are properly configured

### Getting Your Connection String

To get the correct connection string:

1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Go to "Database"
4. Under "Connection String", select "URI"
5. Choose "Transaction" mode for running migrations
6. Copy the connection string and replace `[YOUR-PASSWORD]` with your actual database password

Example format:
```
postgresql://postgres.PROJECT_REF:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Verifying the Setup

After completing the setup, verify it worked:

### 1. Check Tables
Run this query in SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see: client_profiles, portfolios, portfolio_images, profiles, projects, quotes, service_categories, vendor_categories, vendor_profiles

### 2. Check Service Categories
```sql
SELECT COUNT(*) FROM service_categories;
```
Should return: 12 categories

### 3. Check Demo Vendors
```sql
SELECT business_name FROM vendor_profiles;
```
Should return: Harare Master Builders, ZimDesign Architects, PowerUp Electrical Services

### 4. Check Demo Profiles
```sql
SELECT full_name, role FROM profiles;
```
Should return 4 users (3 vendors + 1 client)

---

## Next Steps

Once the database is set up:

1. **Update your `.env.local` file**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test the application**:
   - Visit http://localhost:3000
   - Try logging in with a demo account
   - Browse vendors as a client
   - Create portfolio items as a vendor

---

## Database Schema Overview

The NESTS database includes:

- **Authentication & Profiles** (3 tables)
  - `profiles`: Base user profiles
  - `client_profiles`: Client-specific data
  - `vendor_profiles`: Vendor business profiles

- **Services** (2 tables)
  - `service_categories`: Types of services offered
  - `vendor_categories`: Links vendors to their services

- **Portfolio** (2 tables)
  - `portfolios`: Vendor project showcases
  - `portfolio_images`: Portfolio photos

- **Projects & Quotes** (2 tables)
  - `projects`: Client project requests
  - `quotes`: Vendor quotes with line items

All tables have Row Level Security (RLS) enabled for data protection.
