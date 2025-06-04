'use client';

import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import Button from './Button';

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || data.msg);
      } else {
        alert("Signup successful!");
        window.location.href = '/login';
      }
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account"
      subtitle="Join our community of developers"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
              First Name
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              placeholder="John"
              className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
              Last Name
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Doe"
              className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Password
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
            required
          />
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p className="text-center text-sm text-accent-light/60 dark:text-accent-dark/60">
          Already have an account?{' '}
          <a href="/login" className="text-accent-light dark:text-accent-dark hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
