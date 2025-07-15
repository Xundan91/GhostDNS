import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

const CTASection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-[#00C6FF] to-[#007E5E] text-white">
      <div className="container mx-auto max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to claim your subdomain?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of developers who've upgraded their project domains. Free tier available.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-white text-black dark:bg-white dark:text-black hover:bg-gray-100 dark:hover:bg-gray-100 border-0" onClick={() => router.push('/dashboard')}>
            Get Started Now
          </Button>
          <Button primary={false} className="border-white text-white hover:bg-white/10">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;