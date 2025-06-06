'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { FormData } from '../DomainFormModel';

interface SuccessStepProps {
  formData: FormData;
  onClose: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ formData, onClose }) => {
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        {/* Sparkle animations */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Sparkles className="w-5 h-5 text-blue-500" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">
          🎉 You have successfully registered your domain!
        </h3>
        <p className="text-sm opacity-70 mb-6">
          Your domain <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formData.domainName}</span> is now listed on our marketplace
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border border-emerald-200/20 dark:border-emerald-400/20"
      >
        <h4 className="font-semibold mb-2">What happens next?</h4>
        <ul className="text-sm opacity-70 space-y-1 text-left">
          <li>✅ Domain verification in progress</li>
          <li>✅ Listing will be live within 24 hours</li>
          <li>✅ You'll receive email notifications for inquiries</li>
          <li>✅ Track performance in your dashboard</li>
        </ul>
      </motion.div>

      <motion.button
        onClick={onClose}
        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Go to Dashboard
      </motion.button>
    </div>
  );
};

export default SuccessStep;