'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpDown, Edit, Trash2, Eye, Plus, Package, DollarSign, Globe } from 'lucide-react';
import { DomainFormTrigger } from '@/components/domainForm';

interface Domain {
  id: string;
  domainName: string;
  platform: string;
  price: string;
  createdAt: string;
}

const MyDomains: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyDomains();
  }, []);

  const fetchMyDomains = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/domain/user');
      if (!response.ok) {
        throw new Error('Failed to fetch your domains');
      }
      const data = await response.json();
      setDomains(data.domains || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get TLD from domain name
  const getTLD = (domainName: string) => {
    const parts = domainName.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  };

  // Helper function to categorize domains based on price
  const getCategory = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 200) return 'Premium';
    if (numPrice >= 100) return 'Featured';
    return 'Standard';
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Domains</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your listed domains</p>
          </div>
          <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Domains</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your listed domains</p>
          </div>
          <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchMyDomains}
            className="px-4 py-2 bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark rounded-lg hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Domains</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            {domains.length === 0 
              ? "You haven't listed any domains yet" 
              : `You have ${domains.length} domain${domains.length === 1 ? '' : 's'} listed`
            }
          </p>
        </div>
        
        {/* Add Domain Button */}
        <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
      </div>

      {/* Stats Cards */}
      {domains.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">Total Domains</p>
                <p className="text-2xl font-bold">{domains.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">Total Value</p>
                <p className="text-2xl font-bold">
                  ${domains.reduce((sum, domain) => sum + parseFloat(domain.price), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">Platforms</p>
                <p className="text-2xl font-bold">
                  {new Set(domains.map(d => d.platform)).size}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {domains.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
            <select className="w-full pl-10 pr-4 py-2 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 appearance-none">
              <option>All Categories</option>
              <option>Premium</option>
              <option>Featured</option>
              <option>Standard</option>
            </select>
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
            <select className="w-full pl-10 pr-4 py-2 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 appearance-none">
              <option>All Platforms</option>
              {Array.from(new Set(domains.map(d => d.platform))).map(platform => (
                <option key={platform}>{platform}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
            <select className="w-full pl-10 pr-4 py-2 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 appearance-none">
              <option>Date: Newest First</option>
              <option>Date: Oldest First</option>
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
            </select>
          </div>
        </div>
      )}

      {/* Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-full bg-accent-light/5 dark:bg-accent-dark/5 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Package className="w-10 h-10 text-accent-light/40 dark:text-accent-dark/40" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No domains listed yet</h3>
              <p className="text-accent-light/60 dark:text-accent-dark/60 mb-6">
                Start earning by listing your domains in our marketplace
              </p>
              <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
            </div>
          </div>
        ) : (
          domains.map((domain) => {
            const category = getCategory(domain.price);
            const tld = getTLD(domain.domainName);
            
            return (
              <div key={domain.id} className="group relative bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6 hover:border-accent-light/20 dark:hover:border-accent-dark/20 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${category === 'Premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' : 
                      category === 'Featured' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`}>
                    {category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{domain.domainName}</h3>
                <p className="text-2xl font-bold mb-4">${domain.price}</p>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60 mb-2">Platform: {domain.platform}</p>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60 mb-4">Listed: {formatDate(domain.createdAt)}</p>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 px-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="py-2 px-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="py-2 px-3 bg-red-500/10 dark:bg-red-500/10 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {domains.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">
            Showing 1-{domains.length} of {domains.length} domains
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDomains; 