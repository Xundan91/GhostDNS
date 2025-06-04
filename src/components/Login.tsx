import React from 'react';
import AuthLayout from './AuthLayout';
import Button from './Button';

const Login: React.FC = () => {
  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Email
          </label>
          <input
            type="email"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-white/10 bg-black/10 dark:bg-white/5" />
            <span className="ml-2 text-accent-light/60 dark:text-accent-dark/60">Remember me</span>
          </label>
          <a href="#" className="text-accent-light/60 dark:text-accent-dark/60 hover:text-accent-light dark:hover:text-accent-dark">
            Forgot password?
          </a>
        </div>

        <Button className="w-full">
          Sign in
        </Button>

        <p className="text-center text-sm text-accent-light/60 dark:text-accent-dark/60">
          Don't have an account?{' '}
          <a href="/signup" className="text-accent-light dark:text-accent-dark hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;