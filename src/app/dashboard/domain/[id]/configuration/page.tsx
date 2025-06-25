'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, ArrowLeft, Server, Key, Globe, Settings, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HOW_TO_FIND_VERCEL = `Go to your Vercel dashboard > Settings > Tokens > Create or copy your API token.`;
const HOW_TO_FIND_NETLIFY = `Go to your Netlify dashboard > User Settings > Applications > Personal access tokens.`;

function getVercelDeployedUrl(project: any) {
  // Try to get the production deployment URL if available
  if (project?.latestDeployments?.length > 0) {
    return project.latestDeployments[0].url.startsWith('http')
      ? project.latestDeployments[0].url
      : `https://${project.latestDeployments[0].url}`;
  }
  // Fallback: use project name as subdomain
  return `https://${project.name}.vercel.app`;
}

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center mb-12">
    {[1, 2, 3, 4, 5, 6].map((s, i) => (
      <React.Fragment key={s}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center ${currentStep >= s ? 'text-blue-600 dark:text-blue-400' : 'text-gray-300'}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-current font-bold transition-all duration-300
            ${currentStep === s ? 'bg-blue-100 dark:bg-blue-900/30 scale-110' : 
              currentStep > s ? 'bg-blue-500 dark:bg-blue-400 border-none' : ''}`}>
            {currentStep > s ? <Check className="w-5 h-5 text-white" /> : s}
          </div>
          {i < 5 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '3rem' }}
              className={`h-1 ${currentStep > s ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-700'} mx-1 rounded transition-colors duration-300`}
            />
          )}
        </motion.div>
      </React.Fragment>
    ))}
  </div>
);

export default function DomainConfigurationPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [fetchProjectsError, setFetchProjectsError] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [cname, setCname] = useState('');
  const [cnameError, setCnameError] = useState('');
  const [buildLog, setBuildLog] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [purchasedomainId, setPurchasedomainId] = useState<string | null>(null);
  const [basedomainId, setBasedomainId] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle'|'success'|'error'|'loading'>('idle');
  const [submitMsg, setSubmitMsg] = useState('');
  const [existingConfig, setExistingConfig] = useState<any>(null);
  const [configLoading, setConfigLoading] = useState(true);

  // Simulate purchased domain (in real app, fetch actual domain)
  const purchasedDomain = `your-purchased-domain.com`;

  // Fetch purchase and base domain IDs for this domain and user
  useEffect(() => {
    async function fetchPurchaseInfo() {
      try {
        const res = await fetch('/api/purchase');
        const data = await res.json();
        if (res.ok && Array.isArray(data.purchases)) {
          const found = data.purchases.find((p: any) => p.domain?.id === params.id);
          if (found) {
            setPurchasedomainId(found.purchaseId);
            setBasedomainId(found.domain?.id);
            // Fetch configuration for this purchasedomain
            const configRes = await fetch(`/api/configuredomain?purchasedomain=${found.purchaseId}`);
            const configData = await configRes.json();
            setExistingConfig(configData.configuredomain);
          }
        }
      } catch {}
      setConfigLoading(false);
    }
    fetchPurchaseInfo();
  }, [params.id]);

  const handlePlatformSelect = (selected: string) => {
    setPlatform(selected);
    setStep(2);
    setApiKey('');
    setError('');
    setProjects([]);
    setFetchProjectsError('');
    setSelectedProject(null);
    setCname('');
    setCnameError('');
    setBuildLog('');
    setShowSummary(false);
    setSubmitStatus('idle');
    setSubmitMsg('');
  };

  const handleApiKeyNext = async () => {
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }
    setError('');
    if (platform === 'vercel') {
      setLoadingProjects(true);
      setFetchProjectsError('');
      setProjects([]);
      try {
        const res = await fetch('/api/integrations/vercel/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey }),
        });
        const data = await res.json();
        if (!res.ok) {
          setFetchProjectsError(data.error || 'Failed to fetch projects');
        } else {
          setProjects(data.projects || []);
          setStep(3);
        }
      } catch (err) {
        setFetchProjectsError('Failed to fetch projects');
      } finally {
        setLoadingProjects(false);
      }
    } else {
      // For Netlify, just proceed (not implemented)
      // setStep(3);
    }
  };

  const handleSelectProject = (project: any) => {
    setSelectedProject(project);
    setStep(4);
    setCname('');
    setCnameError('');
    setBuildLog('');
    setShowSummary(false);
    setSubmitStatus('idle');
    setSubmitMsg('');
  };

  const handleCnameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cname.trim()) {
      setCnameError('CNAME is required');
      return;
    }
    setCnameError('');
    setShowSummary(false);
    setBuildLog('');
    setSubmitStatus('idle');
    setSubmitMsg('');
    // Move to submit step
    setStep(6);
  };

  // Submit configuration to API
  const handleFinalSubmit = async () => {
    setSubmitStatus('loading');
    setSubmitMsg('');
    // Simulate build log and summary
    const deployedUrl = getVercelDeployedUrl(selectedProject);
    const log = [
      `> Cloning repository from ${deployedUrl}`,
      '> Installing dependencies...',
      '> Running build script...',
      `> Setting CNAME record: ${cname}`,
      '> [Warning] No .env file found, using defaults',
      '> [Info] Optimizing images...',
      '> [Error] (none)',
      '> [Warning] (none)',
      '> Build completed in 12.3s',
      '> Deploying to edge network...',
      '> Deployment Summary:',
      `  - Project: ${selectedProject?.name || 'N/A'}`,
      `  - CNAME: ${cname}`,
      `  - Domain: ${purchasedDomain}`,
      '  - Status: Success',
      '',
      '🎉 Deployment Successful! Your domain is now live.'
    ].join('\n');
    setBuildLog(log);
    setShowSummary(true);
    if (!purchasedomainId || !basedomainId) {
      setSubmitStatus('error');
      setSubmitMsg('Could not find your purchase or base domain info.');
      return;
    }
    try {
      const res = await fetch('/api/configuredomain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basedomain: basedomainId,
          purchasedomain: purchasedomainId,
          domainId: params.id,
          platform,
          apiKey,
          projectId: selectedProject?.id,
          projectName: selectedProject?.name,
          deployedUrl,
          cname
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus('success');
        setSubmitMsg('Configuration saved successfully!');
      } else {
        setSubmitStatus('error');
        setSubmitMsg(data.error || 'Failed to save configuration.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMsg('Failed to save configuration.');
    }
  };

  // Helper for going back a step
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black pt-10 px-4 md:px-12 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Configure Your Domain
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Follow these steps to set up your domain with your preferred platform
        </p>
      </motion.div>

      {/* If loading config, show spinner */}
      {configLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : existingConfig ? (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-2xl font-bold">Domain Already Configured</h2>
          </div>
          <div className="space-y-2 mb-6">
            <div><span className="font-semibold">Platform:</span> {existingConfig.platform}</div>
            <div><span className="font-semibold">Project Name:</span> {existingConfig.project_name}</div>
            <div><span className="font-semibold">CNAME:</span> {existingConfig.cname}</div>
            <div><span className="font-semibold">Deployed URL:</span> <a href={existingConfig.deployed_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{existingConfig.deployed_url}</a></div>
            <div><span className="font-semibold">Configured At:</span> {existingConfig.created_at ? new Date(existingConfig.created_at).toLocaleString() : ''}</div>
          </div>
          <button
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            // onClick={handleEditConfig} // Implement edit logic if needed
          >
            Edit Configuration
          </button>
        </div>
      ) : (
        <>
          <StepIndicator currentStep={step} />
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              {/* Step 1: Platform Selection */}
              {step === 1 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-6">
                    <Server className="w-6 h-6 text-blue-500 mr-3" />
                    <h2 className="text-2xl font-bold">Choose Your Platform</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      onClick={() => handlePlatformSelect('vercel')}
                      className={`group relative overflow-hidden rounded-xl p-6 border-2 transition-all duration-300
                        ${platform === 'vercel'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500'
                        }`}
                    >
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold mb-2">Vercel</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Deploy with Vercel for optimal performance and reliability
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    <button
                      onClick={() => handlePlatformSelect('netlify')}
                      className={`group relative overflow-hidden rounded-xl p-6 border-2 transition-all duration-300
                        ${platform === 'netlify'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-green-400 dark:hover:border-green-500'
                        }`}
                    >
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold mb-2">Netlify</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose Netlify for simplified deployments and great features
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: API Key Input */}
              {step === 2 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-6">
                    <Key className="w-6 h-6 text-blue-500 mr-3" />
                    <h2 className="text-2xl font-bold">Enter API Key</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder={`Enter your ${platform === 'vercel' ? 'Vercel' : 'Netlify'} API key`}
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
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300 border border-blue-100 dark:border-blue-800">
                      <p className="font-medium mb-2">How to find your API key:</p>
                      <p>{platform === 'vercel' ? HOW_TO_FIND_VERCEL : HOW_TO_FIND_NETLIFY}</p>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button
                        onClick={handleBack}
                        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </button>
                      <button
                        onClick={handleApiKeyNext}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!apiKey.trim()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Project Selection */}
              {step === 3 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Globe className="w-6 h-6 text-blue-500 mr-3" />
                      <h2 className="text-2xl font-bold">Select Project</h2>
                    </div>
                    {loadingProjects && <Loader2 className="w-5 h-5 animate-spin text-blue-500" />}
                  </div>
                  
                  {fetchProjectsError ? (
                    <div className="text-center py-8">
                      <p className="text-red-500 mb-4">{fetchProjectsError}</p>
                      <button
                        onClick={handleApiKeyNext}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {projects.map((project: any) => (
                        <motion.button
                          key={project.id}
                          onClick={() => handleSelectProject(project)}
                          className={`group relative overflow-hidden rounded-xl p-6 border-2 text-left transition-all duration-300
                            ${selectedProject?.id === project.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-800 hover:border-blue-400'
                            }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h3 className="text-lg font-semibold mb-1">{project.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{getVercelDeployedUrl(project)}</p>
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={handleBack}
                      className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: CNAME Configuration */}
              {step === 4 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-6">
                    <Settings className="w-6 h-6 text-blue-500 mr-3" />
                    <h2 className="text-2xl font-bold">Configure CNAME</h2>
                  </div>
                  
                  <form onSubmit={handleCnameSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">CNAME Record</label>
                      <input
                        type="text"
                        value={cname}
                        onChange={e => setCname(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Enter CNAME record"
                      />
                      {cnameError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2"
                        >
                          {cnameError}
                        </motion.p>
                      )}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm">
                      <h4 className="font-medium mb-2">Selected Project Details:</h4>
                      <p className="text-gray-600 dark:text-gray-300">Name: {selectedProject?.name}</p>
                      <p className="text-gray-600 dark:text-gray-300">URL: {getVercelDeployedUrl(selectedProject)}</p>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 5: Final Configuration */}
              {step === 6 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center mb-6">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <h2 className="text-2xl font-bold">Finalize Configuration</h2>
                  </div>

                  {showSummary ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                        {buildLog}
                      </div>
                      
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-lg border border-green-200 dark:border-green-800"
                        >
                          <p className="flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {submitMsg}
                          </p>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg border border-red-200 dark:border-red-800"
                        >
                          <p>{submitMsg}</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Configuration Summary</h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                          <li>Platform: {platform}</li>
                          <li>Project: {selectedProject?.name}</li>
                          <li>CNAME: {cname}</li>
                          <li>Domain: {purchasedDomain}</li>
                        </ul>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={handleBack}
                          className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </button>
                        <button
                          onClick={handleFinalSubmit}
                          disabled={submitStatus === 'loading'}
                          className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {submitStatus === 'loading' ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Configuring...
                            </>
                          ) : (
                            'Configure Domain'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
} 