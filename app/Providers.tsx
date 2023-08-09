'use client';

import { UserProvider } from 'context';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  session: any;
  children: React.ReactNode;
};

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
