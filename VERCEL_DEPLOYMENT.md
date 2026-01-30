# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/valesit/nests-app)

## Environment Variables Required

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rxikvjmjiixnowpftnoa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aWt2am1qaWl4bm93cGZ0bm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3ODM1OTksImV4cCI6MjA4NTM1OTU5OX0.QqR30-JmdDgCa2r3DwDPD754l_jYAf11TWiT3GYFOOw
```

## Common Build Errors & Solutions

### Error: "Missing environment variables"
**Solution:** Add the environment variables above in Vercel dashboard

### Error: Build times out
**Solution:** This is a large app. Vercel might need a few minutes on first build.

### Error: TypeScript errors
**Solution:** The build works locally, so this shouldn't happen. If it does:
1. Check Vercel logs for specific error
2. Ensure Node version is 18+ in Vercel settings

## After Deployment

### 1. Update Supabase Settings

Go to your Supabase Dashboard:
1. **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

### 2. Test the Deployment

Visit your site and try logging in with demo accounts:
- Client: `client1@demo.com` / `demo123`
- Vendor: `vendor1@demo.com` / `demo123`

## Troubleshooting

### Check Build Logs
1. Go to Vercel Dashboard → Your Project
2. Click on the failed deployment
3. Scroll down in the build logs to see the actual error
4. The error is usually at the bottom of the logs

### Still Having Issues?

1. **Check environment variables are set** in Vercel
2. **Try redeploying** after adding env vars
3. **Check Supabase project is active** (not paused)
4. **Verify database is set up** (tables exist)

## Manual Deployment Steps

If automatic deployment fails:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Add environment variables when prompted

# For production deployment
vercel --prod
```

## Build Command (if needed)

```bash
npm run build
```

## Install Command (if needed)

```bash
npm install
```

## Output Directory

```
.next
```

## Framework Preset

Next.js

---

## Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] Build completes successfully
- [ ] Site is accessible
- [ ] Supabase redirect URLs updated
- [ ] Can log in with demo accounts
- [ ] Vendor marketplace works
- [ ] Dashboard pages load

---

If deployment still fails, paste the **complete build log** (scroll to the bottom) for more specific help.
