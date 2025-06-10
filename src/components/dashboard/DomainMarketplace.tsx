import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { DomainFormTrigger } from '@/components/domainForm';

const domains = [
  { name: 'app.build.dev', price: 299, category: 'Premium', tld: '.dev' },
  { name: 'cloud.build.io', price: 199, category: 'Featured', tld: '.io' },
  { name: 'dev.build.app', price: 149, category: 'Standard', tld: '.app' },
  { name: 'api.build.dev', price: 249, category: 'Premium', tld: '.dev' },
  { name: 'code.build.io', price: 179, category: 'Featured', tld: '.io' },
  { name: 'web.build.app', price: 129, category: 'Standard', tld: '.app' },
];

const DomainMarketplace: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Domain Marketplace</h1>
          <p className="text-accent-light/60 dark:text-accent-dark/60">Find the perfect domain for your next project</p>
        </div>
        
        {/* CTA Button */}
        <DomainFormTrigger variant="button" />
      </div>

      {/* CTA Card */}
      <DomainFormTrigger variant="card" className="mb-6" />

      {/* Filters */}
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
            <option>All TLDs</option>
            <option>.dev</option>
            <option>.io</option>
            <option>.app</option>
          </select>
        </div>
        
        <div className="relative">
          <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
          <select className="w-full pl-10 pr-4 py-2 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 appearance-none">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A to Z</option>
            <option>Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain, index) => (
          <div key={index} className="group relative bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl border border-accent-light/10 dark:border-accent-dark/10 p-6 hover:border-accent-light/20 dark:hover:border-accent-dark/20 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${domain.category === 'Premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' : 
                  domain.category === 'Featured' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'}`}>
                {domain.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{domain.name}</h3>
            <p className="text-2xl font-bold mb-4">${domain.price}</p>
            
            <button className="w-full py-2 px-4 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-accent-light/60 dark:text-accent-dark/60">
          Showing 1-6 of 24 domains
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 disabled:opacity-50">
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-accent-light dark:bg-accent-dark text-primary-light dark:text-primary-dark hover:opacity-90">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
            3
          </button>
          <button className="px-4 py-2 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5 hover:bg-accent-light/10 dark:hover:bg-accent-dark/10">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DomainMarketplace;