// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("vercel")}>Sign in with Vercel</button>
    </div>
  );
}
