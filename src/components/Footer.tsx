import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-accent-light/10 dark:border-accent-dark/10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-xl mb-4 text-accent-light dark:text-accent-dark">DevDomain</h3>
            <p className="opacity-70 mb-4 text-accent-light dark:text-accent-dark">Custom domains for the modern web.</p>
            <div className="flex space-x-4">
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-light dark:text-accent-dark">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Features</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Pricing</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Documentation</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-light dark:text-accent-dark">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">About</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Blog</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Careers</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-accent-light dark:text-accent-dark">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Terms</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Privacy</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Cookies</a></li>
              <li><a href="#" className="opacity-70 hover:opacity-100 transition-opacity text-accent-light dark:text-accent-dark">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent-light/10 dark:border-accent-dark/10 mt-12 pt-8">
          <p className="text-sm opacity-60 text-center text-accent-light dark:text-accent-dark">
            © {new Date().getFullYear()} DevDomain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;