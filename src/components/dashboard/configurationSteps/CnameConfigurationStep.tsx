'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Link, Copy, Check } from 'lucide-react';

interface CnameConfigurationStepProps {
  configurationData: {
    selectedProject: {
      id: string;
      name: string;
      url: string;
    } | null;
    cname: string;
    domainName: string;
  };
  updateConfigurationData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CnameConfigurationStep: React.FC<CnameConfigurationStepProps> = ({
  configurationData,
  updateConfigurationData,
  onNext,
  onPrev
}) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleCnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateConfigurationData({ cname: value });
    if (error) setError('');
  };

  const handleNext = () => {
    if (!configurationData.cname.trim()) {
      setError('Please enter a CNAME value');
      return;
    }

    // Basic validation for CNAME format
    const cnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    if (!cnameRegex.test(configurationData.cname)) {
      setError('CNAME should only contain letters, numbers, and hyphens');
      return;
    }

    onNext();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const getTargetUrl = () => {
    if (!configurationData.selectedProject) return '';
    
    // Extract domain from project URL
    const url = new URL(configurationData.selectedProject.url);
    return url.hostname;
  };

  const getFullDomain = () => {
    if (!configurationData.cname || !configurationData.domainName) return '';
    return `${configurationData.cname}.${configurationData.domainName}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
          <Link className="w-8 h-8 text-accent-light dark:text-accent-dark" />
        </div>
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          CNAME Configuration
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          Set up the CNAME record to point your domain to your project
        </p>
      </div>

      {/* Project Info */}
      {configurationData.selectedProject && (
        <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-4">
          <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-2">Selected Project</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-accent-light/60 dark:text-accent-dark/60">Name:</span> {configurationData.selectedProject.name}</p>
            <p><span className="text-accent-light/60 dark:text-accent-dark/60">URL:</span> {configurationData.selectedProject.url}</p>
          </div>
        </div>
      )}

      {/* CNAME Input */}
      <div className="space-y-4">
        <div>
          <label htmlFor="cname" className="block text-sm font-medium text-accent-light dark:text-accent-dark mb-2">
            CNAME Value
          </label>
          <div className="relative">
            <input
              type="text"
              id="cname"
              value={configurationData.cname}
              onChange={handleCnameChange}
              placeholder="e.g., api, docs, app"
              className={`w-full px-4 py-3 border border-accent-light/20 dark:border-accent-dark/20 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5 text-accent-light dark:text-accent-dark placeholder-accent-light/40 dark:placeholder-accent-dark/40 focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-200`}
            />
            {configurationData.cname && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-accent-light/40 dark:text-accent-dark/40">
                .{configurationData.domainName}
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* DNS Configuration Preview */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-6">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-4">DNS Configuration</h3>
        
        <div className="space-y-4">
          {/* CNAME Record */}
          <div>
            <h4 className="text-sm font-medium text-accent-light/60 dark:text-accent-dark/60 mb-2">CNAME Record</h4>
            <div className="bg-white/50 dark:bg-black/50 rounded-lg p-3 font-mono text-sm">
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-accent-light/60 dark:text-accent-dark/60">Name:</span>
                  <div className="mt-1 font-medium">{configurationData.cname || 'your-subdomain'}</div>
                </div>
                <div>
                  <span className="text-accent-light/60 dark:text-accent-dark/60">Type:</span>
                  <div className="mt-1 font-medium">CNAME</div>
                </div>
                <div>
                  <span className="text-accent-light/60 dark:text-accent-dark/60">Value:</span>
                  <div className="mt-1 font-medium">{getTargetUrl() || 'your-project-url'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Domain Preview */}
          {configurationData.cname && (
            <div>
              <h4 className="text-sm font-medium text-accent-light/60 dark:text-accent-dark/60 mb-2">Your Domain</h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/50 dark:bg-black/50 rounded-lg p-3 font-mono text-sm">
                  {getFullDomain()}
                </div>
                <button
                  onClick={() => copyToClipboard(getFullDomain())}
                  className="p-2 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-accent-light/60 dark:text-accent-dark/60" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-4">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-3">Next Steps:</h3>
        <ol className="space-y-2 text-sm text-accent-light/60 dark:text-accent-dark/60">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
              1
            </span>
            <span>Add the CNAME record to your DNS provider</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
              2
            </span>
            <span>Wait for DNS propagation (can take up to 24 hours)</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
              3
            </span>
            <span>Your domain will be automatically configured</span>
          </li>
        </ol>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onPrev}
          className="flex items-center space-x-2 px-6 py-3 border border-accent-light/20 dark:border-accent-dark/20 text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 rounded-lg font-semibold transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!configurationData.cname.trim()}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CnameConfigurationStep; 