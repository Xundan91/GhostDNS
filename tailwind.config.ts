import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        secondary: {
          light: '#F3F4F6',
          dark: '#111111',
        },
        accent: {
          light: '#000000',
          dark: '#FFFFFF',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        dashboard: {
          background: '#f4f4f5', // light gray
          primaryText: '#27272a', // dark gray, nearly black
          subtext: '#52525b', // medium gray
          buttonBg: '#18181b', // black-gray
          buttonText: '#ffffff',
          inputBg: '#ffffff',
          inputBorder: '#e4e4e7',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay-2': 'float 6s ease-in-out infinite 2s',
        'float-delay-4': 'float 6s ease-in-out infinite 4s',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin 20s linear infinite reverse',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;