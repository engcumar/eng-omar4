# Eng_Omar Website — Complete Export

## What You're Getting

This package contains the **complete Eng_Omar website** built as a full-stack React application using **TanStack Start**.

### Folder Structure

```
eng-omar-website/
├── 📁 source/                  ← Complete source code (React + TypeScript)
│   ├── src/
│   │   ├── components/         ← Reusable UI components (Header, Footer, etc.)
│   │   ├── components/ui/      ← shadcn/ui component library
│   │   ├── routes/             ← All website pages (home, courses, AI, contact, etc.)
│   │   ├── lib/                ← Utilities, site config, auth logic
│   │   ├── integrations/       ← Supabase client, auth middleware
│   │   ├── assets/             ← Images (hero, AI images, category images)
│   │   ├── styles.css          ← Tailwind CSS configuration
│   │   └── router.tsx          ← App router
│   ├── supabase/migrations/    ← Database schema (all tables, RLS policies, functions)
│   ├── package.json            ← Dependencies & scripts
│   ├── vite.config.ts          ← Build configuration
│   ├── tsconfig.json           ← TypeScript config
│   └── .env.example            ← Environment variables template
│
├── 📁 build/                   ← Production build output (pre-built, ready to deploy)
│   ├── client/                 ← Static assets (JS bundles, CSS, images)
│   └── server/                 ← Server-side rendering bundle (Cloudflare Worker)
│
└── 📁 database/                ← SQL scripts for manual database setup
    └── migrations/             ← All Supabase migrations in order
```

## Technology Stack

- **Frontend:** React 19 + TypeScript + Tailwind CSS v4
- **Framework:** TanStack Start (full-stack React with SSR)
- **UI Library:** shadcn/ui (Radix UI + Tailwind)
- **Backend:** Supabase (PostgreSQL database + Auth + Storage)
- **Auth:** Supabase Auth (Email/Password + Google OAuth)
- **Build Tool:** Vite 7 + Nitro (Cloudflare Worker compatible)

## Hosting Options

### Option 1: Vercel / Netlify / Cloudflare Pages (Recommended)
1. Push the `source/` folder to GitHub
2. Connect your repo to Vercel, Netlify, or Cloudflare Pages
3. Set the environment variables (see `.env.example`)
4. Deploy — the platform will run `bun install && bun run build` automatically

### Option 2: Self-Hosted Server (VPS/Dedicated)
Requirements: Node.js 20+ or Bun runtime

```bash
cd source/
bun install        # or: npm install
bun run build      # or: npm run build
bun run preview    # preview locally
cd ../build/
# Serve the dist/ folder with your web server
```

### Option 3: Static Export (Limited)
This app uses server functions (authentication, database queries, admin dashboard) which require a server. A purely static export will **NOT** support:
- User login / registration
- Course enrollment / payment tracking
- Contact form submissions
- Admin dashboard
- Database features

## Required Environment Variables

Create a `.env` file in the `source/` folder with these values:

```env
# Supabase (your own project — create at supabase.com)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_PROJECT_ID=your-project-id

# Optional: Google OAuth (configure in Supabase Auth → Providers)
# No additional env vars needed — configured in Supabase dashboard
```

## Database Setup

Your website uses these Supabase tables:
- `profiles` — user profiles with approval status
- `user_roles` — admin/moderator/user roles
- `contact_messages` — contact form submissions
- `course_enrollments` — course payment & access tracking

Run the SQL migrations in `database/migrations/` in order on your Supabase project:
1. Go to Supabase Dashboard → SQL Editor
2. Run each migration file from oldest to newest (by timestamp)
3. Or use Supabase CLI: `supabase db reset` with the migration files

## Important Notes

1. **This is NOT a static HTML website.** It is a modern full-stack application. You need a hosting platform that supports server-side rendering OR you can deploy to a serverless platform (Vercel, Netlify, Cloudflare).

2. **Supabase is required.** The app will not function without a connected Supabase project for authentication and database.

3. **Images/Assets:** All images are included in `source/src/assets/`.

4. **Admin Access:** After setting up, the first user can be manually assigned the `admin` role in Supabase by inserting into the `user_roles` table.

## Support

If you need help deploying, the hosting platforms (Vercel, Netlify, Cloudflare) have excellent documentation for deploying React/Node.js applications.

---
**Exported from Lovable** | Eng_Omar Website
