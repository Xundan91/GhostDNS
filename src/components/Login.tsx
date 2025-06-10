"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "./AuthLayout";
import Button from "./Button";

const Login: React.FC = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("=== Session Debug Info ===");
    console.log("Status:", status);
    console.log("Session:", session);
    console.log("Session User:", session?.user);
    console.log("========================");

    if (status === "authenticated" && session?.user) {
      console.log("Valid session detected, redirecting to dashboard...");
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // First, check auth configuration
      const authCheck = await fetch("/api/test-auth");
      const authConfig = await authCheck.json();
      console.log("Auth configuration:", authConfig);

      console.log("Starting sign in process...");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setError(result.error);
        return;
      }

      if (result?.ok) {
        console.log("Sign in successful");
        // Check auth configuration again after sign in
        const postAuthCheck = await fetch("/api/test-auth");
        const postAuthConfig = await postAuthCheck.json();
        console.log("Post-auth configuration:", postAuthConfig);

        if (postAuthConfig.hasSession) {
          console.log("Session established, redirecting...");
          window.location.href = "/dashboard";
        } else {
          console.error("Sign in succeeded but no session was established");
          setError("Authentication succeeded but session creation failed");
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
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

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Authenticated</h2>
          <p className="text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

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
            name="email"
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
            name="password"
            className="w-full bg-black/10 dark:bg-white/5 rounded-lg px-4 py-3 text-sm text-black dark:text-white border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-light/20 dark:focus:ring-accent-dark/20"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex items-center justify-between">
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

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
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
