# Digital Coshk 🛒

A professional, mobile-first digital storefront built with Next.js, optimized for the Egyptian market.

## 🚀 Live Demo


## ✨ Features
- **🌍 Bilingual (EN/AR):** Switch between English and Egyptian Amia with a single click.
- **📱 Mobile First:** Native app-like experience with bottom navigation.
- **🛍️ Cart System:** Add multiple codes and checkout via social chat.
- **🔐 Admin Dashboard:** Fully functional CMS to manage your products, prices, and images.
- **⚡ Fast & Secure:** Powered by Neon PostgreSQL and Clerk Authentication.

## 🛠️ Tech Stack
- **Next.js** (App Router)
- **Tailwind CSS** (UI)
- **Framer Motion** (Animations)
- **Prisma** (ORM)
- **Neon** (Database)
- **Clerk** (Auth)

## 🛠️ Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Esmaill1/digital-coshk
   cd digital-coshk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env.local` file and add:
   ```env
   DATABASE_URL=your_neon_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   ADMIN_USER_ID=your_clerk_id
   ```

4. **Run the app:**
   ```bash
   npm run dev
   ```

## 📝 License
MIT
