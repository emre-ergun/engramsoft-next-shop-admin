'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider as StaticProvider } from 'next-themes';

const DynProvider = dynamic(
  () => import('next-themes').then(e => e.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const NextThemesProvider =
    process.env.NODE_ENV === 'production' ? StaticProvider : DynProvider;

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
