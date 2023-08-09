import 'styles/globals.css';

import { OpenAPI } from '@losol/eventuras';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';

import Providers from './Providers';

export const metadata: Metadata = {
  title: 'Eventuras',
  description: 'A life with eventuras',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>No access...</div>;
  }

  OpenAPI.BASE = process.env.API_BASE_URL!;
  OpenAPI.VERSION = process.env.NEXT_PUBLIC_API_VERSION!;
  OpenAPI.TOKEN = session.accessToken ?? '';

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
