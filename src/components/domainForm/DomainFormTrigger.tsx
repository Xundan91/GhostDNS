'use client';

import React, { useState } from 'react';
import { DollarSign, Plus } from 'lucide-react';
import DomainFormModal from './DomainFormModel';

interface DomainFormTriggerProps {
  variant?: 'card' | 'button' | 'sidebar';
  className?: string;
}

const DomainFormTrigger: React.FC<DomainFormTriggerProps> = ({ 
  variant = 'button',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  if (variant === 'card') {
    return (
      <>
        <div 
          onClick={handleClick}
          className={`group cursor-pointer bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-400/10 dark:to-blue-400/10 rounded-2xl p-6 border border-emerald-200/20 dark:border-emerald-400/20 hover:border-emerald-300/30 dark:hover:border-emerald-300/30 transition-all duration-300 hover:scale-105 backdrop-blur-xl ${className}`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-400/20 transition-colors">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Have a domain? Make money from it</h3>
              <p className="text-sm opacity-70">List your domain and start earning today</p>
            </div>
            <Plus className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <DomainFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // if (variant === 'sidebar') {
  //   return (
  //     <>
  //       <button
  //         onClick={handleClick}
  //         className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-400/10 dark:to-blue-400/10 border border-emerald-200/20 dark:border-emerald-400/20 hover:border-emerald-300/30 dark:hover:border-emerald-300/30 transition-all duration-300 group ${className}`}
  //       >
  //         <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
  //         <span className="text-sm font-medium">Have a domain? Make money from it</span>
  //       </button>
  //       <DomainFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  //     </>
  //   );
  // }

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
      >
        <DollarSign className="w-5 h-5" />
        <span>Have a domain? Make money from it</span>
      </button>
      <DomainFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default DomainFormTrigger;