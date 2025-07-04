'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyStepProps {
  configurationData: {
    service: 'vercel' | 'netlify' | '';
    vercelapikey: string;
  };
  updateConfigurationData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ApiKeyStep: React.FC<ApiKeyStepProps> = ({
  configurationData,
  updateConfigurationData,
  onNext,
  onPrev
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState('');

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateConfigurationData({ vercelapikey: value });
    if (error) setError('');
  };

  const handleNext = () => {
    if (!configurationData.vercelapikey.trim()) {
      setError('Please enter your API key');
      return;
    }
    
    if (configurationData.service === 'netlify' && !configurationData.vercelapikey.startsWith('nf_')) {
      setError('Netlify API key should start with "nf_"');
      return;
    }

    onNext();
  };

  const getApiKeyInstructions = () => {
    if (configurationData.service === 'vercel') {
      return {
        title: 'Vercel API Key',
        description: 'Enter your Vercel API key to access your projects',
        instructions: [
          'Go to your Vercel dashboard',
          'Navigate to Settings > Tokens',
          'Create a new token with "Full Account" scope',
          'Copy the token (starts with "vercel_")'
        ]
      };
    } else if (configurationData.service === 'netlify') {
      return {
        title: 'Netlify API Key',
        description: 'Enter your Netlify API key to access your sites',
        instructions: [
          'Go to your Netlify dashboard',
          'Navigate to User Settings > Applications',
          'Create a new personal access token',
          'Copy the token (starts with "nf_")'
        ]
      };
    }
    return {
      title: 'API Key',
      description: 'Enter your API key',
      instructions: []
    };
  };

  const instructions = getApiKeyInstructions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
          <Key className="w-8 h-8 text-accent-light dark:text-accent-dark" />
        </div>
        <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-2">
          {instructions.title}
        </h2>
        <p className="text-accent-light/60 dark:text-accent-dark/60">
          {instructions.description}
        </p>
      </div>

      {/* API Key Input */}
      <div className="space-y-4">
        <div>
          <label htmlFor="vercelapikey" className="block text-sm font-medium text-accent-light dark:text-accent-dark mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              id="vercelapikey"
              value={configurationData.vercelapikey}
              onChange={handleApiKeyChange}
              placeholder={`Enter your ${configurationData.service} API key`}
              className={`w-full px-4 py-3 pr-12 border border-accent-light/20 dark:border-accent-dark/20 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5 text-accent-light dark:text-accent-dark placeholder-accent-light/40 dark:placeholder-accent-dark/40 focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-200 font-mono text-sm`}
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4 text-accent-light/60 dark:text-accent-dark/60" />
              ) : (
                <Eye className="w-4 h-4 text-accent-light/60 dark:text-accent-dark/60" />
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      {instructions.instructions.length > 0 && (
        <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-4">
          <h3 className="font-semibold text-accent-light dark:text-accent-dark mb-3">How to get your API key:</h3>
          <ol className="space-y-2 text-sm text-accent-light/60 dark:text-accent-dark/60">
            {instructions.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-light/20 dark:bg-accent-dark/20 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

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
          disabled={!configurationData.vercelapikey.trim()}
          className="flex items-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ApiKeyStep; 