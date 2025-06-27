'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { FormData } from '../DomainFormModel';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SuccessStepProps {
  formData: FormData;
  onClose: () => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ formData, onClose }) => {
  const { data: session, status } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('SuccessStep useEffect triggered');
    console.log('Session status:', status);
    console.log('Session data:', session);
    console.log('Form data:', formData);
    console.log('Submitted state:', submitted);

    const submitData = async () => {
      console.log('submitData function called');
      
      if (status === 'unauthenticated') {
        console.log('User is not authenticated');
        setError("Please log in to submit your domain");
        setLoading(false);
        return;
      }

      if (status === 'loading') {
        console.log('Session is still loading');
        return;
      }

      try {
        console.log('Attempting to submit domain data...');
        const response = await axios.post("/api/domain", formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('API Response:', response);
        
        if (response.status === 200) {
          console.log('Domain submitted successfully');
          setSubmitted(true);
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Error submitting the form:", error);
        console.log('Error response:', error.response);
        if (error.response?.status === 401) {
          setError("Please log in to submit your domain");
        } else {
          setError(error.response?.data?.error || "Failed to submit domain. Please try again.");
        }
        setLoading(false);
      }
    };

    if (!submitted && status === 'authenticated') {
      console.log('Conditions met for submission');
      submitData();
    }
  }, [formData, submitted, status, session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">
          {status === 'loading' ? 'Loading session...' : 'Submitting your domain...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => {
            setError("");
            setLoading(true);
            setSubmitted(false);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!submitted) {
    return null;
  }

  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-6">
          <CheckCircle className="w-12 h-12 text-accent-light dark:text-accent-dark" />
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
        <h3 className="text-2xl font-bold mb-2 text-accent-light dark:text-accent-dark">
          🎉 You have successfully registered your domain!
        </h3>
        <p className="text-sm opacity-70 mb-6">
          Your domain <span className="font-semibold text-accent-light dark:text-accent-dark">{formData.domainName}</span> is now listed on our marketplace
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg p-4 border border-accent-light/20 dark:border-accent-dark/20"
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
        className="w-full px-6 py-3 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90 rounded-lg font-semibold transition-all duration-300"
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