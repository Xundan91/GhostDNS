'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { FormData } from '../DomainFormModel';

interface DomainNameStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const DomainNameStep: React.FC<DomainNameStepProps> = ({
  formData,
  updateFormData, 
  onNext
}) => {
  const [domainName, setDomainName] = useState(formData.domainName);
  const [error, setError] = useState('');

  const validateDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleNext = () => {
    if (!domainName.trim()) {
      setError('Please enter a domain name');
      return;
    }

    if (!validateDomain(domainName)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }

    setError('');
    updateFormData({ domainName });
    onNext();
  };

  const handleInputChange = (value: string) => {
    setDomainName(value);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 mb-4">
          <Globe className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">What's your domain name?</h3>
        <p className="text-sm opacity-70">Enter the domain you want to list on our marketplace</p>
      </motion.div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={domainName}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="random.com"
            className={`w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border ${
              error ? 'border-red-500' : 'border-white/10 dark:border-white/5'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200`}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
        </div>

        <motion.button
          onClick={handleNext}
          disabled={!domainName.trim()}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
          whileHover={{ scale: domainName.trim() ? 1.02 : 1 }}
          whileTap={{ scale: domainName.trim() ? 0.98 : 1 }}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default DomainNameStep;