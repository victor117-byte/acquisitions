'use client';

import { AuthProvider as NeonAuthProvider } from './auth-provider-neon';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <NeonAuthProvider>{children}</NeonAuthProvider>;
}

export { useAuth } from './auth-provider-neon';