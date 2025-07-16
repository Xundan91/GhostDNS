'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpDown, Edit, Trash2, Eye, Plus, Package, DollarSign } from 'lucide-react';
import { DomainFormTrigger } from '@/components/domainForm';

interface Domain {
  id: string;
  domainName: string;
  platform: string;
  price: string;
  createdAt: string;
}

const sortOptions = [
  { label: 'Newest', value: 'date-desc' },
  { label: 'Oldest', value: 'date-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' },
];

const MyDomains: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState('date-desc');

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

  const getTLD = (domainName: string) => {
    const parts = domainName.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  };

  // Sorting logic
  const sortedDomains = [...domains].sort((a, b) => {
    switch (sort) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'price-asc':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'name-asc':
        return a.domainName.localeCompare(b.domainName);
      case 'name-desc':
        return b.domainName.localeCompare(a.domainName);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Domains</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your listed domains</p>
          </div>
          <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">My Domains</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            {domains.length === 0 
              ? "You haven't listed any domains yet" 
              : `You have ${domains.length} domain${domains.length === 1 ? '' : 's'} listed`}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="px-3 py-2 rounded-lg border border-accent-light/20 dark:border-accent-dark/20 bg-white dark:bg-black text-accent-light dark:text-accent-dark focus:outline-none"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
        </div>
      </div>

      {/* Stats Cards */}
      {domains.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-100/60 to-blue-200/40 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-6 flex items-center justify-between shadow">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Domains</p>
              <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{domains.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Package className="w-7 h-7 text-blue-500" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-100/60 to-green-200/40 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl p-6 flex items-center justify-between shadow">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">Total Value</p>
              <p className="text-3xl font-extrabold text-green-900 dark:text-green-100">
                ${domains.reduce((sum, domain) => sum + parseFloat(domain.price), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10">
              <DollarSign className="w-7 h-7 text-green-500" />
            </div>
          </div>
        </div>
      )}

      {/* Domain Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {domains.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="p-8 rounded-full bg-gradient-to-br from-accent-light/10 to-accent-light/5 dark:from-accent-dark/10 dark:to-accent-dark/5 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Package className="w-12 h-12 text-accent-light/40 dark:text-accent-dark/40" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No domains listed yet</h3>
              <p className="text-accent-light/60 dark:text-accent-dark/60 mb-6">
                Start earning by listing your domains in our marketplace
              </p>
              <DomainFormTrigger variant="button" onDomainAdded={fetchMyDomains} />
            </div>
          </div>
        ) : (
          sortedDomains.map((domain) => {
            const tld = getTLD(domain.domainName);
            return (
              <div key={domain.id} className="group relative bg-white/90 dark:bg-zinc-900/90 rounded-2xl border border-accent-light/10 dark:border-accent-dark/10 p-7 shadow-lg hover:shadow-2xl hover:border-accent-light/30 dark:hover:border-accent-dark/30 transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 text-xs font-semibold text-accent-light dark:text-accent-dark">
                    {tld}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(domain.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold mb-1 truncate">{domain.domainName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{domain.platform}</p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-extrabold text-accent-light dark:text-accent-dark mr-2">${domain.price}</span>
                </div>
                <div className="flex-1" />
                <div className="flex space-x-2 mt-2">
                  <button className="flex-1 py-2 px-3 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors flex items-center justify-center space-x-1" title="View domain details">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button className="py-2 px-3 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors" title="Edit domain">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="py-2 px-3 bg-red-500/10 dark:bg-red-500/10 rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/20 transition-colors" title="Delete domain">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyDomains; 