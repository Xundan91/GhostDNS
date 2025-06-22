'use client'; // Mark as client component

import React from 'react';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark py-2 px-4 text-center text-sm md:text-base border-b border-accent-light/20 dark:border-accent-dark/20">
      <p className="animate-pulse">
        🎉 We just launched! Claim your custom subdomain for free — limited slots.
      </p>
    </div>
  );
};

export default AnnouncementBar;