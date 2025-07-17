This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Setup

1. Copy the environment variables template:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your actual values:
```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000
NEXT_PUBLIC_PLACEHOLDER_IMAGE_URL=https://your-placeholder-image-url.com/image.svg
```

### Running the Development Server

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

## Environment Variables

This project uses environment variables for configuration. The following variables are required:

- `NEXT_PUBLIC_BACKEND_API_URL`: URL of the main backend API server (default: http://localhost:5000)
- `NEXT_PUBLIC_CHATBOT_API_URL`: URL of the Python chatbot server (default: http://localhost:8000)
- `NEXT_PUBLIC_PLACEHOLDER_IMAGE_URL`: Default placeholder image URL for products

All variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. For sensitive variables that should only be available on the server-side, omit the `NEXT_PUBLIC_` prefix.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
