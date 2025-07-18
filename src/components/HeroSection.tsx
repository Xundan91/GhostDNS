 'use client';

import React from 'react';
import Button from './Button';
import DomainCard from './DomainCard';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="relative">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-accent-light via-accent-light to-accent-light/70 dark:from-accent-dark dark:via-accent-dark dark:to-accent-dark/70 bg-clip-text text-transparent drop-shadow-[0_12px_48px_rgba(0,0,0,0.6)] drop-shadow-lg">
                Subdomain Marketplace
              </span>
              <span className="block mt-3 text-2xl md:text-3xl lg:text-4xl font-semibold drop-shadow-[0_8px_36px_rgba(0,0,0,0.5)] drop-shadow text-accent-light dark:text-accent-dark">
                for{' '}
                <span className="relative inline-block">
                  Hackers
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent-light/20 dark:bg-accent-dark/20 rounded-full"></div>
                </span>
                {' '}and{' '}
                <span className="relative inline-block">
                  Builders
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent-light/20 dark:bg-accent-dark/20 rounded-full"></div>
                </span>
              </span>
            </h1>
            <p className="text-xl opacity-80 text-accent-light dark:text-accent-dark">
              Launch your next project with a premium subdomain. Instant setup, zero configuration.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button primary onClick={() => router.push('/dashboard')}>Browse Domains</Button>
              <Button primary={false} onClick={() => router.push('/dashboard')}>Connect Project</Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="transform hover:scale-105 transition-transform duration-500 ease-out">
              <DomainCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;