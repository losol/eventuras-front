'use client';
import React from 'react';

import { useSite } from '@/context/SiteContext';

import Heading from '../content/Heading';
import Container from './Container';

const Hero: React.FC = () => {
  const { siteInfo } = useSite();

  return (
    <section className="bg-primary-700 dark:bg-slate-900 text-white pt-16 pb-24">
      <Container>
        <Heading as="h1">{siteInfo?.frontpage.title ?? <>Eventuras</>}</Heading>
        <p>{siteInfo?.frontpage.introduction ?? <>Eventuras for life</>}</p>
      </Container>
    </section>
  );
};

export default Hero;
