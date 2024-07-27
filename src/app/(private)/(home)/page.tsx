import { NextPage } from 'next';

import { DataSheetCreateForm } from '@/components/create-form';
import { awaiter } from '@/utils/functions/awaiter';

const HomePage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Ficha de apresentação de caso</h1>
      <DataSheetCreateForm />
    </main>
  );
};

export default HomePage;
