'use client';

import React from 'react';
import { Zap, Globe, Rocket, Link } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-light/5 to-transparent dark:via-secondary-dark/5" />
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent-light dark:text-accent-dark">Custom Subdomains for Hackers and Builders</h2>
          <p className="text-xl opacity-70 max-w-2xl mx-auto text-accent-light dark:text-accent-dark">
            Connect your projects to premium subdomains in seconds. Perfect for hackathons, MVPs, and production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 rounded-2xl p-8 backdrop-blur-md border border-accent-light/10 dark:border-accent-dark/10 hover:transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5">
                <Globe className="w-6 h-6 text-accent-light dark:text-accent-dark" />
              </div>
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark">Vercel Projects</h3>
            </div>
            <p className="opacity-70 text-accent-light dark:text-accent-dark">Instantly connect your Vercel deployments to a custom subdomain with zero configuration.</p>
          </div>

          <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 rounded-2xl p-8 backdrop-blur-md border border-accent-light/10 dark:border-accent-dark/10 hover:transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5">
                <Rocket className="w-6 h-6 text-accent-light dark:text-accent-dark" />
              </div>
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark">Netlify Sites</h3>
            </div>
            <p className="opacity-70 text-accent-light dark:text-accent-dark">One-click integration with your Netlify deployments. No DNS hassle.</p>
          </div>

          <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 rounded-2xl p-8 backdrop-blur-md border border-accent-light/10 dark:border-accent-dark/10 hover:transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-light/5 dark:bg-accent-dark/5">
                <Link className="w-6 h-6 text-accent-light dark:text-accent-dark" />
              </div>
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark">Custom Domains</h3>
            </div>
            <p className="opacity-70 text-accent-light dark:text-accent-dark">Point any domain or subdomain to your project with automated SSL and CDN.</p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-secondary-light/20 dark:bg-secondary-dark/20 backdrop-blur-xl border border-accent-light/10 dark:border-accent-dark/10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-light/5 to-transparent dark:from-accent-dark/5"></div>
          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-accent-light dark:text-accent-dark">See How It Works</h3>
              <p className="text-lg opacity-70 text-accent-light dark:text-accent-dark">Connect your project in under 30 seconds</p>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-accent-light/10 dark:border-accent-dark/10">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="https://storage.googleapis.com/stackblitz-videos/domain-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;