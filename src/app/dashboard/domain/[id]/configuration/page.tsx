'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';

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

  // Simulate purchased domain (in real app, fetch actual domain)
  const purchasedDomain = `your-purchased-domain.com`;

  // Fetch purchase and base domain IDs for this domain and user
  useEffect(() => {
    async function fetchPurchaseInfo() {
      try {
        const res = await fetch('/api/purchase');
        const data = await res.json();
        if (res.ok && Array.isArray(data.purchases)) {
          // Find the purchase for this domain
          const found = data.purchases.find((p: any) => p.domain?.id === params.id);
          if (found) {
            setPurchasedomainId(found.purchaseId);
            setBasedomainId(found.domain?.id);
          }
        }
      } catch {}
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
    <div className="w-full min-h-screen bg-white dark:bg-black pt-10 px-4 md:px-12 lg:px-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Configure Domain</h1>
      {/* Stepper Progress */}
      <div className="flex items-center justify-center mb-12">
        {[1,2,3,4,5,6].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center ${step >= s ? 'text-blue-600' : 'text-gray-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-current font-bold ${step === s ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}>{s}</div>
              {i < 5 && <div className={`w-12 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'} mx-1 rounded`}></div>}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Step 1: Platform Selection */}
      {step === 1 && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <h2 className="text-xl font-bold mb-4">Step 1: Where is your deployed project?</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <button
              className={`flex-1 py-4 px-6 rounded-lg border-2 font-semibold text-lg transition-all duration-200 ${platform === 'vercel' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-400'}`}
              onClick={() => handlePlatformSelect('vercel')}
            >
              Vercel
            </button>
            <button
              className={`flex-1 py-4 px-6 rounded-lg border-2 font-semibold text-lg transition-all duration-200 ${platform === 'netlify' ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-300 hover:border-green-400'}`}
              onClick={() => handlePlatformSelect('netlify')}
            >
              Netlify
            </button>
          </div>
        </div>
      )}
      {/* Step 2: API Key Input */}
      {step === 2 && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <h2 className="text-xl font-bold mb-4">Step 2: Enter your {platform === 'vercel' ? 'Vercel' : 'Netlify'} API Key</h2>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-accent-light/5 dark:bg-accent-dark/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-green-500/20 mb-3"
            placeholder={platform === 'vercel' ? 'Vercel API Key' : 'Netlify API Key'}
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded p-3">
            {platform === 'vercel' ? HOW_TO_FIND_VERCEL : HOW_TO_FIND_NETLIFY}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="py-2 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
              onClick={handleApiKeyNext}
              disabled={loadingProjects}
            >
              {loadingProjects ? <Loader2 className="animate-spin w-5 h-5" /> : 'Next'}
            </button>
            <button
              type="button"
              className="py-2 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={handleBack}
            >
              <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
            </button>
          </div>
          {fetchProjectsError && <div className="text-red-500 mt-2">{fetchProjectsError}</div>}
        </div>
      )}
      {/* Step 3: Show Vercel Projects */}
      {step === 3 && platform === 'vercel' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <h2 className="text-xl font-bold mb-4">Step 3: Select a Vercel Project</h2>
          {projects.length === 0 ? (
            <div className="text-gray-500">No projects found for this API key.</div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <li key={project.id} className="p-5 border rounded-lg bg-gray-50 dark:bg-gray-900 flex flex-col gap-2">
                  <span className="font-semibold text-lg">{project.name}</span>
                  <span className="text-xs text-gray-500 break-all">ID: {project.id}</span>
                  <span className="text-xs text-gray-500 break-all">Framework: {project.framework || 'Unknown'}</span>
                  <button className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => handleSelectProject(project)}>Select</button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="mt-6 py-2 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            onClick={handleBack}
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
          </button>
        </div>
      )}
      {/* Step 4: Show deployed link and ask for CNAME */}
      {step === 4 && selectedProject && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <h2 className="text-xl font-bold mb-4">Step 4: Project Deployment</h2>
          <div className="mb-4">
            <span className="block text-sm text-gray-600 mb-1">Deployed Link:</span>
            <a
              href={getVercelDeployedUrl(selectedProject)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {getVercelDeployedUrl(selectedProject)}
            </a>
          </div>
          <button
            className="mb-8 py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setStep(5)}
          >
            Next
          </button>
          <button
            type="button"
            className="py-2 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            onClick={handleBack}
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
          </button>
        </div>
      )}
      {/* Step 5: Add CNAME */}
      {step === 5 && selectedProject && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <form onSubmit={handleCnameSubmit}>
            <h3 className="text-xl font-bold mb-4">Step 5: Add CNAME for <span className="text-blue-600">{selectedProject?.name}</span></h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Enter CNAME</label>
              <input
                type="text"
                value={cname}
                onChange={e => setCname(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-accent-light/5 dark:bg-accent-dark/5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. cname.vercel-dns.com"
              />
              {cnameError && <div className="text-red-500 mt-1">{cnameError}</div>}
            </div>
            <div className="mb-6">
              <span className="text-sm text-gray-600">Purchased Domain: <span className="font-semibold">{purchasedDomain}</span></span>
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300">Next</button>
              <button
                type="button"
                className="py-3 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
                onClick={handleBack}
              >
                <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Step 6: Show build log/summary and final submit */}
      {step === 6 && selectedProject && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 text-center">
          <div className="mt-8 bg-black text-green-400 font-mono text-sm rounded-lg p-6 overflow-x-auto shadow-lg border border-gray-800 w-full">
            <pre>{buildLog}</pre>
          </div>
          <button
            className="mt-6 w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handleFinalSubmit}
            disabled={submitStatus === 'loading'}
          >
            {submitStatus === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle className="w-5 h-5" />} Submit
          </button>
          {submitStatus === 'success' && <div className="mt-4 text-green-600 text-center font-bold text-lg">🎉 {submitMsg}</div>}
          {submitStatus === 'error' && <div className="mt-4 text-red-600 text-center font-bold text-lg">{submitMsg}</div>}
          <button
            type="button"
            className="mt-4 py-2 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-200"
            onClick={handleBack}
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Back
          </button>
        </div>
      )}
    </div>
  );
} 