'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Globe, Key, Settings, Link } from 'lucide-react';
import ServiceSelectionStep from './configurationSteps/ServiceSelectionStep';
import ApiKeyStep from './configurationSteps/ApiKeyStep';
import ProjectSelectionStep from './configurationSteps/ProjectSelectionStep';
import CnameStep from './configurationSteps/CnameStep';
import ConfigurationSummaryStep from './configurationSteps/ConfigurationSummaryStep';

interface DomainConfigurationProps {
  domainId: string;
}

interface ConfigurationData {
  service: 'vercel' | 'netlify' | '';
  apiKey: string;
  selectedProject: {
    id: string;
    name: string;
    url: string;
  } | null;
  cname: string;
  domainName: string;
}

const DomainConfiguration: React.FC<DomainConfigurationProps> = ({ domainId }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [domainData, setDomainData] = useState<any>(null);
  const [configurationData, setConfigurationData] = useState<ConfigurationData>({
    service: '',
    apiKey: '',
    selectedProject: null,
    cname: '',
    domainName: ''
  });

  const totalSteps = 5;

  useEffect(() => {
    fetchDomainData();
  }, [domainId]);

  const fetchDomainData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/domain/${domainId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch domain data');
      }
      const data = await response.json();
      setDomainData(data.domain);
      setConfigurationData(prev => ({
        ...prev,
        domainName: data.domain.domainName
      }));
    } catch (error) {
      console.error('Error fetching domain data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConfigurationData = (data: Partial<ConfigurationData>) => {
    setConfigurationData(prev => ({ ...prev, ...data }));
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

  const handleSubmitConfiguration = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/configuredomain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainId,
          ...configurationData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }

      // Redirect to domain detail page
      router.push(`/dashboard/domain/${domainId}`);
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !domainData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Domain Configuration</h1>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-light dark:border-accent-dark mx-auto"></div>
          <p className="mt-4 text-accent-light/60 dark:text-accent-dark/60">Loading domain data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Configure Domain</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            Setting up {domainData?.domainName || 'your domain'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Step {currentStep} of {totalSteps}</h2>
          <span className="text-sm text-accent-light/60 dark:text-accent-dark/60">
            {currentStep === 1 && 'Select Service'}
            {currentStep === 2 && 'API Key'}
            {currentStep === 3 && 'Select Project'}
            {currentStep === 4 && 'CNAME Configuration'}
            {currentStep === 5 && 'Review & Submit'}
          </span>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-6">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center space-x-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-accent-light dark:bg-accent-dark border-accent-light dark:border-accent-dark' 
                    : isActive 
                    ? 'border-accent-light dark:border-accent-dark bg-accent-light/10 dark:bg-accent-dark/10' 
                    : 'border-accent-light/20 dark:border-accent-dark/20'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-primary-light dark:text-primary-dark" />
                  ) : (
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-accent-light dark:text-accent-dark' : 'text-accent-light/40 dark:text-accent-dark/40'
                    }`}>
                      {stepNumber}
                    </span>
                  )}
                </div>
                {stepNumber < totalSteps && (
                  <div className={`w-8 h-0.5 ${
                    isCompleted ? 'bg-accent-light dark:bg-accent-dark' : 'bg-accent-light/20 dark:bg-accent-dark/20'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-accent-light/10 dark:bg-accent-dark/10 rounded-full h-2">
          <div 
            className="bg-accent-light dark:bg-accent-dark h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl border border-accent-light/10 dark:border-accent-dark/10 p-8">
        {currentStep === 1 && (
          <ServiceSelectionStep
            configurationData={configurationData}
            updateConfigurationData={updateConfigurationData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <ApiKeyStep
            configurationData={configurationData}
            updateConfigurationData={updateConfigurationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <ProjectSelectionStep
            configurationData={configurationData}
            updateConfigurationData={updateConfigurationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 4 && (
          <CnameStep
            configurationData={configurationData}
            updateConfigurationData={updateConfigurationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 5 && (
          <ConfigurationSummaryStep
            configurationData={configurationData}
            domainData={domainData}
            onSubmit={handleSubmitConfiguration}
            onPrev={prevStep}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default DomainConfiguration; 