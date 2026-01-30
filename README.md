# NESTS - Build Your Dream Home in Zimbabwe

NESTS connects diaspora homebuilders with trusted local contractors in Zimbabwe. This is a demo MVP showcasing the core functionality of the platform.

## Features

### For Clients (Homebuilders)
- **Browse Vendors**: Search and filter verified contractors by category and location
- **View Portfolios**: See past projects and photos from vendors
- **Request Quotes**: Submit project details and receive detailed quotes
- **Compare & Accept**: Review multiple quotes and accept the best one
- **Secure Payments**: Simulated payment flow with escrow concept

### For Vendors (Contractors)
- **Create Profile**: Build a professional business profile
- **Showcase Work**: Upload portfolio projects with photos
- **Receive Requests**: Get quote requests from potential clients
- **Submit Quotes**: Provide detailed line-item quotes
- **Win Projects**: Get notified when quotes are accepted

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (Auth + Database + Storage)
- **State Management**: React Query
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
cd nests-app
npm install
```

### 2. Set Up Supabase

**🚀 Quick Setup (5 minutes):** Follow [`supabase/QUICK_START.md`](supabase/QUICK_START.md)

**Or detailed instructions:**

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the complete setup script:
   - `supabase/complete_setup.sql` (includes schema + demo data)
3. Create storage buckets:
   - `avatars` (public)
   - `portfolio-images` (public)
4. Run the storage policies from `supabase/storage_setup.sql`

**📚 More resources:**
- [Complete Setup Guide](supabase/SETUP_GUIDE.md) - Multiple setup methods & troubleshooting
- [Database Diagram](supabase/DATABASE_DIAGRAM.md) - Visual schema & relationships
- [Setup Checklist](SETUP_CHECKLIST.md) - Track your progress
- [Setup Summary](DATABASE_SETUP_SUMMARY.md) - Overview of what's included

### 3. Configure Environment

Copy the example env file and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Walkthrough

### Client Flow
1. Sign up as a client at `/auth/signup`
2. Browse vendors at `/vendors`
3. Click on a vendor to view their profile
4. Click "Request Quote" and fill in project details
5. Go to dashboard to see your project
6. When vendor submits a quote, review and accept it
7. Complete the simulated payment

### Vendor Flow
1. Sign up as a vendor at `/auth/signup?role=vendor`
2. Complete your profile at `/vendor/profile`
3. Add portfolio items at `/vendor/portfolio/new`
4. Check dashboard for quote requests
5. Submit detailed quotes with line items
6. See "Won Projects" when quotes are accepted

## Project Structure

```
src/
├── app/
│   ├── auth/           # Login, signup, callback
│   ├── client/         # Client dashboard, projects
│   ├── vendor/         # Vendor dashboard, profile, portfolio, quotes
│   ├── vendors/        # Public vendor marketplace
│   ├── how-it-works/   # Info page
│   └── page.tsx        # Landing page
├── components/         # Reusable components
├── lib/
│   ├── supabase/       # Supabase client configuration
│   └── providers.tsx   # React Query provider
└── types/
    └── database.ts     # TypeScript types
```

## Database Schema

The demo uses 9 tables:
- `profiles` - User profiles (extends auth.users)
- `client_profiles` - Client-specific data
- `vendor_profiles` - Vendor business information
- `service_categories` - Types of services (pre-seeded)
- `vendor_categories` - Many-to-many junction
- `portfolios` - Vendor project showcases
- `portfolio_images` - Portfolio photos
- `projects` - Client projects/quote requests
- `quotes` - Vendor quotes with line items

## Color Theme

The app uses a professional color scheme:
- **Primary**: Deep blue (#14629D) - Trust, reliability
- **Secondary**: Warm amber (#D97706) - Energy, construction
- **Success**: Green (#059669) - Progress, completion
- **Neutrals**: Gray scale for text and backgrounds

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Production Considerations (Post-Demo)

- [ ] Real payment integration (Stripe)
- [ ] Email notifications
- [ ] Milestone tracking with photos
- [ ] Review and rating system
- [ ] Admin verification workflow
- [ ] Mobile app (React Native)

## License

MIT
