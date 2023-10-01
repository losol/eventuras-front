'use client';

import { ReactNode } from 'react';

import { Footer, Header } from '@/components/layout';
import { useSite } from '@/context/SiteContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { siteInfo } = useSite();

  const { children } = props;
  return (
    <>
      <Header title={siteInfo?.name ?? 'Eventuras'} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
