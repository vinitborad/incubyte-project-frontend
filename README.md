# 🍭 Sweet Shop Frontend

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=internet-explorer)](https://incubyte.vinitborad.com)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#-crafting-tools)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#-crafting-tools)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#-crafting-tools)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#-crafting-tools)


## 🎯 Checkout my craft at: [https://incubyte.vinitborad.com](https://incubyte.vinitborad.com)

</div>

## 🚨 Clarifications

- I dont have used AI to code things, but I have used AI to learn things.
- I have created higly test converaged backend infrastrcutre. And i would love to follow same also on frontend as i had focued more here on creating funtional ui first due to time constraint.
- I would love to spend more time to craft more functionalities in this projects like Auth, Email/Push Notifications, Payment Gateway, Analytics, etc.

### 🔗 Complete Project Ecosystem
This is the frontend repo of our sweet shop:
- 🔧 **Backend**: Check out [incubyte-project-backend](https://github.com/vinitborad/incubyte-project-backend) for backend API built using Express.js & MongoDB
- 🤖 **Chatbot**: Check out [incubyte-project-chatbot](https://github.com/vinitborad/incubyte-project-chatbot) to see our RAG based AI Agent built using LangGraph & OpenAI
- 🎨 **Frontend**: This repository (Next.js/React application)

## ⚡ Crafting Tools

Crafted using Next.js, React, TypeScript, TailwindCSS, Zustand, React Query, and modern UI components:
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS v4, Radix UI components
- **State Management**: Zustand for global state, React Query for server state
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React icons
- **Package Manager**: pnpm

## 🛠️ Features

### Core Functionality
- 🏠 **Beautiful Home Page**: Modern landing page with hero section and sweet showcase
- 🍬 **Sweet Catalog**: Browse and view all available sweets with beautiful card layouts
- 🔍 **Advanced Search & Filtering**: Filter by name, category, and price range with real-time search
- 🛒 **Purchase System**: Buy sweets directly from the catalog with quantity management
- 📦 **Inventory Management**: Admin panel for adding, restocking, and managing sweets
- 🏷️ **Category Management**: Dynamic category filtering and organization
- 🤖 **AI Chatbot Integration**: Embedded chatbot for natural language interaction and purchases
- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations

### Key Pages & Components
- **Home Page**: Hero section with featured sweets and search functionality
- **Inventory Management**: Complete CRUD operations for sweet management
- **AI Chatbot**: Floating chatbot widget for customer assistance

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** package manager
- Running backend API (see [backend repo](https://github.com/vinitborad/incubyte-project-backend))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinitborad/incubyte-project-frontend.git
   cd incubyte-project-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
   NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000
   NEXT_PUBLIC_PLACEHOLDER_IMAGE_URL=https://your-placeholder-image-url.com/image.svg
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (home)/
│   │   ├── layout.tsx             # Home layout wrapper
│   │   ├── page.tsx               # Main home page
│   │   └── inventory/
│   │       └── page.tsx           # Inventory management page
│   ├── actions.ts                 # Server actions
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx    # Landing page hero
│   │   │   └── HomeClient.tsx     # Home page client component
│   │   └── inventory/
│   │       ├── AddSweetDialog.tsx  # Add sweet modal
│   │       ├── Header.tsx         # Inventory header
│   │       └── InventoryClient.tsx # Inventory management
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── dialog.tsx            # Modal component
│   │   ├── form.tsx              # Form components
│   │   ├── input.tsx             # Input component
│   │   └── ...                   # Other UI components
│   ├── Chatbot.tsx               # AI chatbot widget
│   └── Footer.tsx                # Footer component
├── lib/
│   ├── api.ts                    # API client functions
│   ├── store.ts                  # Zustand store setup
│   └── utils.ts                  # Utility functions
├── stores/
│   └── queryProvider.tsx         # React Query provider
├── public/                       # Static assets
├── components.json               # Shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # TailwindCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # You are here! 📍
```

## 🔮 Future Enhancements

Given more time, I would love to extend this frontend with:
- 🔐 **Authentication UI** (Login/Register forms, protected routes)
- 🛒 **Shopping Cart** with persistent state
- 💳 **Payment Integration** UI (Stripe/Razorpay checkout)
- 📊 **Analytics Dashboard** for sales insights
- 🔍 **Advanced Search** with filters and sorting
- 📱 **Progressive Web App** capabilities
- 🌙 **Dark Mode** theme support
- 🧪 **Testing Suite** (Jest, React Testing Library, Cypress)
- ♿ **Accessibility** improvements (ARIA, screen readers)
- 🎨 **Animation Library** integration (Framer Motion)

## 🤝 Contributing

I welcome contributions to make this frontend even better! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Coding Standards
- Follow existing TypeScript and React patterns
- Use proper component composition and hooks
- Maintain consistent styling with TailwindCSS
- Follow Next.js best practices (App Router, Server Components)
- Use meaningful commit messages and component names
- Ensure responsive design principles

## 🎉 Acknowledgments

**Big thanks to [Incubyte Consulting LLP](https://incubyte.co) to made me build this beautiful piece of software.**

## 👨‍💻 About the Developer

### 📬 Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinitborad)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vinitborad)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vinitboradofficial@gmail.com)

</div>

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

*Built with ❤️ by [Vinit Borad](https://github.com/vinitborad) for [Incubyte](https://incubyte.co)*

**🎯 [View Live Demo](https://incubyte.vinitborad.com) | 🔧 [See Backend](https://github.com/vinitborad/incubyte-project-backend) | 🤖 [Try AI Chatbot](https://github.com/vinitborad/incubyte-project-chatbot)**

</div>
