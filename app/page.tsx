'use client';

import { Heading, Text } from 'components/content';
import useTranslation from 'next-translate/useTranslation';

import Events from './Events';

export default function Homepage() {
  const { t } = useTranslation('home');

  return (
    <>
      <Heading as="h1">{t('demoTitle')}</Heading>
      <Text>{t('demoText')}</Text>
      <Events />
    </>
  );
}
