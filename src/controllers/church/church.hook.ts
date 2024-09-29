'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import { CreateChurch } from '@/app/(private)/church/add/components/create-form/create-form';
import { Church, ChurchController } from '@/controllers/church/church';
import { toast } from '@/lib/sonner/sonner';

export namespace IUseChurchController {
  export type ErrorHandler = (
    props: Partial<Record<keyof CreateChurch, string>>
  ) => void;

  export interface Return {
    loading: boolean;
    create(data: CreateChurch): Promise<void>;
    list(): Promise<Church[]>;
  }
}

export const useChurchController = (
  errorHandler?: IUseChurchController.ErrorHandler
): IUseChurchController.Return => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  const create: IUseChurchController.Return['create'] = useCallback(
    async (data: CreateChurch) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        return void toast.warning('Nenhum usuário foi informado!');
      }

      const churches = await ChurchController.find(
        { number: data.number },
        sessionData.id
      );

      if (churches.length > 0) {
        setLoading(false);

        const message = 'Número do relatório já cadastrado!';

        errorHandler && errorHandler({ number: message });

        return void toast.error(message);
      }

      const response = await ChurchController.create({
        ...data,
        userId: sessionData.id,
      });

      toast.success(`Igreja adicionada com sucesso!`);

      setLoading(false);

      return response;
    },
    [errorHandler, sessionData?.id]
  );

  const list: IUseChurchController.Return['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await ChurchController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
