'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import DomainNameStep from './steps/DomainNameStep';
import DomainProviderStep from './steps/DomainProviderStep';
import PricingStep from './steps/PricingStep';
import ApiKeyStep from './steps/ApiKeyStep';
import SuccessStep from './steps/SuccessStep';

interface DomainFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormData {
  domainName: string;
  provider: string;
  customProvider: string;
  pricingType: 'free' | 'paid';
  price: number;
  apiKey: string;
}

const DomainFormModal: React.FC<DomainFormModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    domainName: '',
    provider: '',
    customProvider: '',
    pricingType: 'free',
    price: 0,
    apiKey: ''
  });

  const totalSteps = 5;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      domainName: '',
      provider: '',
      customProvider: '',
      pricingType: 'free',
      price: 0,
      apiKey: ''
    });
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DomainNameStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DomainProviderStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <PricingStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ApiKeyStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <SuccessStep
            formData={formData}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-white/5">
                <div>
                  <h2 className="text-xl font-bold">List Your Domain</h2>
                  <p className="text-sm opacity-60">Step {currentStep} of {totalSteps}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 py-4">
                <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DomainFormModal;