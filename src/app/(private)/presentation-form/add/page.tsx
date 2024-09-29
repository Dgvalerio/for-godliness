import { NextPage } from 'next';

import { awaiter } from '@/utils/functions/awaiter';

const AddPresentationFormPage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">
        Adicionar ficha de apresentação
      </h1>
    </main>
  );
};

export default AddPresentationFormPage;
