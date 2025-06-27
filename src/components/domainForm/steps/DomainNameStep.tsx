'use client';

import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';

interface DomainNameStepProps {
  formData: {
    domainName: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

const DomainNameStep: React.FC<DomainNameStepProps> = ({
  formData,
  setFormData,
  onNext
}) => {
  const handleDomainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, domainName: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.domainName.trim()) {
      onNext();
    }
  };

  const isValidDomain = (domain: string) => {
    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(domain) && domain.length > 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
          <Globe className="w-8 h-8 text-accent-light dark:text-accent-dark" />
        </div>
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          What's your domain name?
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          Enter the subdomain you want to list on our marketplace
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="domainName" className="block text-sm font-medium text-accent-light dark:text-accent-dark mb-2">
            Domain Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="domainName"
              value={formData.domainName}
              onChange={handleDomainNameChange}
              placeholder="e.g., api, docs, app"
              className={`w-full px-4 py-3 border border-accent-light/20 dark:border-accent-dark/20 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5 text-accent-light dark:text-accent-dark placeholder-accent-light/40 dark:placeholder-accent-dark/40 focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-200`}
            />
            {formData.domainName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-accent-light/40 dark:text-accent-dark/40">
                .yourdomain.com
              </div>
            )}
          </div>
          {formData.domainName && !isValidDomain(formData.domainName) && (
            <p className="mt-2 text-sm text-red-500">
              Please enter a valid domain name (letters, numbers, and hyphens only)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!formData.domainName.trim() || !isValidDomain(formData.domainName)}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Tips */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-4">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-2">Tips for choosing a domain name:</h3>
        <ul className="text-sm text-accent-light/60 dark:text-accent-dark/60 space-y-1">
          <li>• Keep it short and memorable</li>
          <li>• Use lowercase letters, numbers, and hyphens only</li>
          <li>• Avoid special characters or spaces</li>
          <li>• Make it descriptive of your service</li>
        </ul>
      </div>
    </div>
  );
};

export default DomainNameStep;