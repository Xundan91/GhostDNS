import React from 'react';


type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-secondary-light to-primary-light dark:from-primary-dark dark:via-secondary-dark dark:to-primary-dark">
        {/* Graffiti Art Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-8 border-accent-light/30 dark:border-accent-dark/30 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-8 border-accent-light/20 dark:border-accent-dark/20 animate-spin-reverse-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.1)_100%)] animate-pulse"></div>
        </div>

        {/* Animated Paint Splashes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-[10%] w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-[20%] right-[15%] w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-delay-2"></div>
          <div className="absolute bottom-[15%] left-[20%] w-36 h-36 bg-pink-500/10 rounded-full blur-2xl animate-float-delay-4"></div>
        </div>

        {/* Mesh Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Auth Container */}
      <div className="relative w-full max-w-md mx-4">
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-fade-in"></div>
        
        <div className="relative p-8">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          <div className="text-center mb-8 relative animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-light via-accent-light to-accent-light/70 dark:from-accent-dark dark:via-accent-dark dark:to-accent-dark/70 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-accent-light/60 dark:text-accent-dark/60">{subtitle}</p>
          </div>
          <div className="animate-fade-in-up delay-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;