'use client';

import React from 'react';
import { UserCircle } from 'lucide-react';

const Account: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-xl bg-indigo-500/10">
          <UserCircle className="w-8 h-8 text-indigo-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your account preferences</p>
        </div>
      </div>
      
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="p-6 rounded-full bg-indigo-500/10 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <UserCircle className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Account settings coming soon</h3>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            We're working on bringing you comprehensive account management features
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account; 