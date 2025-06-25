'use client';

import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
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
}

const PurchasedDomains: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchasedDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [configuredMap, setConfiguredMap] = useState<{ [purchaseId: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    // After purchases are loaded, check config status for each
    if (purchases.length > 0) {
      const checkConfigs = async () => {
        const map: { [purchaseId: string]: boolean } = {};
        await Promise.all(
          purchases.map(async (purchase) => {
            try {
              const res = await fetch(`/api/configuredomain?purchasedomain=${purchase.purchaseId}`);
              const data = await res.json();
              map[purchase.purchaseId] = !!data.configuredomain;
            } catch {
              map[purchase.purchaseId] = false;
            }
          })
        );
        setConfiguredMap(map);
      };
      checkConfigs();
    }
  }, [purchases]);

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
      setPurchases(mappedPurchases);
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
            <div key={purchase.purchaseId} className="bg-white/90 dark:bg-black/90 rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
              <h3 className="text-lg font-semibold mb-2">{purchase.domainName}</h3>
              <p className="text-sm text-accent-light/60 dark:text-accent-dark/60 mb-2">Platform: {purchase.platform}</p>
              <p className="text-sm text-accent-light/60 dark:text-accent-dark/60 mb-2">Purchased: {formatDate(purchase.timestamp)}</p>
              <p className="text-2xl font-bold mb-2">${purchase.price}</p>
              <p className="text-xs text-accent-light/40 dark:text-accent-dark/40 mb-2">Status: {purchase.status}</p>
              <p className="text-xs text-accent-light/40 dark:text-accent-dark/40">DNS Status: {purchase.dnsStatus}</p>
              <button
                className={`mt-4 w-full py-2 px-4 ${configuredMap[purchase.purchaseId]
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                  : 'bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600'} text-white rounded-lg font-medium transition-all duration-300`}
                onClick={() => router.push(`/dashboard/domain/${purchase.basedomainId}/configuration`)}
              >
                {configuredMap[purchase.purchaseId] ? 'Edit Configuration' : 'Configure Domain'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchasedDomains; 