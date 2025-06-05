"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import Button from "./Button";

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard"); // ⬅️ Change to your desired page
    }

    setLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20 placeholder-black/20 dark:placeholder-white/20"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-accent-light/80 dark:text-accent-dark/80">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-white/10 bg-black/10 dark:bg-white/5"
            />
            <span className="ml-2 text-accent-light/60 dark:text-accent-dark/60">
              Remember me
            </span>
          </label>
          <a
            href="#"
            className="text-accent-light/60 dark:text-accent-dark/60 hover:text-accent-light dark:hover:text-accent-dark"
          >
            Forgot password?
          </a>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-accent-light/60 dark:text-accent-dark/60">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-accent-light dark:text-accent-dark hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
