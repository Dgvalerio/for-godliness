import { NextPage } from 'next';
import Link from 'next/link';

import { DataSheetCreateForm } from '@/app/(private)/(home)/components/create-form/create-form';
import { Button } from '@/components/ui/button';
import { awaiter } from '@/utils/functions/awaiter';

import { UserRoundPlus } from 'lucide-react';

const AddRecordPage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">Adicionar Registro!</h1>
      <DataSheetCreateForm />
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

export default AddRecordPage;
