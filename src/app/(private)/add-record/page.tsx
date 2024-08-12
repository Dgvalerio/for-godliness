import { NextPage } from 'next';

import { DataSheetCreateForm } from '@/app/(private)/(home)/components/create-form/create-form';
import { awaiter } from '@/utils/functions/awaiter';

const AddRecordPage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">Adicionar Registro!</h1>
      <DataSheetCreateForm />
    </main>
  );
};

export default AddRecordPage;
