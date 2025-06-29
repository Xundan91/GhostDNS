'use client';

import { Menu, Search, Bell, User, Package, Settings, CreditCard, LogOut, Globe, Link as LucideLink, UserCircle, Heart, Zap, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ThemeToggle';
import AuthLoadingSkeleton from '@/components/AuthLoadingSkeleton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Dashboard Layout - Session Status:", status);
    console.log("Dashboard Layout - Session Data:", session);

    
    if (status === "loading") {
      console.log("Session is loading...");
      return;
    }

    if (status === "unauthenticated") {
      console.log("User is not authenticated, redirecting to login...");
      router.replace("/login");
      return;
    }
  }, [status, session, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to marketplace with search query
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (status === "loading") {
    return <AuthLoadingSkeleton />; 
  }

  if (status === "unauthenticated") {
    return <AuthLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform bg-white/90 dark:bg-black/90 backdrop-blur-xl border-r border-accent-light/10 dark:border-accent-dark/10 transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${
        sidebarCollapsed ? 'md:w-16' : 'md:w-64'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent-light/10 dark:border-accent-dark/10">
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-accent-light dark:text-accent-dark">
                DevDomain
              </span>
            )}
            <div className="flex items-center space-x-2">
              <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                <Menu className="w-5 h-5" />
              </button>
              <button 
                className="hidden md:block p-1 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link 
              href="/dashboard" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Globe className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span className="font-medium">My Dashboard</span>}
            </Link>
            
            <Link 
              href="/dashboard/my-domains" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/my-domains' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Package className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span>My Domains</span>}
            </Link>
            
            <Link 
              href="/dashboard/purchased-domains" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/purchased-domains' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Zap className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span>Purchased Domains</span>}
            </Link>
            
            <Link 
              href="/dashboard/all-configured-domains" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/all-configured-domains' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <LucideLink className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span>All Configured Domains</span>}
            </Link>
            
            <Link 
              href="/dashboard/cart" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/cart' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <ShoppingCart className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span>Cart</span>}
            </Link>
            
            <Link 
              href="/dashboard/account" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/account' 
                  ? 'bg-accent-light/10 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <UserCircle className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-5 h-5'} text-accent-light dark:text-accent-dark`} />
              {!sidebarCollapsed && <span>Account</span>}
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-accent-light/10 dark:border-accent-dark/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-accent-light dark:bg-accent-dark flex items-center justify-center">
                <User className="w-4 h-4 text-primary-light dark:text-primary-dark" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session?.user?.name || 'User'}</p>
                  <p className="text-xs text-accent-light/60 dark:text-accent-dark/60 truncate">{session?.user?.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-accent-light/10 dark:border-accent-dark/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-accent-light/40 dark:text-accent-dark/40" />
                <input
                  type="text"
                  placeholder="Search domains by name, platform, or price..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 transition-all duration-300 text-lg"
                />
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <button className="relative p-2 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <HeadlessMenu as="div" className="relative">
                <HeadlessMenu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent-light dark:bg-accent-dark flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-light dark:text-primary-dark" />
                  </div>
                </HeadlessMenu.Button>

                <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-black rounded-xl shadow-lg border border-accent-light/10 dark:border-accent-dark/10 py-2 z-50">
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut()}
                        className={`${
                          active ? 'bg-accent-light/10 dark:bg-accent-dark/10' : ''
                        } flex items-center space-x-2 w-full px-4 py-2 text-left`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </HeadlessMenu.Item>
                </HeadlessMenu.Items>
              </HeadlessMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}