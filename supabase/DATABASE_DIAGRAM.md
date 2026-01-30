# NESTS Database Schema Diagram

## Visual Database Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION LAYER                          │
│                     (Managed by Supabase Auth)                       │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       auth.users                              │  │
│  │  • id (UUID)                                                  │  │
│  │  • email                                                      │  │
│  │  • encrypted_password                                         │  │
│  │  • raw_user_meta_data (JSONB)                                │  │
│  └────────────────────────────┬─────────────────────────────────┘  │
└─────────────────────────────────┼─────────────────────────────────────┘
                                  │
                                  │ 1:1 (auto-created via trigger)
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                          USER PROFILES                               │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                        profiles                               │  │
│  │  • id (UUID) PRIMARY KEY                                      │  │
│  │  • role (TEXT) - 'client' or 'vendor'                        │  │
│  │  • full_name (TEXT)                                          │  │
│  │  • phone (TEXT)                                              │  │
│  │  • avatar_url (TEXT)                                         │  │
│  │  • created_at, updated_at                                    │  │
│  └────────────┬────────────────────────────────┬────────────────┘  │
└───────────────┼────────────────────────────────┼────────────────────┘
                │                                 │
         1:1    │                                 │    1:1
                ↓                                 ↓
   ┌────────────────────────┐        ┌───────────────────────────┐
   │   client_profiles      │        │   vendor_profiles         │
   │  • id (UUID) PK        │        │  • id (UUID) PK           │
   │  • user_id (UUID) FK   │        │  • user_id (UUID) FK      │
   │  • current_residence   │        │  • business_name (TEXT)   │
   │  • target_city         │        │  • bio (TEXT)             │
   │  • created_at          │        │  • service_areas (TEXT[]) │
   │  • updated_at          │        │  • verification_status    │
   └───────────┬────────────┘        │  • created_at, updated_at │
               │                     └────┬──────────┬────────────┘
               │                          │          │
               │                          │          │
               │                     1:n  │          │  n:m
               │                          ↓          ↓
               │              ┌──────────────────────────────────┐
               │              │      portfolios                   │
               │              │  • id (UUID) PK                   │
               │              │  • vendor_id (UUID) FK            │
               │              │  • project_name (TEXT)            │
               │              │  • description (TEXT)             │
               │              │  • location (TEXT)                │
               │              │  • created_at, updated_at         │
               │              └────────┬─────────────────────────┘
               │                       │
               │                  1:n  │
               │                       ↓
               │              ┌──────────────────────────────────┐
               │              │   portfolio_images                │
               │              │  • id (UUID) PK                   │
               │              │  • portfolio_id (UUID) FK         │
               │              │  • image_url (TEXT)               │
               │              │  • caption (TEXT)                 │
               │              │  • display_order (INT)            │
               │              │  • created_at                     │
               │              └───────────────────────────────────┘
               │
               │                     ┌──────────────────────────────┐
               │                     │   vendor_categories          │
               │                     │  (Junction Table)            │
               │                     │  • vendor_id (UUID) FK PK    │
               │                     │  • category_id (UUID) FK PK  │
               │                     └────────┬─────────────────────┘
               │                              │
               │                         n:m  │
               │                              ↓
               │                     ┌──────────────────────────────┐
               │                     │   service_categories         │
               │                     │  • id (UUID) PK              │
               │                     │  • name (TEXT)               │
               │                     │  • slug (TEXT) UNIQUE        │
               │                     │  • icon_url (TEXT)           │
               │                     │  • created_at                │
               │                     └──────────────────────────────┘
               │
               │ 1:n
               ↓
   ┌───────────────────────────────────────────────┐
   │              projects                          │
   │  • id (UUID) PK                               │
   │  • client_id (UUID) FK                        │
   │  • vendor_id (UUID) FK (nullable)             │
   │  • project_name (TEXT)                        │
   │  • location (TEXT)                            │
   │  • description (TEXT)                         │
   │  • status (TEXT)                              │
   │    - 'seeking_quotes'                         │
   │    - 'in_progress'                            │
   │    - 'completed'                              │
   │    - 'cancelled'                              │
   │  • created_at, updated_at                     │
   └────────────────┬──────────────────────────────┘
                    │
               1:n  │
                    ↓
   ┌───────────────────────────────────────────────┐
   │              quotes                            │
   │  • id (UUID) PK                               │
   │  • project_id (UUID) FK                       │
   │  • vendor_id (UUID) FK                        │
   │  • line_items (JSONB)                         │
   │    [                                          │
   │      {                                        │
   │        "item": "Foundation",                  │
   │        "description": "...",                  │
   │        "quantity": 1,                         │
   │        "unit": "lot",                         │
   │        "unitPrice": 25000,                    │
   │        "total": 25000                         │
   │      },                                       │
   │      ...                                      │
   │    ]                                          │
   │  • total_amount (NUMERIC)                     │
   │  • timeline_days (INT)                        │
   │  • notes (TEXT)                               │
   │  • status (TEXT)                              │
   │    - 'pending'                                │
   │    - 'submitted'                              │
   │    - 'accepted'                               │
   │    - 'rejected'                               │
   │  • created_at, updated_at                     │
   └───────────────────────────────────────────────┘
```

---

## Table Relationships Summary

| Relationship | Type | Description |
|-------------|------|-------------|
| `auth.users` → `profiles` | 1:1 | Each auth user has one profile |
| `profiles` → `client_profiles` | 1:1 | Each client profile extends a user profile |
| `profiles` → `vendor_profiles` | 1:1 | Each vendor profile extends a user profile |
| `vendor_profiles` → `portfolios` | 1:n | Vendor can have many portfolio projects |
| `portfolios` → `portfolio_images` | 1:n | Portfolio can have many images |
| `vendor_profiles` ↔ `service_categories` | n:m | Vendors offer multiple services, services offered by multiple vendors |
| `client_profiles` → `projects` | 1:n | Client can have many projects |
| `projects` → `quotes` | 1:n | Project can receive many quotes |
| `vendor_profiles` → `quotes` | 1:n | Vendor can submit many quotes |

---

## Data Flow Examples

### 1. Client Browsing Vendors

```
User (auth.users)
    └─> Profile (role: 'client')
            └─> Client Profile
                    │
                    └─> Browse: Vendor Profiles (approved)
                            ├─> Service Categories
                            └─> Portfolios
                                    └─> Portfolio Images
```

### 2. Client Creating Project & Receiving Quotes

```
Client Profile
    └─> Create Project
            ├─> Project Details (name, location, description)
            │       └─> Status: 'seeking_quotes'
            │
            └─> Vendors Submit Quotes
                    ├─> Quote 1 (Vendor A)
                    │     ├─> Line Items (JSONB)
                    │     ├─> Total Amount
                    │     └─> Timeline
                    │
                    ├─> Quote 2 (Vendor B)
                    └─> Quote 3 (Vendor C)
                            │
                            └─> Client Accepts Quote
                                    └─> Project Status: 'in_progress'
                                    └─> Project.vendor_id = Vendor C
```

### 3. Vendor Creating Portfolio

```
Vendor Profile
    └─> Create Portfolio Project
            ├─> Project Name
            ├─> Description
            ├─> Location
            └─> Add Images
                    ├─> Image 1 (display_order: 1)
                    ├─> Image 2 (display_order: 2)
                    └─> Image 3 (display_order: 3)
```

---

## Row Level Security (RLS) Policies

### Public Access
- ✅ Anyone can view vendor profiles (approved only)
- ✅ Anyone can view vendor portfolios (approved vendors only)
- ✅ Anyone can view service categories

### Client Access
- ✅ View/update own profile
- ✅ View/create/update own projects
- ✅ View quotes for own projects
- ✅ Update quote status (accept/reject)

### Vendor Access
- ✅ View/update own profile
- ✅ View/create/update own portfolios
- ✅ View projects they're involved with
- ✅ Create/update own quotes
- ✅ View own quotes

---

## Indexes for Performance

Indexes optimize queries on frequently searched columns:

| Table | Column(s) | Type | Purpose |
|-------|-----------|------|---------|
| `vendor_profiles` | `verification_status` | B-tree | Filter approved vendors |
| `vendor_profiles` | `service_areas` | GIN | Search vendors by location |
| `projects` | `client_id` | B-tree | Get client's projects |
| `projects` | `vendor_id` | B-tree | Get vendor's projects |
| `projects` | `status` | B-tree | Filter by project status |
| `quotes` | `project_id` | B-tree | Get quotes for project |
| `quotes` | `vendor_id` | B-tree | Get vendor's quotes |
| `quotes` | `status` | B-tree | Filter by quote status |
| `portfolios` | `vendor_id` | B-tree | Get vendor's portfolios |

---

## Triggers

Automated database operations:

### 1. Auto-Update Timestamps
- **Trigger:** `update_*_updated_at`
- **Tables:** profiles, client_profiles, vendor_profiles, portfolios, projects, quotes
- **Action:** Sets `updated_at = NOW()` on every UPDATE

### 2. Auto-Create Profile on Signup
- **Trigger:** `on_auth_user_created`
- **Table:** auth.users
- **Action:** 
  1. Creates profile record
  2. Creates role-specific profile (client_profiles or vendor_profiles)
  3. Populates data from `raw_user_meta_data`

---

## Storage Buckets

File storage for user-uploaded content:

### avatars
- **Purpose:** User profile pictures
- **Access:** Public read, authenticated write (own files only)
- **Path:** `{user_id}/{filename}`

### portfolio-images
- **Purpose:** Vendor portfolio project photos
- **Access:** Public read, vendor write (own files only)
- **Path:** `{vendor_profile_id}/{filename}`

---

## Sample Data Included

After setup, your database will have:

- ✅ **12 Service Categories** (pre-seeded)
  - General Contractor, Architect, Electrician, Plumber, Roofer, Mason, Painter, Carpenter, Tiler, HVAC Specialist, Landscaper, Interior Designer

- ✅ **3 Demo Vendors** (approved)
  - Harare Master Builders (General Contractor, Mason)
  - ZimDesign Architects (Architect, Interior Designer)
  - PowerUp Electrical Services (Electrician)

- ✅ **5 Portfolio Projects** with descriptions

- ✅ **1 Demo Client** (Grace Mutasa)

- ✅ **1 Sample Project** ("4-Bedroom Family Home")

- ✅ **1 Sample Quote** (from Harare Master Builders with detailed line items)

---

This diagram shows the complete database structure for the NESTS platform, designed to connect diaspora homebuilders with trusted contractors in Zimbabwe.
