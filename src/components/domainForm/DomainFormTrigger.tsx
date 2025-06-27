'use client';

import React, { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import DomainFormModel from './DomainFormModel';

interface DomainFormTriggerProps {
  variant?: 'button' | 'card';
  className?: string;
  onDomainAdded?: () => void;
}

export const DomainFormTrigger: React.FC<DomainFormTriggerProps> = ({
  variant = 'button',
  className = '',
  onDomainAdded
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onDomainAdded) {
      onDomainAdded();
    }
  };

  if (variant === 'card') {
    return (
      <>
        <div 
          onClick={() => setIsOpen(true)}
          className={`group cursor-pointer bg-accent-light/5 dark:bg-accent-dark/5 rounded-2xl p-6 border border-accent-light/10 dark:border-accent-dark/10 hover:border-accent-light/20 dark:hover:border-accent-dark/20 transition-all duration-300 hover:scale-105 backdrop-blur-xl ${className}`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-accent-light/10 dark:bg-accent-dark/10 group-hover:bg-accent-light/20 dark:group-hover:bg-accent-dark/20 transition-colors">
              <DollarSign className="w-6 h-6 text-accent-light dark:text-accent-dark" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-accent-light dark:text-accent-dark mb-1">
                List Your Domain
              </h3>
              <p className="text-accent-light/60 dark:text-accent-dark/60">
                Share your premium subdomain with the community and start earning
              </p>
            </div>
            <Plus className="w-5 h-5 text-accent-light dark:text-accent-dark group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <DomainFormModel isOpen={isOpen} onClose={handleClose} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
      >
        <Plus className="w-5 h-5" />
        <span>Add Domain</span>
      </button>

      <DomainFormModel isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default DomainFormTrigger;