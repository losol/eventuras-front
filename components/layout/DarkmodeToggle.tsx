'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from 'components/inputs';
import { useTheme } from 'next-themes';
import * as React from 'react';

export default function DarkmodeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <IconSun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <IconMoon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
