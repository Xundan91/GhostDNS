'use client';

import React from 'react';

const AuthLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-accent-light/10 dark:border-accent-dark/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="animate-pulse">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-8">
              <div className="text-center space-y-4">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>

            {/* Sort Button */}
            <div className="animate-pulse">
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>

          {/* Results Count */}
          <div className="animate-pulse">
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Domain Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6 relative">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Domain Name */}
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 pr-20"></div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  {/* Platform */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  
                  {/* Listed Date */}
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <div className="animate-pulse">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLoadingSkeleton; 