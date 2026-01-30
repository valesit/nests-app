# Manual User Setup Guide

## The Issue
The demo users were created directly in the database, but Supabase requires users to be created through its Auth API for proper password authentication.

## Solution: Two Options

---

## Option 1: Use Service Role Key (Automated) ⭐ Recommended

### Step 1: Get Your Service Role Key

1. Go to https://supabase.com/dashboard
2. Open project: **rxikvjmjiixnowpftnoa**
3. Click **"Project Settings"** (gear icon)
4. Click **"API"**
5. Scroll down to find **"service_role"** key (NOT the anon key)
6. Click the eye icon to reveal it
7. Copy the entire key

### Step 2: Run the User Creation Script

```bash
node scripts/create-demo-users.js YOUR_SERVICE_ROLE_KEY
```

This will properly create all 4 demo accounts with password: `demo123`

---

## Option 2: Manually Create Test Account (Quick) ✅

If you just want to test the app quickly, create one account manually:

### Step 1: Create User in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Open project: **rxikvjmjiixnowpftnoa**
3. Click **"Authentication"** in the left sidebar
4. Click **"Users"** tab
5. Click **"Add user"** button
6. Choose **"Create new user"**
7. Fill in:
   - **Email**: `test@example.com`
   - **Password**: `test123`
   - **Auto Confirm User**: ✅ (Check this box!)
8. Click **"Create user"**

### Step 2: Add User Metadata

After creating the user, you need to add metadata:

1. Click on the newly created user
2. Scroll down to **"User Metadata"** section
3. Click **"Edit"**
4. Add this JSON (for a client):
   ```json
   {
     "full_name": "Test User",
     "role": "client",
     "current_residence": "London, UK",
     "target_city": "Harare",
     "phone": "+44 20 1234 5678"
   }
   ```

   Or this JSON (for a vendor):
   ```json
   {
     "full_name": "Test Vendor",
     "role": "vendor",
     "business_name": "Test Construction",
     "phone": "+263 77 123 4567"
   }
   ```

5. Click **"Save"**

### Step 3: Trigger Profile Creation

The profile should be auto-created by the trigger, but if not:

1. Go to **SQL Editor** in Supabase
2. Run this SQL (replace USER_ID with the actual ID from step 1):

```sql
-- For a client account:
INSERT INTO profiles (id, full_name, phone, role)
VALUES ('USER_ID', 'Test User', '+44 20 1234 5678', 'client');

INSERT INTO client_profiles (user_id, current_residence, target_city)
VALUES ('USER_ID', 'London, UK', 'Harare');

-- OR for a vendor account:
INSERT INTO profiles (id, full_name, phone, role)
VALUES ('USER_ID', 'Test Vendor', '+263 77 123 4567', 'vendor');

INSERT INTO vendor_profiles (user_id, business_name, bio, service_areas)
VALUES ('USER_ID', 'Test Construction', 'Test vendor account', ARRAY['Harare']);
```

### Step 4: Test Login

Now you can log in with:
- **Email**: `test@example.com`
- **Password**: `test123`

---

## Option 3: Sign Up Through the App 🚀 Easiest!

Just use the app's signup flow:

1. Go to http://localhost:3000/auth/signup
2. Fill in the signup form
3. Create your account (it will be auto-confirmed in development)
4. Log in with your new credentials

This is actually the easiest way for testing!

---

## Why This Happened

When we ran the database setup script, we created users directly in the `auth.users` table with encrypted passwords. However, Supabase's authentication system requires users to be created through its API for proper password hashing and session management.

## Next Steps

After creating at least one user with any of these methods, you'll be able to:
- ✅ Log in successfully
- ✅ Browse vendors
- ✅ Create projects
- ✅ Submit quotes
- ✅ Test all features

Choose whichever option is easiest for you!
