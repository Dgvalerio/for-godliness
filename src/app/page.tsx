import { FC, PropsWithChildren } from 'react';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Search, User } from 'lucide-react';

const H2: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
    {children}
  </h2>
);

const Home: NextPage = () => (
  <main className="flex w-full flex-1 flex-col items-center gap-4 p-4">
    <Image src="/ccb-logo.png" alt="CCB Logo" width={128} height={65} />
    <H2>Prontuários</H2>
    <Separator />
    <Button className="w-full gap-4">
      <Search size={16} /> Pesquisar prontuário
    </Button>
    <Button className="w-full items-center gap-4" asChild>
      <Link href="/prontuario/criar">
        <User size={16} /> Criar prontuário
      </Link>
    </Button>
  </main>
);

export default Home;
