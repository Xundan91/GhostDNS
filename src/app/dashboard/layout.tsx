'use client';

import { Menu, Search, Bell, User, Package, Settings, CreditCard, LogOut, Globe, Link as LucideLink, UserCircle, Heart, Zap, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from '@/components/ThemeToggle';

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-gray-500">Please wait while we verify your session.</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-gray-500">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
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
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
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
                  ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Globe className="w-5 h-5 text-emerald-500" />
              {!sidebarCollapsed && <span className="font-medium">My Dashboard</span>}
            </Link>
            
            <Link 
              href="/dashboard/my-domains" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/my-domains' 
                  ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Package className="w-5 h-5 text-blue-500" />
              {!sidebarCollapsed && <span>My Domains</span>}
            </Link>
            
            <Link 
              href="/dashboard/purchased-domains" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/purchased-domains' 
                  ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <Zap className="w-5 h-5 text-purple-500" />
              {!sidebarCollapsed && <span>Purchased Domains</span>}
            </Link>
            
            <Link 
              href="/dashboard/cart" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/cart' 
                  ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              {!sidebarCollapsed && <span>Cart</span>}
            </Link>
            
            <Link 
              href="/dashboard/account" 
              className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/dashboard/account' 
                  ? 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-blue-500/20' 
                  : 'hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
              }`}
            >
              <UserCircle className="w-5 h-5 text-indigo-500" />
              {!sidebarCollapsed && <span>Account</span>}
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-accent-light/10 dark:border-accent-dark/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
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
                  className="w-full pl-12 pr-4 py-3 bg-accent-light/5 dark:bg-accent-dark/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20 transition-all duration-300 text-lg"
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </HeadlessMenu.Button>

                <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-black/95 rounded-xl shadow-xl border border-accent-light/10 dark:border-accent-dark/10 py-2 backdrop-blur-xl">
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link href="/dashboard/account" className={`${active ? 'bg-accent-light/10 dark:bg-accent-dark/10' : ''} flex items-center space-x-2 px-4 py-2`}>
                        <UserCircle className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link href="/dashboard/settings" className={`${active ? 'bg-accent-light/10 dark:bg-accent-dark/10' : ''} flex items-center space-x-2 px-4 py-2`}>
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          // Clear all local and session storage
                          if (typeof window !== 'undefined') {
                            localStorage.clear();
                            sessionStorage.clear();
                          }
                          signOut({ callbackUrl: '/' });
                        }}
                        className={`${active ? 'bg-accent-light/10 dark:bg-accent-dark/10' : ''} flex items-center space-x-2 px-4 py-2 w-full text-left`}
                      >
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