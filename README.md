This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## High5 Community Platform

A LinkedIn-style community platform built with Next.js and Firebase.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd High5
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Go to [Firebase Console](https://console.firebase.google.com/)
3. Create a new project or select your existing project
4. Go to Project Settings > General
5. Scroll down to "Your apps" and copy your Firebase configuration
6. Update `.env.local` with your Firebase credentials

**IMPORTANT**: Never commit `.env.local` to git - it contains sensitive credentials!

### 4. Run the development server

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Security Notes

- ✅ Firebase credentials are stored in `.env.local` (not committed to git)
- ✅ `.env.example` provides a template for environment variables
- ✅ `.gitignore` is configured to exclude sensitive files
- ⚠️ If you've already committed sensitive data, you'll need to rotate your Firebase credentials

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important**: When deploying, make sure to add your environment variables in the Vercel dashboard:
- Go to your project settings
- Navigate to "Environment Variables"
- Add all `NEXT_PUBLIC_FIREBASE_*` variables from your `.env.local`

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

