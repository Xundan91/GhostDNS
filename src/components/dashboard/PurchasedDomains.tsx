'use client';

import React, { useState, useEffect } from 'react';
import { Package, Globe, Calendar, DollarSign, CheckCircle, Clock, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PurchasedDomain {
  purchaseId: string;
  price: number;
  status: string;
  timestamp: string;
  domainName: string;
  platform: string;
  basedomainId: string;
  claimId: string;
  fulldomain: string;
  dnsStatus: string;
  createdAt: string;
  configuredUrl?: string; // Full URL when domain is configured
}

const PurchasedDomains: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchasedDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [configuredPurchases, setConfiguredPurchases] = useState<Set<string>>(new Set());
  const [deletingPurchase, setDeletingPurchase] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/purchase');
      if (!response.ok) {
        throw new Error('Failed to fetch purchased domains');
      }
      const data = await response.json();
      const mappedPurchases = (data.purchases || []).map((purchase: any) => ({
        purchaseId: purchase.purchaseId,
        price: purchase.price,
        status: purchase.status,
        timestamp: purchase.timestamp,
        domainName: purchase.domain?.domainName || '',
        platform: purchase.domain?.platform || '',
        basedomainId: purchase.domain?.id || '',
        claimId: '',
        fulldomain: '',
        dnsStatus: '',
        createdAt: '',
      }));
      
      // Check which purchases are configured and get their URLs
      const configuredSet = new Set<string>();
      const purchasesWithUrls = await Promise.all(
        mappedPurchases.map(async (purchase) => {
          try {
            const cnameResponse = await fetch(`/api/cnameupdated?purchaseId=${purchase.purchaseId}`);
            if (cnameResponse.ok) {
              const cnameData = await cnameResponse.json();
              if (cnameData.cname && cnameData.cname.cname) {
                configuredSet.add(purchase.purchaseId);
                // Construct the full domain URL using the CNAME subdomain and base domain
                const fullUrl = `https://${cnameData.cname.cname}.${purchase.domainName}`;
                return { ...purchase, configuredUrl: fullUrl };
              }
            }
          } catch (error) {
            console.error('Error checking configuration status:', error);
          }
          return purchase;
        })
      );
      
      setPurchases(purchasesWithUrls);
      setConfiguredPurchases(configuredSet);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'failed':
      case 'cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleDeleteConfiguration = async (purchaseId: string) => {
    if (!confirm('Are you sure you want to delete this domain configuration? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingPurchase(purchaseId);
      
      // Delete CNAME first (if exists)
      const cnameResponse = await fetch(`/api/cnameupdated?purchaseId=${purchaseId}`, {
        method: 'DELETE',
      });

      // Delete connected project (if exists)
      const projectResponse = await fetch(`/api/connectproject?purchaseId=${purchaseId}`, {
        method: 'DELETE',
      });

      // Refresh the purchases list
      await fetchPurchases();
      
    } catch (error) {
      console.error('Error deleting configuration:', error);
      alert('Failed to delete configuration. Please try again.');
    } finally {
      setDeletingPurchase(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <Package className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Purchased Domains</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your purchased domains</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white/80 dark:bg-black/80 rounded-xl p-6 h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <Package className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Purchased Domains</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Manage your purchased domains</p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchPurchases}
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
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-xl bg-purple-500/10">
          <Package className="w-8 h-8 text-purple-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Purchased Domains</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">
            {purchases.length === 0
              ? 'No purchased domains yet'
              : `You have purchased ${purchases.length} domain${purchases.length === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {purchases.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 rounded-full bg-purple-500/10 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Package className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No purchased domains yet</h3>
              <p className="text-accent-light/60 dark:text-accent-dark/60">
                Start browsing the marketplace to find your perfect domain
              </p>
            </div>
          </div>
        ) : (
          purchases.map((purchase) => (
            <div 
              key={purchase.purchaseId} 
              className="group relative bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl overflow-hidden"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-blue-50/30 dark:from-purple-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Header with domain name and price */}
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                    {purchase.domainName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Owned</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30">
                      <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${purchase.price}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Paid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Platform info */}
              <div className="relative z-10 mb-5">
                <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{purchase.platform}</span>
                </div>
              </div>
              
              {/* Domain URL - Show when configured */}
              {purchase.configuredUrl && (
                <div className="relative z-10 mb-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Live Domain</p>
                        <a 
                          href={purchase.configuredUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 truncate block"
                        >
                          {purchase.configuredUrl}
                        </a>
                      </div>
                      <a 
                        href={purchase.configuredUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 p-1.5 rounded-lg bg-green-100 dark:bg-green-800/30 hover:bg-green-200 dark:hover:bg-green-700/30 transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bottom section */}
              <div className="relative z-10 space-y-4">
                {/* Date and Status */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Purchased {formatDate(purchase.timestamp)}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getStatusColor(purchase.status)}`}>
                    {getStatusIcon(purchase.status)}
                    <span className="capitalize">{purchase.status}</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => router.push(`/dashboard/purchase/${purchase.purchaseId}`)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      configuredPurchases.has(purchase.purchaseId)
                        ? 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/30 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{configuredPurchases.has(purchase.purchaseId) ? 'Edit Domain' : 'Manage'}</span>
                  </button>
                  {configuredPurchases.has(purchase.purchaseId) && (
                    <button 
                      onClick={() => handleDeleteConfiguration(purchase.purchaseId)}
                      disabled={deletingPurchase === purchase.purchaseId}
                      className="py-2.5 px-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/30 disabled:bg-red-50 dark:disabled:bg-red-900/10 rounded-xl transition-all duration-300 group/delete"
                      title="Delete Configuration"
                    >
                      {deletingPurchase === purchase.purchaseId ? (
                        <Loader2 className="w-4 h-4 text-red-600 dark:text-red-400 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400 group-hover/delete:scale-110 transition-transform duration-300" />
                      )}
                    </button>
                  )}
                  <button 
                    className="py-2.5 px-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/30 rounded-xl transition-all duration-300 group/cart"
                    title="View Details"
                  >
                    <Package className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover/cart:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchasedDomains; 