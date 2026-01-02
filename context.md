# Digital Coshk - Project Context

## Overview
Digital Coshk is a modern, bilingual (English/Arabic) online store specializing in digital codes, gift cards, and subscriptions. It is optimized for mobile users and features a manual checkout process via social media platforms.

## Architecture
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS + Framer Motion (Animations)
- **Database:** Neon (Serverless PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Clerk (User management & Admin protection)
- **Deployment:** Vercel

## Core Features
1. **Bilingual Support:** Full English and Egyptian Arabic (Amia) support with RTL layout switching.
2. **Shopping Cart:** Persistent local storage cart with a bulk-checkout message generator.
3. **Manual Checkout:** Integrated buttons to send order details via Facebook Messenger or Reddit.
4. **Admin Panel:** Secured `/admin` dashboard for the owner to manage products (CRUD).
5. **Rich Text Editing:** Admin can use a formatting bar for product descriptions.
6. **Image Management:** Support for image uploads (stored as Base64) and external URLs.
7. **Mobile Optimized:** Custom bottom navigation bar and touch-friendly UI for mobile users.

## Security
- **Admin Protection:** Middleware restricts `/admin` and sensitive API routes to a specific `ADMIN_USER_ID`.
- **Content Security Policy:** Configured in `next.config.ts` to safely handle external SVGs and images.
- **Environment Variables:** All secrets (Database, Clerk) are managed through environment variables.

## Future Roadmap
- [ ] Floating WhatsApp support button.
- [ ] User "My Orders" history page.
- [ ] Product search and category filtering.
- [ ] Customer review submission system.
- [ ] FAQ / "How it Works" section.
