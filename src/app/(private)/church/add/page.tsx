import { NextPage } from 'next';

import { ChurchCreateForm } from '@/app/(private)/church/add/components/create-form/create-form';
import { awaiter } from '@/utils/functions/awaiter';

const AddMemberPage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">Adicionar Igreja</h1>
      <ChurchCreateForm />
    </main>
  );
};

export default AddMemberPage;
