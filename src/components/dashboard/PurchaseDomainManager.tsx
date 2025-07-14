'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Globe, 
  Key, 
  Link, 
  Loader2, 
  Settings, 
  Terminal,
  Zap,
  Database,
  Network
} from 'lucide-react';

interface PurchaseDomainManagerProps {
  purchaseId: string;
}

interface PurchaseData {
  id: string;
  domainName: string;
  platform: string;
  price: number;
  status: string;
  timestamp: string;
  domain: {
    id: string;
    domainName: string;
    platform: string;
  };
}

interface Project {
  id: string;
  name: string;
  url: string;
  framework: string;
}

const PurchaseDomainManager: React.FC<PurchaseDomainManagerProps> = ({ purchaseId }) => {
  const router = useRouter();
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Completed, setStep1Completed] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [existingProject, setExistingProject] = useState<any>(null);
  const [existingCname, setExistingCname] = useState<any>(null);

  // Step 1: Connect Project
  const [platform, setPlatform] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fetchingProjects, setFetchingProjects] = useState(false);
  const [connectingProject, setConnectingProject] = useState(false);

  // Step 2: Add CNAME
  const [cnameValue, setCnameValue] = useState('');
  const [addingCname, setAddingCname] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [serviceProgress, setServiceProgress] = useState<{
    hostinger: { status: 'idle' | 'updating' | 'success' | 'error'; message: string };
    vercel: { status: 'idle' | 'updating' | 'success' | 'error'; message: string };
  }>({
    hostinger: { status: 'idle', message: '' },
    vercel: { status: 'idle', message: '' }
  });

  useEffect(() => {
    fetchPurchaseData();
  }, [purchaseId]);

  const fetchPurchaseData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/purchase/${purchaseId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch purchase data');
      }
      const data = await response.json();
      setPurchaseData(data.purchase);
      
      // Check if steps are already completed
      checkStepsStatus();
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkStepsStatus = async () => {
    try {
      // Check if project is connected
      const connectResponse = await fetch(`/api/connectproject?purchaseId=${purchaseId}`);
      if (connectResponse.ok) {
        const connectData = await connectResponse.json();
        if (connectData.project) {
          setExistingProject(connectData.project);
          setStep1Completed(true);
          setCurrentStep(2);
          
          // Pre-fill form with existing data
          setPlatform(connectData.project.platform);
          setApiKey(connectData.project.connectApiKey || '');
        }
      }

      // Check if CNAME is added
      const cnameResponse = await fetch(`/api/cnameupdated?purchaseId=${purchaseId}`);
      if (cnameResponse.ok) {
        const cnameData = await cnameResponse.json();
        if (cnameData.cname) {
          setExistingCname(cnameData.cname);
          setStep2Completed(true);
          
          // Pre-fill CNAME form
          setCnameValue(cnameData.cname.cname);
        }
      }
    } catch (error) {
      console.error('Error checking steps status:', error);
    }
  };

  const fetchProjects = async () => {
    if (!platform || !apiKey) return;

    try {
      setFetchingProjects(true);
      const response = await fetch('/api/integrations/vercel/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          service: platform.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setFetchingProjects(false);
    }
  };

  const connectProject = async () => {
    if (!selectedProject || !purchaseData) return;

    try {
      setConnectingProject(true);
      setError(null);
      
      const method = existingProject ? 'PUT' : 'POST';
      const response = await fetch('/api/connectproject', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchaseId: purchaseId,
          platform: platform,
          apiKey: apiKey,
          projectId: selectedProject.id,
          projectName: selectedProject.name,
          deployedUrl: selectedProject.url,
          existingProjectId: existingProject?.id, // For updates
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to connect project');
      }

      const result = await response.json();
      setExistingProject(result.project);
      setStep1Completed(true);
      setCurrentStep(2);
      setSuccess(existingProject ? 'Project updated successfully!' : 'Project connected successfully!');
    } catch (error) {
      console.error('Error connecting project:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect project');
    } finally {
      setConnectingProject(false);
    }
  };

  const addCname = async () => {
    if (!cnameValue || !purchaseData) return;

    try {
      setAddingCname(true);
      setError(null);
      setServiceProgress({
        hostinger: { status: 'idle', message: '' },
        vercel: { status: 'idle', message: '' }
      });
      
      const deployedUrl = `${cnameValue}.${purchaseData.domain.domainName}`;
      
      const method = existingCname ? 'PUT' : 'POST';
      const response = await fetch('/api/cnameupdated', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purchaseId: purchaseId,
          cname: cnameValue,
          deployedUrl: deployedUrl,
          existingCnameId: existingCname?.id, // For updates
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add CNAME');
      }

      const result = await response.json();
      setExistingCname(result.cname);
      setStep2Completed(true);
      
      // Update service progress based on results
      if (result.serviceResults) {
        setServiceProgress({
          hostinger: {
            status: result.serviceResults.hostinger.success ? 'success' : 'error',
            message: result.serviceResults.hostinger.message
          },
          vercel: {
            status: result.serviceResults.vercel.success ? 'success' : 'error',
            message: result.serviceResults.vercel.message
          }
        });
      }
      
      setSuccess(existingCname ? 'CNAME updated successfully!' : 'CNAME added successfully!');
    } catch (error) {
      console.error('Error adding CNAME:', error);
      setError(error instanceof Error ? error.message : 'Failed to add CNAME');
    } finally {
      setAddingCname(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading domain configuration...</span>
        </div>
      </div>
    );
  }

  if (!purchaseData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Purchase not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Purchased Domains</span>
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {purchaseData.domain.domainName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure your domain deployment
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${purchaseData.price}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Purchased {new Date(purchaseData.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <p className="text-green-700 dark:text-green-300">{success}</p>
        </div>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center space-x-3 ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step1Completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : currentStep >= 1 
                  ? 'border-blue-500 text-blue-500' 
                  : 'border-gray-300 text-gray-400'
            }`}>
              {step1Completed ? <CheckCircle className="w-4 h-4" /> : '1'}
            </div>
            <span className="font-medium">Connect Project</span>
          </div>
          
          <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          <div className={`flex items-center space-x-3 ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step2Completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : currentStep >= 2 
                  ? 'border-blue-500 text-blue-500' 
                  : 'border-gray-300 text-gray-400'
            }`}>
              {step2Completed ? <CheckCircle className="w-4 h-4" /> : '2'}
            </div>
            <span className="font-medium">Add CNAME</span>
          </div>
        </div>
      </div>

      {/* Step 1: Connect Project */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {existingProject ? 'Edit Project Connection' : 'Connect Your Project'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {existingProject ? 'Update your deployment platform configuration' : 'Link your deployment platform to configure DNS'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select platform</option>
                <option value="vercel">Vercel</option>
                <option value="netlify">Netlify</option>
              </select>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Fetch Projects Button */}
            {platform && apiKey && (
                                  <button
                      onClick={fetchProjects}
                      disabled={fetchingProjects}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      {fetchingProjects ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Fetching Projects...</span>
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4" />
                          <span>{existingProject ? 'Refresh Projects' : 'Fetch Projects'}</span>
                        </>
                      )}
                    </button>
            )}

            {/* Project Selection */}
            {projects.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Project
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedProject?.id === project.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{project.url}</p>
                        </div>
                        {selectedProject?.id === project.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connect Button */}
            {selectedProject && (
                                <button
                    onClick={connectProject}
                    disabled={connectingProject}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {connectingProject ? (
                      <>
                        <Loader2 className="w-4 h-0 animate-spin" />
                        <span>{existingProject ? 'Updating...' : 'Connecting...'}</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-4 h-4" />
                        <span>{existingProject ? 'Update Project' : 'Connect Project'}</span>
                      </>
                    )}
                  </button>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Add CNAME */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Network className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {existingCname ? 'Edit CNAME Configuration' : 'Configure CNAME'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {existingCname ? 'Update your custom subdomain settings' : 'Set up your custom subdomain'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* CNAME Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subdomain
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={cnameValue}
                  onChange={(e) => setCnameValue(e.target.value)}
                  placeholder="myapp"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <span className="text-gray-600 dark:text-gray-400 font-mono">
                  .{purchaseData.domain.domainName}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                This will create: <span className="font-mono text-purple-600 dark:text-purple-400">
                  {cnameValue || 'myapp'}.{purchaseData.domain.domainName}
                </span>
              </p>
            </div>

            {/* Add CNAME Button */}
            <button
              onClick={addCname}
              disabled={!cnameValue || addingCname}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {addingCname ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{existingCname ? 'Updating CNAME...' : 'Adding CNAME...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>{existingCname ? 'Update CNAME' : 'Add CNAME'}</span>
                </>
              )}
            </button>

            {/* Service Progress Indicators */}
            {(serviceProgress.hostinger.status !== 'idle' || serviceProgress.vercel.status !== 'idle') && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Updates:</h4>
                
                {/* Hostinger Progress */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className={`w-3 h-3 rounded-full ${
                    serviceProgress.hostinger.status === 'success' ? 'bg-green-500' :
                    serviceProgress.hostinger.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500 animate-pulse'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Hostinger DNS</p>
                    <p className={`text-xs ${
                      serviceProgress.hostinger.status === 'success' ? 'text-green-600 dark:text-green-400' :
                      serviceProgress.hostinger.status === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {serviceProgress.hostinger.message || 'Updating DNS records...'}
                    </p>
                  </div>
                  {serviceProgress.hostinger.status === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {serviceProgress.hostinger.status === 'error' && (
                    <div className="w-4 h-4 text-red-500">⚠️</div>
                  )}
                </div>

                {/* Vercel Progress */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className={`w-3 h-3 rounded-full ${
                    serviceProgress.vercel.status === 'success' ? 'bg-green-500' :
                    serviceProgress.vercel.status === 'error' ? 'bg-red-500' :
                    'bg-blue-500 animate-pulse'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Vercel Platform</p>
                    <p className={`text-xs ${
                      serviceProgress.vercel.status === 'success' ? 'text-green-600 dark:text-green-400' :
                      serviceProgress.vercel.status === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {serviceProgress.vercel.message || 'Updating domain configuration...'}
                    </p>
                  </div>
                  {serviceProgress.vercel.status === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {serviceProgress.vercel.status === 'error' && (
                    <div className="w-4 h-4 text-red-500">⚠️</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success State */}
      {step2Completed && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Configuration Complete!
          </h3>
          <p className="text-green-700 dark:text-green-300">
            Your domain is now configured and ready to use.
          </p>
        </div>
      )}
    </div>
  );
};

export default PurchaseDomainManager; 