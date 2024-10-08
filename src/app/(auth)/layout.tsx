'use server';
import { PropsWithChildren } from 'react';

import { NextPage } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { ThemeToggleButton } from '@/components/theme-provider/theme-toggle-button';
import { cn } from '@/lib/tailwind/utils';
import { routes } from '@/utils/constants/routes';

interface PublicLayoutProps extends PropsWithChildren {}

const PublicLayout: NextPage<PublicLayoutProps> = async ({ children }) => {
  const session = await getServerSession();

  if (session && session.user) {
    redirect(routes.home);
  }

  return (
    <main
      className={cn(
        'm-auto flex w-full flex-1 md:max-h-[80vh] md:max-w-[80%]',
        'border border-zinc-700 md:rounded'
      )}
    >
      <aside className="flex flex-[1] flex-col bg-zinc-100 bg-auth bg-cover bg-bottom p-4 dark:bg-zinc-900 md:flex-[2] md:rounded-l">
        <header className="flex justify-end">
          <ThemeToggleButton />
        </header>
      </aside>
      <section className="flex flex-[4] flex-col items-center gap-4 rounded-r p-4 md:flex-[3]">
        <span className="font-black uppercase text-zinc-900/60 transition hover:text-opacity-100 dark:text-zinc-100/60">
          CCB
        </span>
        <div className="m-auto flex w-full flex-col md:max-w-[60%]">
          {children}
        </div>
        <div className="h-6" />
      </section>
    </main>
  );
};

export default PublicLayout;
