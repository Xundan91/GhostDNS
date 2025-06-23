'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpDown, ShoppingCart, Heart, Eye, User, Globe, DollarSign, CheckCircle, SortAsc, SortDesc } from 'lucide-react';
import { DomainFormTrigger } from '@/components/domainForm';
import { useRouter, useSearchParams } from 'next/navigation';

interface Domain {
  id: string;
  domainName: string;
  platform: string;
  price: string;
  createdAt: string;
  ownerId: string;
  authorName?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | 'platform-asc' | 'platform-desc';

const DomainMarketplace: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    // Get search query from URL
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    filterAndSortDomains();
  }, [domains, searchQuery, sortOption]);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/domain');
      if (!response.ok) {
        throw new Error('Failed to fetch domains');
      }
      const data = await response.json();
      setDomains(data.domains || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortDomains = () => {
    let filtered = domains;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = domains.filter(domain => 
        domain.domainName.toLowerCase().includes(query) ||
        domain.platform.toLowerCase().includes(query) ||
        domain.price.includes(query) ||
        (domain.authorName && domain.authorName.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.domainName.localeCompare(b.domainName);
        case 'name-desc':
          return b.domainName.localeCompare(a.domainName);
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'platform-asc':
          return a.platform.localeCompare(b.platform);
        case 'platform-desc':
          return b.platform.localeCompare(a.platform);
        default:
          return 0;
      }
    });

    setFilteredDomains(sorted);
  };

  // Helper function to get TLD from domain name
  const getTLD = (domainName: string) => {
    const parts = domainName.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDomainClick = (domain: Domain) => {
    router.push(`/dashboard/domain/${domain.id}`);
  };

  const handlePurchase = (domain: Domain, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement purchase functionality
    console.log('Purchasing:', domain.domainName);
  };

  const handleAddToCart = (domain: Domain, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', domain.domainName);
  };

  const handleAddToWishlist = (domain: Domain, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement add to wishlist functionality
    console.log('Adding to wishlist:', domain.domainName);
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case 'name-asc': return 'Name: A to Z';
      case 'name-desc': return 'Name: Z to A';
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'date-asc': return 'Date: Oldest First';
      case 'date-desc': return 'Date: Newest First';
      case 'platform-asc': return 'Platform: A to Z';
      case 'platform-desc': return 'Platform: Z to A';
      default: return 'Sort by';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Domain Marketplace</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Find the perfect domain for your next project</p>
          </div>
          <DomainFormTrigger variant="button" onDomainAdded={fetchDomains} />
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
            <h1 className="text-2xl font-bold">Domain Marketplace</h1>
            <p className="text-accent-light/60 dark:text-accent-dark/60">Find the perfect domain for your next project</p>
          </div>
          <DomainFormTrigger variant="button" onDomainAdded={fetchDomains} />
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchDomains}
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
          <h1 className="text-2xl font-bold">Domain Marketplace</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">Find the perfect domain for your next project</p>
        </div>
        
        {/* CTA Button */}
        <DomainFormTrigger variant="button" onDomainAdded={fetchDomains} />
      </div>

      {/* CTA Card */}
      <DomainFormTrigger variant="card" className="mb-6" onDomainAdded={fetchDomains} />

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
          <input
            type="text"
            placeholder="Search domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20 transition-all duration-300"
          />
        </div>

        {/* Sort Button */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center space-x-2 px-4 py-3 bg-accent-light/10 dark:bg-accent-dark/10 hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 rounded-xl transition-all duration-300"
          >
            <ArrowUpDown className="w-5 h-5" />
            <span>{getSortLabel(sortOption)}</span>
          </button>

          {/* Sort Dropdown */}
          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-black/95 rounded-xl shadow-xl border border-accent-light/10 dark:border-accent-dark/10 py-2 backdrop-blur-xl z-50">
              <div className="px-3 py-2 text-xs font-medium text-accent-light/60 dark:text-accent-dark/60 uppercase tracking-wide">
                Sort by
              </div>
              {[
                { value: 'name-asc', label: 'Name: A to Z', icon: SortAsc },
                { value: 'name-desc', label: 'Name: Z to A', icon: SortDesc },
                { value: 'price-asc', label: 'Price: Low to High', icon: SortAsc },
                { value: 'price-desc', label: 'Price: High to Low', icon: SortDesc },
                { value: 'date-asc', label: 'Date: Oldest First', icon: SortAsc },
                { value: 'date-desc', label: 'Date: Newest First', icon: SortDesc },
                { value: 'platform-asc', label: 'Platform: A to Z', icon: SortAsc },
                { value: 'platform-desc', label: 'Platform: Z to A', icon: SortDesc },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortOption(option.value as SortOption);
                      setShowSortMenu(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors ${
                      sortOption === option.value ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-accent-light/60 dark:text-accent-dark/60">
        Showing {filteredDomains.length} of {domains.length} domains
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-accent-light/60 dark:text-accent-dark/60 mb-4">
              {searchQuery ? `No domains found for "${searchQuery}"` : 'No domains available yet'}
            </p>
            {!searchQuery && <DomainFormTrigger variant="button" onDomainAdded={fetchDomains} />}
          </div>
        ) : (
          filteredDomains.map((domain) => {
            const tld = getTLD(domain.domainName);
            const isFree = parseFloat(domain.price) === 0;
            
            return (
              <div 
                key={domain.id} 
                className="group relative bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl overflow-hidden"
                onClick={() => handleDomainClick(domain)}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Header with domain name and price */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                      {domain.domainName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30">
                        <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {isFree ? 'Free' : `$${domain.price}`}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isFree ? 'No cost' : 'One-time'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Platform info */}
                <div className="relative z-10 mb-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{domain.platform}</span>
                  </div>
                </div>
                
                {/* Bottom section */}
                <div className="relative z-10 space-y-4">
                  {/* Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Listed {formatDate(domain.createdAt)}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span>Live</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={(e) => handleDomainClick(domain)}
                      className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={(e) => handleAddToCart(domain, e)}
                      className="py-2.5 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group/cart"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/cart:scale-110 transition-transform duration-300" />
                    </button>
                    <button 
                      onClick={(e) => handleAddToWishlist(domain, e)}
                      className="py-2.5 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group/wishlist"
                      title="Add to Wishlist"
                    >
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover/wishlist:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredDomains.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">
            Showing 1-{filteredDomains.length} of {filteredDomains.length} domains
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

export default DomainMarketplace;