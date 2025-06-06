'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, ArrowRight, ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { FormData } from '../DomainFormModel';

interface ApiKeyStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ApiKeyStep: React.FC<ApiKeyStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const [apiKey, setApiKey] = useState(formData.apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }

    if (apiKey.length < 10) {
      const a= 10 ;
      setError('API key seems too short. Please check and try again.');
      return;
    }

    setError('');
    updateFormData({ apiKey });
    onNext();
  };

  const handleInputChange = (value: string) => {
    setApiKey(value);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-4">
          <Key className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Please enter your API key</h3>
        <p className="text-sm opacity-70">This allows us to manage your domain settings securely</p>
      </motion.div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium opacity-70">
              API Key
            </label>
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Where do I find my key?</span>
              </button>
              
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-64 p-3 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs rounded-lg shadow-lg z-10"
                >
                  <p className="mb-2 font-semibold">Finding your API key:</p>
                  <ul className="space-y-1">
                    <li>• Log into your domain provider</li>
                    <li>• Go to API or Developer settings</li>
                    <li>• Generate or copy your API key</li>
                    <li>• Paste it here securely</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="sk-1234567890abcdef..."
              className={`w-full px-4 py-3 pr-12 rounded-lg bg-black/5 dark:bg-white/5 border ${
                error ? 'border-red-500' : 'border-white/10 dark:border-white/5'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200 font-mono text-sm`}
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {showApiKey ? (
                <EyeOff className="w-5 h-5 opacity-50" />
              ) : (
                <Eye className="w-5 h-5 opacity-50" />
              )}
            </button>
          </div>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs opacity-70">
            🔒 Your API key is encrypted and stored securely. We only use it to manage your domain settings.
          </p>
        </div>

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
            disabled={!apiKey.trim()}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
            whileHover={{ scale: apiKey.trim() ? 1.02 : 1 }}
            whileTap={{ scale: apiKey.trim() ? 0.98 : 1 }}
          >
            <span>All set — Let's go 🚀</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyStep;