'use client'; // Mark as client component

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const DomainCard: React.FC = () => {
  const [projectName, setProjectName] = useState('');
  
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent rounded-2xl p-8 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl">
      <div className="space-y-6">
        {/* Domain Preview */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-black/50 dark:text-white/50">Your Project Name</label>
              <input 
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="awesome-project"
                className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 font-mono text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="font-mono text-sm text-black/40 dark:text-white/40 line-through px-4 py-3">
              {projectName || 'awesome-project'}.vercel.app
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="bg-white/5 dark:bg-black/20 rounded-lg px-4 py-3 font-mono text-sm text-black dark:text-white border border-white/10">
              {projectName || 'awesome-project'}.build.dev
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full group bg-gradient-to-r from-accent-light/10 to-accent-light/5 dark:from-accent-dark/10 dark:to-accent-dark/5 hover:from-accent-light/20 hover:to-accent-light/10 dark:hover:from-accent-dark/20 dark:hover:to-accent-dark/10 rounded-lg px-4 py-3 border border-white/10 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Get Your Custom Domain</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Features */}
        <div className="pt-4 border-t border-white/5">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-xs text-black/50 dark:text-white/50">✓ SSL Included</div>
            <div className="text-xs text-black/50 dark:text-white/50">✓ Instant Setup</div>
            <div className="text-xs text-black/50 dark:text-white/50">✓ Custom Records</div>
            <div className="text-xs text-black/50 dark:text-white/50">✓ 24/7 Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainCard;