import { NextPage } from 'next';

import { MemberCreateForm } from '@/app/(private)/add-member/components/create-form/create-form';
import { awaiter } from '@/utils/functions/awaiter';

const AddMemberPage: NextPage = async () => {
  await awaiter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-lg font-semibold">Adicionar membro</h1>
      <MemberCreateForm />
    </main>
  );
};

export default AddMemberPage;
