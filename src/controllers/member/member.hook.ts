'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import { CreateMember } from '@/app/(private)/member/add/components/create-form/create-form';
import { Member, MemberController } from '@/controllers/member/member';
import { toast } from '@/lib/sonner/sonner';

export namespace IUseMemberController {
  export type ErrorHandler = (
    props: Partial<Record<keyof CreateMember, string>>
  ) => void;

  export interface Return {
    loading: boolean;
    create(data: CreateMember): Promise<void>;
    list(): Promise<Member[]>;
  }
}

export const useMemberController = (
  errorHandler?: IUseMemberController.ErrorHandler
): IUseMemberController.Return => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  const create: IUseMemberController.Return['create'] = useCallback(
    async (data: CreateMember) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        return void toast.warning('Nenhum usuário foi informado!');
      }

      const members = await MemberController.find(
        { cpf: data.cpf },
        sessionData.id
      );

      if (members.length > 0) {
        setLoading(false);

        errorHandler &&
          errorHandler({ cpf: 'Número do relatório já cadastrado!' });

        return void toast.error('Número do relatório já cadastrado!');
      }

      const response = await MemberController.create({
        ...data,
        userId: sessionData.id,
      });

      setLoading(false);

      return response;
    },
    [errorHandler, sessionData?.id]
  );

  const list: IUseMemberController.Return['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await MemberController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
