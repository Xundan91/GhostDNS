'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Wait until client is mounted
  }, []);

  if (!mounted) return null; // Prevent mismatch during SSR

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-accent-dark" />
      ) : (
        <Moon className="w-5 h-5 text-accent-light" />
      )}
    </button>
  );
};

export default ThemeToggle;
