import '@/app/globals.css';
import { ReactNode } from 'react';

import type { Metadata, NextPage } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Piedade',
  description: 'Site para a criação de prontuários para a obra da piedade',
};

const RootLayout: NextPage<{ children: ReactNode }> = ({ children }) => (
  <html lang="pt-br">
    <body
      className={cn(
        inter.className,
        'flex min-h-screen flex-col items-center justify-center'
      )}
    >
      {children}
    </body>
  </html>
);

export default RootLayout;
