import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { awaiter } from '@/utils/functions/awaiter';

import { UserRoundPlus } from 'lucide-react';

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Bem vindo ao sistema!</h1>
      <div className="flex flex-col flex-wrap gap-2">
        <Button
          className="flex h-32 w-32 flex-col items-center gap-1 text-wrap"
          variant="outline"
          asChild
        >
          <Link href="/add-record">
            <UserRoundPlus height={48} width={48} />
            <span className="text-center font-medium">Adicionar registro</span>
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;
