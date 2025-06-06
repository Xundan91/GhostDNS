'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormData } from '../DomainFormModel';

interface DomainProviderStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const providers = [
  'Hostinger',
  'GoDaddy',
  'Squarespace',
  'Other'
];

const DomainProviderStep: React.FC<DomainProviderStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const [selectedProvider, setSelectedProvider] = useState(formData.provider);
  const [customProvider, setCustomProvider] = useState(formData.customProvider);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!selectedProvider) {
      setError('Please select a provider');
      return;
    }

    if (selectedProvider === 'Other' && !customProvider.trim()) {
      setError('Please enter your provider name');
      return;
    }

    setError('');
    updateFormData({ 
      provider: selectedProvider,
      customProvider: selectedProvider === 'Other' ? customProvider : ''
    });
    onNext();
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
          <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Where did you purchase your domain?</h3>
        <p className="text-sm opacity-70">This helps us provide better integration support</p>
      </motion.div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {providers.map((provider) => (
            <motion.button
              key={provider}
              onClick={() => handleProviderSelect(provider)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedProvider === provider
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 dark:border-white/5 hover:border-white/20 dark:hover:border-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{provider}</span>
            </motion.button>
          ))}
        </div>

        {selectedProvider === 'Other' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              value={customProvider}
              onChange={(e) => setCustomProvider(e.target.value)}
              placeholder="Enter provider name"
              className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-white/10 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200"
            />
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}

        <div className="flex space-x-3">
          <motion.button
            onClick={onPrev}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!selectedProvider || (selectedProvider === 'Other' && !customProvider.trim())}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            whileHover={{ scale: selectedProvider ? 1.02 : 1 }}
            whileTap={{ scale: selectedProvider ? 0.98 : 1 }}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DomainProviderStep;