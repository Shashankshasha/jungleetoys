# 🌴 JungleeToys - E-Commerce Toy Store

A modern, scalable e-commerce platform built with Next.js 14, Supabase, and Stripe.

![JungleeToys](https://via.placeholder.com/800x400/22c55e/ffffff?text=JungleeToys)

## ✨ Features

- 🛒 Full e-commerce functionality (cart, checkout, payments)
- 🎨 Beautiful, playful jungle-themed design
- 📱 Fully responsive (mobile, tablet, desktop)
- 💳 Secure Stripe payment integration
- 📦 Product catalog with categories, search, and filters
- 🔒 Admin dashboard for managing products and orders
- 🚀 Optimized for performance (Next.js App Router)
- 🌍 SEO optimized

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **State Management**: Zustand
- **Deployment**: Vercel (recommended)

---

## 🚀 Deployment Guide

### Step 1: Set Up Supabase (Database)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**
3. Fill in:
   - **Name**: `jungleetoys`
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to UK (e.g., London)
4. Wait for project to be created (~2 minutes)
5. Go to **SQL Editor** in the sidebar
6. Copy the contents of `supabase-schema.sql` and paste into the editor
7. Click **"Run"** to create all tables
8. Go to **Settings → API** and copy:
   - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → This is your `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Set Up Stripe (Payments)

1. Go to [stripe.com](https://stripe.com) and create a free account
2. In the Dashboard, make sure you're in **Test Mode** (toggle in sidebar)
3. Go to **Developers → API Keys**
4. Copy:
   - `Publishable key` → This is your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → This is your `STRIPE_SECRET_KEY`
5. Go to **Developers → Webhooks**
6. Click **"Add endpoint"**
7. Enter: `https://your-domain.vercel.app/api/webhook`
8. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
9. Copy the **Signing secret** → This is your `STRIPE_WEBHOOK_SECRET`

### Step 3: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/jungleetoys.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign up with GitHub

3. Click **"New Project"** → Import your `jungleetoys` repository

4. Configure environment variables (click "Environment Variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   ```

5. Click **"Deploy"** - Wait ~2 minutes

6. Your site is live! 🎉

### Step 4: Connect Your Domain (jungleetoys.com)

#### Option A: Update Hostinger DNS to Point to Vercel

1. In **Vercel Dashboard** → Your Project → **Settings → Domains**
2. Add `jungleetoys.com` and `www.jungleetoys.com`
3. Vercel will show you DNS records needed

4. In **Hostinger** → Domains → jungleetoys.com → **DNS Zone**
5. Delete existing A records for @ and www
6. Add new records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```
7. Wait 10-30 minutes for DNS propagation

#### Option B: Use Vercel as Nameserver (Recommended)

1. In Vercel, go to Domains and add `jungleetoys.com`
2. Choose "Use Vercel Nameservers"
3. Vercel will show you nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. In Hostinger, update nameservers to Vercel's
5. Wait 24-48 hours for full propagation

### Step 5: Go Live with Stripe

When ready for real payments:

1. In Stripe Dashboard, click **"Activate your account"**
2. Complete business verification
3. Switch from Test Mode to Live Mode
4. Get new **Live API Keys**
5. Update environment variables in Vercel with live keys
6. Redeploy

---

## 📁 Project Structure

```
jungleetoys/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts    # Stripe checkout API
│   │   ├── products/route.ts    # Products CRUD API
│   │   └── webhook/route.ts     # Stripe webhook handler
│   ├── admin/page.tsx           # Admin dashboard
│   ├── cart/page.tsx            # Cart page
│   ├── checkout/page.tsx        # Checkout flow
│   ├── products/
│   │   ├── page.tsx             # Product listing
│   │   └── [slug]/page.tsx      # Product detail
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── CartDrawer.tsx           # Slide-out cart
│   ├── Footer.tsx               # Site footer
│   ├── Navbar.tsx               # Navigation
│   └── ProductCard.tsx          # Product card component
├── lib/
│   ├── cart.ts                  # Cart state (Zustand)
│   ├── stripe.ts                # Stripe config
│   └── supabase.ts              # Supabase client
├── public/                      # Static assets
├── supabase-schema.sql          # Database schema
├── .env.example                 # Environment template
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Local Development

1. Clone and install:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jungleetoys.git
   cd jungleetoys
   npm install
   ```

2. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   # Fill in your values
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | FREE | Hobby plan: 100GB bandwidth/month |
| Supabase | FREE | 500MB database, 2GB storage |
| Stripe | 1.4% + 20p | Per successful UK card transaction |
| Cloudinary | FREE | 25GB storage (for product images) |
| Domain | £10-15/year | Already owned via Hostinger |

**Monthly Total**: £0 (+ Stripe fees per sale)

---

## 🔧 Customization

### Adding New Products

1. Go to Supabase Dashboard → Table Editor → products
2. Click "Insert row"
3. Fill in product details
4. Or use the Admin panel at `/admin`

### Changing Colors

Edit `tailwind.config.js` - the theme colors:
- `jungle` - Primary green
- `tiger` - Orange accent
- `banana` - Yellow accent
- `parrot` - Cyan accent

### Adding New Categories

1. In Supabase, add to `categories` table
2. Update the `categories` array in:
   - `components/Navbar.tsx`
   - `app/page.tsx`
   - `app/products/page.tsx`

---

## 📱 Admin Access

Visit `/admin` to access the admin dashboard where you can:
- View sales statistics
- Manage products (add/edit/delete)
- Process orders
- Update store settings

**Note**: In production, add authentication (Supabase Auth) to protect the admin area.

---

## 🆘 Troubleshooting

### Payments not working
- Check Stripe API keys are correct
- Ensure webhook URL is set in Stripe Dashboard
- Check Vercel logs for errors

### Database connection issues
- Verify Supabase URL and keys
- Check RLS policies allow access
- Look at Supabase logs

### Images not loading
- Add image domains to `next.config.js`
- Check Cloudinary configuration

---

## 📞 Support

For help, contact:
- Email: hello@jungleetoys.com
- Website: jungleetoys.com

---

Built with ❤️ by Shashank

## 📄 License

MIT License - feel free to use for your own projects!
