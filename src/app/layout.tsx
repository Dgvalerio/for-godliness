import { PropsWithChildren } from 'react';

import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { SessionProvider } from '@/components/session-provider/session-provider';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/tailwind/utils';

import '@/lib/firebase/config';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'CCB',
  description: 'Sistema para gerenciar fichas da piedade',
};

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => (
  <html lang="pt-br">
    <body
      className={cn(
        inter.variable,
        'bg-background flex min-h-screen flex-col gap-4 font-sans antialiased'
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
