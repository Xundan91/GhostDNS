'use client';

import React from 'react';
import { ArrowRight, Globe, Zap } from 'lucide-react';

interface ServiceSelectionStepProps {
  configurationData: {
    service: 'vercel' | 'netlify' | '';
  };
  updateConfigurationData: (data: any) => void;
  onNext: () => void;
}

const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  configurationData,
  updateConfigurationData,
  onNext
}) => {
  const services = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy and host your applications with Vercel',
      icon: <Zap className="w-8 h-8" />,
      features: ['Automatic deployments', 'Global CDN', 'Serverless functions', 'Custom domains']
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Build, deploy, and host your sites with Netlify',
      icon: <Globe className="w-8 h-8" />,
      features: ['Continuous deployment', 'Form handling', 'Serverless functions', 'Custom domains']
    }
  ];

  const handleServiceSelect = (service: 'vercel' | 'netlify') => {
    updateConfigurationData({ service });
  };

  const handleNext = () => {
    if (configurationData.service) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          Choose Your Platform
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          Select the platform where your project is hosted
        </p>
      </div>

      {/* Service Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceSelect(service.id as 'vercel' | 'netlify')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              configurationData.service === service.id
                ? 'border-accent-light dark:border-accent-dark bg-accent-light/10 dark:bg-accent-dark/10'
                : 'border-accent-light/20 dark:border-accent-dark/20 hover:border-accent-light/40 dark:hover:border-accent-dark/40'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${
                configurationData.service === service.id
                  ? 'bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark'
                  : 'bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark'
              }`}>
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-accent-light dark:text-accent-dark mb-1">
                  {service.name}
                </h3>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60 mb-3">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-xs text-accent-light/60 dark:text-accent-dark/60 flex items-center">
                      <div className="w-1 h-1 rounded-full bg-accent-light/40 dark:bg-accent-dark/40 mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          disabled={!configurationData.service}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelectionStep; 