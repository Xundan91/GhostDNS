

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email: string;
    role?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
  }
}


/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
/// <reference types="next" />
/// <reference types="next-auth" />

