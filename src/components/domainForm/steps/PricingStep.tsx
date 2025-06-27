'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormData } from '../DomainFormModel';

interface PricingStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PricingStep: React.FC<PricingStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const [pricingType, setPricingType] = useState<'free' | 'paid'>(formData.pricingType);
  const [price, setPrice] = useState(formData.price || 0);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (pricingType === 'paid' && (!price || price <= 0)) {
      setError('Please enter a valid price');
      return;
    }

    setError('');
    updateFormData({ 
      pricingType,
      price: pricingType === 'paid' ? price : 0
    });
    onNext();
  };

  const handlePricingTypeChange = (type: 'free' | 'paid') => {
    setPricingType(type);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
          <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Do you want to list it for free or set a price?</h3>
        <p className="text-sm opacity-70">Choose how you want to monetize your domain</p>
      </motion.div>

      <div className="space-y-4">
        {/* Toggle Switch */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`font-medium ${pricingType === 'free' ? 'text-accent-light dark:text-accent-dark' : 'opacity-50'}`}>
            Free
          </span>
          <motion.button
            onClick={() => handlePricingTypeChange(pricingType === 'free' ? 'paid' : 'free')}
            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
              pricingType === 'paid' ? 'bg-accent-light dark:bg-accent-dark' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: pricingType === 'paid' ? 24 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <span className={`font-medium ${pricingType === 'paid' ? 'text-accent-light dark:text-accent-dark' : 'opacity-50'}`}>
            Paid
          </span>
        </div>

        {/* Price Input */}
        {pricingType === 'paid' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium opacity-70">
              Price in USD
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold">$</span>
              <input
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0"
                min="1"
                className={`w-full px-4 py-3 border border-accent-light/20 dark:border-accent-dark/20 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5 text-accent-light dark:text-accent-dark placeholder-accent-light/40 dark:placeholder-accent-dark/40 focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-200`}
              />
            </div>
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
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 rounded-lg font-semibold transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;