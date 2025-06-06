'use client';

import { Menu, Search, Bell, User, Package, Settings, CreditCard, LogOut, Globe, Link as LucideLink, UserCircle } from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { DomainFormTrigger } from '@/components/domainForm';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-accent-light/10 dark:border-accent-dark/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-bold">DevDomain</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-accent-light/5 dark:bg-accent-dark/5">
              <Globe className="w-5 h-5" />
              <span>Marketplace</span>
            </Link>
            <Link href="/dashboard/my-domains" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent-light/5 dark:hover:bg-accent-dark/5">
              <Package className="w-5 h-5" />
              <span>My Domains</span>
            </Link>
            <Link href="/dashboard/my-account" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent-light/5 dark:hover:bg-accent-dark/5">
              <UserCircle className="w-5 h-5" />
              <span>My Account</span>
            </Link>
            <Link href="/dashboard/connected-accounts" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent-light/5 dark:hover:bg-accent-dark/5">
              <LucideLink className="w-5 h-5" />
              <span>Connected Accounts</span>
            </Link>
            
            {/* Domain Form Trigger in Sidebar */}
            <div className="pt-4">
              <DomainFormTrigger variant="button" />
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-accent-light/10 dark:border-accent-dark/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-light/40 dark:text-accent-dark/40" />
                <input
                  type="text"
                  placeholder="Search domains..."
                  className="pl-10 pr-4 py-2 w-64 bg-accent-light/5 dark:bg-accent-dark/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <HeadlessMenu as="div" className="relative">
                <HeadlessMenu.Button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                </HeadlessMenu.Button>

                <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-black/90 rounded-lg shadow-lg border border-accent-light/10 dark:border-accent-dark/10 py-1 backdrop-blur-lg">
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link href="/dashboard/profile" className={`${active ? 'bg-accent-light/5 dark:bg-accent-dark/5' : ''} flex items-center space-x-2 px-4 py-2`}>
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link href="/dashboard/billing" className={`${active ? 'bg-accent-light/5 dark:bg-accent-dark/5' : ''} flex items-center space-x-2 px-4 py-2`}>
                        <CreditCard className="w-4 h-4" />
                        <span>Billing</span>
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button onClick={() => router.push('/login')} className={`${active ? 'bg-accent-light/5 dark:bg-accent-dark/5' : ''} flex items-center space-x-2 px-4 py-2 w-full`}>
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    )}
                  </HeadlessMenu.Item>
                </HeadlessMenu.Items>
              </HeadlessMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}