# 🚀 Quick Start: Database Setup (5 Minutes)

The fastest way to set up your NESTS database.

## Step 1: Open Supabase SQL Editor (1 min)

1. Go to https://supabase.com/dashboard
2. Open your project: **rxikvjmjiixnowpftnoa**
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

## Step 2: Run Setup Script (2 min)

1. Open the file: `supabase/complete_setup.sql`
2. Copy **ALL** the contents (Cmd+A, Cmd+C)
3. Paste into the SQL Editor (Cmd+V)
4. Click **"Run"** (or press Cmd+Enter)

You should see: ✅ Success. No rows returned

## Step 3: Create Storage Buckets (1 min)

1. Click **"Storage"** in the left sidebar
2. Click **"Create a new bucket"**
3. Create bucket:
   - Name: `avatars`
   - Public: ✅ **ON**
4. Repeat for second bucket:
   - Name: `portfolio-images`
   - Public: ✅ **ON**

## Step 4: Apply Storage Policies (1 min)

1. Go back to **"SQL Editor"**
2. Click **"New Query"**
3. Open file: `supabase/storage_setup.sql`
4. Copy and paste contents
5. Click **"Run"**

## Step 5: Get API Credentials (< 1 min)

1. Click **"Project Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. Copy these values:
   - **Project URL**: `https://rxikvjmjiixnowpftnoa.supabase.co`
   - **anon public key**: (the long string under "Project API keys")

## Step 6: Configure Your App (< 1 min)

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rxikvjmjiixnowpftnoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

## Step 7: Start the App (< 1 min)

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## ✅ Verify It Worked

Go back to Supabase SQL Editor and run:

```sql
-- Should show 9 tables
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should show 12 categories
SELECT COUNT(*) FROM service_categories;

-- Should show 3 vendors
SELECT COUNT(*) FROM vendor_profiles;
```

Expected results:
- First query: **9** (tables)
- Second query: **12** (service categories)
- Third query: **3** (demo vendors)

---

## 🎉 You're Done!

### Test Login with Demo Accounts:

**Vendors:**
- vendor1@demo.com / demo123 (Harare Master Builders)
- vendor2@demo.com / demo123 (ZimDesign Architects)
- vendor3@demo.com / demo123 (PowerUp Electrical Services)

**Client:**
- client1@demo.com / demo123 (Grace Mutasa)

---

## 🆘 Having Issues?

### "getaddrinfo ENOTFOUND" error
→ Your Supabase project might be paused. Check dashboard and unpause it.

### "relation does not exist" error
→ SQL script didn't run successfully. Try again in SQL Editor.

### Tables exist but no data
→ Check if the INSERT statements ran. Look for errors in SQL Editor output.

### Can't log in with demo accounts
→ Check auth.users table. If empty, re-run the setup script.

### More help needed?
→ See full documentation in `supabase/SETUP_GUIDE.md`

---

## 📚 What You Got

After this quick setup:

✅ **9 Database Tables** with relationships and security policies
✅ **12 Service Categories** (Architect, Electrician, etc.)
✅ **3 Demo Vendors** with complete profiles
✅ **5 Portfolio Projects** with descriptions
✅ **1 Demo Client** with an active project
✅ **1 Sample Quote** with detailed line items
✅ **Storage Buckets** for avatars and portfolio images
✅ **Row Level Security** enabled and configured

---

**Total time: ~5-7 minutes** ⏱️

Now start building! 🏗️🇿🇼
