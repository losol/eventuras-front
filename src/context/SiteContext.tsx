import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import Environment from '@/utils/Environment';

interface FeaturedImage {
  src: string;
  alt: string;
  caption: string;
}

interface FooterLink {
  text: string;
  href: string;
}

interface SiteInfo {
  name: string;
  description: string;
  frontpage: {
    title: string;
    introduction: string;
    featuredImage: FeaturedImage;
  };
  footerLinks: FooterLink[];
}

interface SiteContextProps {
  siteInfo: SiteInfo | null;
}

const SiteContext = createContext<SiteContextProps | undefined>(undefined);

interface SiteProviderProps {
  children: ReactNode;
}

export const useSite = (): SiteContextProps => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export const SiteProvider: React.FC<SiteProviderProps> = ({ children }) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(Environment.NEXT_PUBLIC_SITE_SETTINGS_URL);
      const data = await res.json();
      setSiteInfo(data.site);
    };

    fetchData();
  }, []);

  const value = {
    siteInfo,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
