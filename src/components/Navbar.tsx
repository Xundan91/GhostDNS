'use client'; // Mark as client component

import React, { useState, useEffect } from 'react';
import { Command, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-20 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-primary-light/70 dark:bg-primary-dark/70 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Command className="w-8 h-8" />
            <span className="text-xl font-bold">DevDomain</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Features</Link>
            <Link href="#" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">Docs</Link>
            <ThemeToggle />
            <Link href="/login" passHref>
              <Button>Get Started</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full backdrop-blur-md bg-primary-light/90 dark:bg-primary-dark/90 border-t border-secondary-light dark:border-secondary-dark">
            <div className="p-4 space-y-4">
              <Link href="#" className="block hover:text-accent-light dark:hover:text-accent-dark transition-colors">Features</Link>
              <Link href="#" className="block hover:text-accent-light dark:hover:text-accent-dark transition-colors">Pricing</Link>
              <Link href="#" className="block hover:text-accent-light dark:hover:text-accent-dark transition-colors">Docs</Link>
              <Link href="/login" passHref>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;