'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, User, Calendar, DollarSign, ShoppingCart, Heart, CheckCircle, Shield, Zap, ExternalLink } from 'lucide-react';

interface Domain {
  id: string;
  domainName: string;
  platform: string;
  price: string;
  createdAt: string;
  ownerId: string;
  authorName?: string;
}

interface DomainDetailProps {
  domainId: string;
}

const DomainDetail: React.FC<DomainDetailProps> = ({ domainId }) => {
  const router = useRouter();
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDomainDetails();
  }, [domainId]);

  const fetchDomainDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/domain/${domainId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch domain details');
      }
      const data = await response.json();
      setDomain(data.domain);
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

  const getCategory = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 200) return 'Premium';
    if (numPrice >= 100) return 'Featured';
    return 'Standard';
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', domain?.domainName);
  };

  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist functionality
    console.log('Adding to wishlist:', domain?.domainName);
  };

  const handlePurchase = () => {
    // TODO: Implement purchase functionality
    console.log('Purchasing:', domain?.domainName);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error || !domain) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Domain Not Found</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">The domain you're looking for doesn't exist</p>
          </div>
        </div>
      </div>
    );
  }

  const isFree = parseFloat(domain.price) === 0;
  const category = getCategory(domain.price);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">{domain.domainName}</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">Domain Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Card */}
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{domain.domainName}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${category === 'Premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' : 
                    category === 'Featured' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`}>
                  {category}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-500" />
                  <p className="text-3xl font-bold">
                    {isFree ? 'Free' : `$${domain.price}`}
                  </p>
                </div>
                <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">
                  {isFree ? 'No cost to acquire' : 'One-time purchase'}
                </p>
              </div>
            </div>

            {/* Domain Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5">
                <Globe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Platform</p>
                  <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">{domain.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5">
                <User className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-medium">Listed by</p>
                  <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">{domain.authorName || 'Anonymous'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5">
                <Calendar className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Listed on</p>
                  <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">{formatDate(domain.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5">
                <Shield className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">Available</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={handlePurchase}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isFree ? 'Get Free Domain' : 'Buy Now'}</span>
              </button>
              <button 
                onClick={handleAddToCart}
                className="py-3 px-4 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-lg transition-colors"
                title="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button 
                onClick={handleAddToWishlist}
                className="py-3 px-4 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-lg transition-colors"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Domain Description */}
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <h3 className="text-xl font-bold mb-4">About this Domain</h3>
            <p className="text-accent-light/80 dark:text-accent-dark/80 mb-4">
              This premium domain name is perfect for your next project. With its memorable and professional appearance, 
              it's ideal for businesses, startups, or personal branding.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Short and memorable</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Professional appearance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Great for branding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Check Availability</span>
              </button>
              <button className="w-full py-2 px-4 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>View Similar Domains</span>
              </button>
            </div>
          </div>

          {/* Domain Stats */}
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6">
            <h3 className="text-lg font-bold mb-4">Domain Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-accent-light/60 dark:text-accent-dark/60">Length</span>
                <span className="font-medium">{domain.domainName.length} characters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-accent-light/60 dark:text-accent-dark/60">TLD</span>
                <span className="font-medium">.{domain.domainName.split('.').pop()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-accent-light/60 dark:text-accent-dark/60">Category</span>
                <span className="font-medium">{category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainDetail; 