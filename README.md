# Next.js Supabase Auth Financial Management Dashboard

A modern, full-stack web application built with **Next.js (App Router)** and **Supabase**. This project features a robust authentication system (including password reset flows) and a dynamic data dashboard.

## 🛠️ Built With

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lucide](https://img.shields.io/badge/Lucide_Icons-F78166?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

## 🚀 Features

### 🔐 Authentication & Security
* **Sign Up & Sign In**: Secure email/password authentication using Supabase Auth.
* **Advanced Password Validation**: Real-time visual feedback ensuring passwords meet security standards.
* **Forgot Password Flow**: Email-based password recovery system.
* **Secure Reset Password**: Dedicated route with session validation to securely update user credentials.
* **Middleware Protection**: Automatic redirection for unauthenticated users and authenticated users.

### 🎨 UI/UX
* **Modern Design**: Built with **Tailwind CSS**.
* **Glassmorphism**: Trendy UI with backdrop-blur effects and gradients.
* **Interactive Elements**: Toast notifications for success/error messages and loading states.
* **Responsive**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

* **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database & Auth**: [Supabase](https://supabase.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
