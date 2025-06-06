# 🌐 Domain Hub

<div align="center">

![Domain Hub Logo](https://img.shields.io/badge/🌐-Domain%20Hub-blue?style=for-the-badge)

**Custom Subdomains for Hackers and Builders**

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/domain-hub?style=social)](https://github.com/yourusername/domain-hub/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/domain-hub?style=social)](https://github.com/yourusername/domain-hub/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/domain-hub?style=flat-square)](https://github.com/yourusername/domain-hub/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/domain-hub?style=flat-square)](https://github.com/yourusername/domain-hub/pulls)

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=yourusername.domain-hub)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[🚀 Live Demo](https://domain-hub.build.dev) • [📖 Documentation](https://docs.domain-hub.build.dev) • [🐛 Report Bug](https://github.com/yourusername/domain-hub/issues) • [✨ Request Feature](https://github.com/yourusername/domain-hub/issues)

</div>

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📱 Usage](#-usage)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [👥 Contributors](#-contributors)
- [🙏 Acknowledgments](#-acknowledgments)

## 🌟 Overview

Domain Hub is a modern subdomain marketplace designed specifically for developers, hackers, and builders. It provides instant custom subdomain setup for your projects with zero configuration required. Perfect for hackathons, MVPs, and production deployments.

### 🎯 Why Domain Hub?

- **⚡ Instant Setup**: Connect your projects in under 30 seconds
- **🔒 SSL Included**: Automatic SSL certificates for all domains
- **🌐 Platform Agnostic**: Works with Vercel, Netlify, and custom domains
- **🎨 Professional**: Elevate your project's presentation
- **💰 Developer-Friendly**: Free tier available for hackers and builders

## ✨ Features

### 🔥 Core Features

- **🚀 One-Click Integration**: Seamless connection with popular platforms
  - Vercel Projects
  - Netlify Sites
  - Custom Domains
- **🎨 Modern UI/UX**: Built with Tailwind CSS and Framer Motion
- **🌙 Dark Mode**: Full dark/light theme support
- **📱 Responsive Design**: Mobile-first approach
- **🔐 Authentication**: Secure user authentication with NextAuth.js
- **🗄️ Database**: PostgreSQL with Drizzle ORM
- **🎭 Animations**: Smooth animations with Framer Motion

### 🛠️ Technical Features

- **⚡ Server-Side Rendering**: Next.js 14 with App Router
- **🔧 TypeScript**: Full type safety
- **🎨 Component Library**: Reusable UI components
- **📊 State Management**: Zustand for state management
- **🔒 Security**: bcrypt for password hashing
- **🌐 SEO Optimized**: Meta tags and structured data

## 🖼️ Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Domain+Hub+Homepage)

### 🎯 Domain Card
![Domain Card](https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Domain+Card+Preview)

### 🌙 Dark Mode
![Dark Mode](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Dark+Mode+Interface)

</div>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/domain-hub.git

# Navigate to project directory
cd domain-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🛠️ Installation

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/domain-hub.git
   cd domain-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment**
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/domain_hub"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Add other required environment variables
   ```

5. **Set up the database**
   ```bash
   npx drizzle-kit push:pg
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/domain_hub"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Optional: External Services
VERCEL_API_TOKEN="your-vercel-token"
NETLIFY_API_TOKEN="your-netlify-token"
```

### Database Setup

1. **Install PostgreSQL** on your system
2. **Create a database** named `domain_hub`
3. **Update the DATABASE_URL** in your `.env.local`
4. **Run migrations**:
   ```bash
   npx drizzle-kit push:pg
   ```

## 📱 Usage

### Basic Usage

1. **Browse Available Domains**: Visit the homepage to see available subdomains
2. **Connect Your Project**: Enter your project name and select a domain
3. **Configure Settings**: Set up DNS records and SSL
4. **Launch**: Your project is now live on a custom subdomain

### API Integration

```javascript
// Example: Connect a Vercel project
const response = await fetch('/api/domains/connect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    projectName: 'my-awesome-project',
    domain: 'awesome-project.build.dev',
    platform: 'vercel'
  })
});
```

## 🏗️ Tech Stack

### Frontend
- **⚛️ React 18.3.1** - UI library
- **🔷 Next.js 14.1.0** - React framework
- **📘 TypeScript 5.5.3** - Type safety
- **🎨 Tailwind CSS 3.4.1** - Styling
- **🎭 Framer Motion 12.16.0** - Animations
- **🎯 Lucide React** - Icons

### Backend
- **🟢 Next.js API Routes** - Server-side logic
- **🔐 NextAuth.js 4.24.11** - Authentication
- **🗄️ PostgreSQL** - Database
- **🔧 Drizzle ORM 0.44.2** - Database ORM
- **🔒 bcrypt** - Password hashing

### Development Tools
- **📦 npm/yarn** - Package management
- **🔍 ESLint** - Code linting
- **🎨 Prettier** - Code formatting
- **🏗️ Drizzle Kit** - Database migrations

## 📁 Project Structure

```
domain-hub/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 page.tsx          # Homepage
│   │   ├── 📄 layout.tsx        # Root layout
│   │   └── 📁 api/              # API routes
│   ├── 📁 components/
│   │   ├── 📄 Button.tsx        # Reusable button component
│   │   ├── 📄 DomainCard.tsx    # Domain preview card
│   │   ├── 📄 HeroSection.tsx   # Hero section
│   │   ├── 📄 FeaturesSection.tsx
│   │   ├── 📄 TestimonialsSection.tsx
│   │   └── 📄 Footer.tsx
│   ├── 📁 lib/                  # Utility functions
│   ├── 📁 types/                # TypeScript types
│   └── 📁 styles/               # Global styles
├── 📁 public/                   # Static assets
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 next.config.js
└── 📄 README.md
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Reporting Bugs

1. Check if the bug has already been reported
2. Create a new issue with detailed information
3. Include steps to reproduce the bug
4. Add screenshots if applicable

### ✨ Suggesting Features

1. Check existing feature requests
2. Create a new issue with the `enhancement` label
3. Describe the feature and its benefits
4. Provide examples or mockups if possible

### 🔧 Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 📋 Contribution Guidelines

- Follow the existing code style
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Domain Hub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Contributors

<div align="center">

[![Contributors](https://contrib.rocks/image?repo=yourusername/domain-hub)](https://github.com/yourusername/domain-hub/graphs/contributors)

</div>

### 🏆 Top Contributors

- **[@yourusername](https://github.com/yourusername)** - Project Creator & Maintainer
- **[@contributor1](https://github.com/contributor1)** - Frontend Development
- **[@contributor2](https://github.com/contributor2)** - Backend Development

Want to contribute? Check out our [Contributing Guidelines](#-contributing)!

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - For the amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Vercel](https://vercel.com/)** - For hosting and deployment
- **[Lucide](https://lucide.dev/)** - For the beautiful icons
- **[Framer Motion](https://www.framer.com/motion/)** - For smooth animations

## 📞 Support

- 📧 **Email**: support@domain-hub.build.dev
- 💬 **Discord**: [Join our community](https://discord.gg/domain-hub)
- 🐦 **Twitter**: [@domain_hub](https://twitter.com/domain_hub)
- 📚 **Documentation**: [docs.domain-hub.build.dev](https://docs.domain-hub.build.dev)

---

<div align="center">

**[⬆ Back to Top](#-domain-hub)**

Made with ❤️ by the Domain Hub team

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername/domain-hub)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/domain_hub)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/domain-hub)

</div>