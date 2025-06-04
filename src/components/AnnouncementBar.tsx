'use client'; // Mark as client component

import React from 'react';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-dark-700 text-light-100 py-2 px-4 text-center text-sm md:text-base border-b border-dark-500">
      <p className="animate-pulse">
        🎉 We just launched! Claim your custom subdomain for free — limited slots.
      </p>
    </div>
  );
};

export default AnnouncementBar;