'use client';

import React from 'react';
import { ArrowLeft, CheckCircle, Globe, Key, Settings, Link } from 'lucide-react';

interface ConfigurationSummaryStepProps {
  configurationData: {
    service: 'vercel' | 'netlify' | '';
    apiKey: string;
    selectedProject: {
      id: string;
      name: string;
      url: string;
    } | null;
    cname: string;
    domainName: string;
  };
  domainData: any;
  onSubmit: () => void;
  onPrev: () => void;
  loading: boolean;
}

const ConfigurationSummaryStep: React.FC<ConfigurationSummaryStepProps> = ({
  configurationData,
  domainData,
  onSubmit,
  onPrev,
  loading
}) => {
  const getFullDomain = () => {
    if (!configurationData.cname || !configurationData.domainName) return '';
    return `${configurationData.cname}.${configurationData.domainName}`;
  };

  const getTargetUrl = () => {
    if (!configurationData.selectedProject) return '';
    const url = new URL(configurationData.selectedProject.url);
    return url.hostname;
  };

  const summaryItems = [
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Platform',
      value: configurationData.service.charAt(0).toUpperCase() + configurationData.service.slice(1)
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Project',
      value: configurationData.selectedProject?.name || 'Not selected'
    },
    {
      icon: <Link className="w-5 h-5" />,
      label: 'CNAME',
      value: configurationData.cname || 'Not set'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Your Domain',
      value: getFullDomain() || 'Not configured'
    },
    {
      icon: <Link className="w-5 h-5" />,
      label: 'Target URL',
      value: getTargetUrl() || 'Not set'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
          <CheckCircle className="w-8 h-8 text-accent-light dark:text-accent-dark" />
        </div>
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          Review Configuration
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          Review your configuration before submitting
        </p>
      </div>

      {/* Configuration Summary */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-6">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-4">Configuration Summary</h3>
        
        <div className="space-y-4">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 dark:bg-black/50 rounded-lg">
              <div className="flex-shrink-0 p-2 rounded-lg bg-accent-light/10 dark:bg-accent-dark/10">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-accent-light/60 dark:text-accent-dark/60">
                  {item.label}
                </p>
                <p className="text-sm font-mono text-accent-light dark:text-accent-dark truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Record Preview */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-6">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-4">DNS Record to Add</h3>
        
        <div className="bg-white/50 dark:bg-black/50 rounded-lg p-4 font-mono text-sm">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-accent-light/60 dark:text-accent-dark/60">Name:</span>
              <div className="mt-1 font-medium">{configurationData.cname}</div>
            </div>
            <div>
              <span className="text-accent-light/60 dark:text-accent-dark/60">Type:</span>
              <div className="mt-1 font-medium">CNAME</div>
            </div>
            <div>
              <span className="text-accent-light/60 dark:text-accent-dark/60">Value:</span>
              <div className="mt-1 font-medium">{getTargetUrl()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-6">
        <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-4">What happens next?</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mt-0.5">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-accent-light dark:text-accent-dark">Configuration Saved</p>
              <p className="text-xs text-accent-light/60 dark:text-accent-dark/60">Your configuration will be saved to our database</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mt-0.5">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-accent-light dark:text-accent-dark">DNS Setup Required</p>
              <p className="text-xs text-accent-light/60 dark:text-accent-dark/60">You'll need to add the CNAME record to your DNS provider</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mt-0.5">
              3
            </div>
            <div>
              <p className="text-sm font-medium text-accent-light dark:text-accent-dark">Automatic Configuration</p>
              <p className="text-xs text-accent-light/60 dark:text-accent-dark/60">Once DNS propagates, your domain will be automatically configured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onPrev}
          disabled={loading}
          className="flex items-center space-x-2 px-6 py-3 border border-accent-light/20 dark:border-accent-dark/20 text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-light dark:border-primary-dark"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfigurationSummaryStep; 