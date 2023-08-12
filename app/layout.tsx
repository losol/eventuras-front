import 'styles/globals.css';

import { OpenAPI } from '@losol/eventuras';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Eventuras',
  description: 'A life with eventuras',
};

// Forces dynamic site generation
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return <div>No access...</div>;
  }

  // Create a client side sessionObject without the accessToken
  const clientSideSession: Session = { ...session };
  if (clientSideSession.accessToken) {
    delete clientSideSession.accessToken;
  }

  OpenAPI.BASE = process.env.API_BASE_URL!;
  OpenAPI.VERSION = process.env.NEXT_PUBLIC_API_VERSION!;
  OpenAPI.TOKEN = session.accessToken ?? '';

  return (
    <html lang="en">
      <body>
        <Providers session={clientSideSession}>{children}</Providers>
      </body>
    </html>
  );
}
