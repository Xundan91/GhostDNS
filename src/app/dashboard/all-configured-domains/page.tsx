'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { RefreshCw, ExternalLink, Settings, AlertCircle, Edit3, Check, X } from 'lucide-react';
import AuthLoadingSkeleton from '@/components/AuthLoadingSkeleton';

interface ConfiguredDomain {
  id: string;
  domain_id: string;
  domain_name: string;
  platform: string;
  project_name: string;
  deployed_url: string;
  cname: string;
  created_at: string;
  vercelapikey?: string;
  project_id?: string;
}

export default function AllConfiguredDomains() {
  const { data: session, status } = useSession();
  const [configuredDomains, setConfiguredDomains] = useState<ConfiguredDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingCname, setEditingCname] = useState<string | null>(null);
  const [cnameValues, setCnameValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status === 'authenticated') {
      fetchConfiguredDomains();
    }
  }, [status]);

  const fetchConfiguredDomains = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/configuredomain', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch configured domains');
      }

      const data = await response.json();
      const domains = data.domains || [];
      setConfiguredDomains(domains);
      
      // Initialize CNAME values
      const initialCnameValues: Record<string, string> = {};
      domains.forEach((domain: ConfiguredDomain) => {
        initialCnameValues[domain.id] = domain.cname;
      });
      setCnameValues(initialCnameValues);
    } catch (err) {
      setError('Failed to load configured domains');
      console.error('Error fetching configured domains:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHostinger = async (domainId: string) => {
    try {
      setUpdating(`hostinger-${domainId}`);
      const response = await fetch('/api/services/domain/hostinger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domainId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update Hostinger');
      }

      // Refresh the list after update
      await fetchConfiguredDomains();
    } catch (err) {
      setError('Failed to update Hostinger configuration');
      console.error('Error updating Hostinger:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdateVercel = async (domainId: string) => {
    try {
      setUpdating(`vercel-${domainId}`);
      const response = await fetch('/api/services/platform/vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domainId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update Vercel');
      }

      // Refresh the list after update
      await fetchConfiguredDomains();
    } catch (err) {
      setError('Failed to update Vercel configuration');
      console.error('Error updating Vercel:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleEditCname = (domainId: string) => {
    setEditingCname(domainId);
  };

  const handleCancelEdit = (domainId: string) => {
    setEditingCname(null);
    // Reset to original value
    const domain = configuredDomains.find(d => d.id === domainId);
    if (domain) {
      setCnameValues(prev => ({
        ...prev,
        [domainId]: domain.cname
      }));
    }
  };

  const handleSaveCname = async (domainId: string) => {
    try {
      setUpdating(`cname-${domainId}`);
      const newCname = cnameValues[domainId];
      
      if (!newCname || newCname.trim() === '') {
        setError('CNAME cannot be empty');
        return;
      }

      const response = await fetch('/api/configuredomain', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainId,
          cname: newCname.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update CNAME');
      }

      // Update local state
      setConfiguredDomains(prev => 
        prev.map(domain => 
          domain.id === domainId 
            ? { ...domain, cname: newCname.trim() }
            : domain
        )
      );
      
      setEditingCname(null);
      setError(null);
    } catch (err) {
      setError('Failed to update CNAME');
      console.error('Error updating CNAME:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleCnameChange = (domainId: string, value: string) => {
    setCnameValues(prev => ({
      ...prev,
      [domainId]: value
    }));
  };

  if (status === 'loading') {
    return <AuthLoadingSkeleton />;
  }

  if (status === 'unauthenticated') {
    return <AuthLoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-accent-light dark:text-accent-dark">
            All Configured Domains
          </h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60 mt-2">
            Manage and update your domain configurations
          </p>
        </div>
        <button
          onClick={fetchConfiguredDomains}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-xl transition-all duration-300"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-500">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-light dark:border-accent-dark"></div>
        </div>
      )}

      {/* Configured Domains List */}
      {!loading && configuredDomains.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-accent-light/40 dark:text-accent-dark/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-accent-light dark:text-accent-dark mb-2">
            No configured domains found
          </h3>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            Configure your first domain to see it here
          </p>
        </div>
      )}

      {/* Domains Grid */}
      {!loading && configuredDomains.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {configuredDomains.map((domain) => (
            <div
              key={domain.id}
              className="bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-accent-light/10 dark:border-accent-dark/10 rounded-xl p-6 space-y-4"
            >
              {/* Domain Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-accent-light dark:text-accent-dark">
                  {domain.domain_name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg text-xs font-medium">
                    {domain.platform}
                  </span>
                  <span className="text-xs text-accent-light/60 dark:text-accent-dark/60">
                    {new Date(domain.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              {domain.project_name && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-accent-light dark:text-accent-dark">
                    Project: {domain.project_name}
                  </p>
                  {domain.deployed_url && (
                    <a
                      href={domain.deployed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <span>View Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {/* CNAME - Editable */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-accent-light/60 dark:text-accent-dark/60">CNAME</p>
                  {editingCname === domain.id ? (
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleSaveCname(domain.id)}
                        disabled={updating === `cname-${domain.id}`}
                        className="p-1 text-green-500 hover:text-green-600 transition-colors"
                      >
                        {updating === `cname-${domain.id}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Check className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCancelEdit(domain.id)}
                        className="p-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditCname(domain.id)}
                      className="p-1 text-accent-light/60 dark:text-accent-dark/60 hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {editingCname === domain.id ? (
                  <input
                    type="text"
                    value={cnameValues[domain.id] || ''}
                    onChange={(e) => handleCnameChange(domain.id, e.target.value)}
                    className="w-full text-sm font-mono bg-accent-light/5 dark:bg-accent-dark/5 p-2 rounded-lg border border-accent-light/20 dark:border-accent-dark/20 focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
                    placeholder="Enter CNAME value"
                  />
                ) : (
                  <p className="text-sm font-mono bg-accent-light/5 dark:bg-accent-dark/5 p-2 rounded-lg">
                    {domain.cname}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => handleUpdateHostinger(domain.id)}
                  disabled={updating === `hostinger-${domain.id}` || editingCname === domain.id}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {updating === `hostinger-${domain.id}` ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Settings className="w-4 h-4" />
                  )}
                  <span className="text-sm">Update Hostinger</span>
                </button>
                <button
                  onClick={() => handleUpdateVercel(domain.id)}
                  disabled={updating === `vercel-${domain.id}` || editingCname === domain.id}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-black dark:text-white rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {updating === `vercel-${domain.id}` ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Settings className="w-4 h-4" />
                  )}
                  <span className="text-sm">Update Vercel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 