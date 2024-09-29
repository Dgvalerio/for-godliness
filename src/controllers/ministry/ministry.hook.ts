'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import {
  CreateMinistry,
  Ministry,
  MinistryController,
} from '@/controllers/ministry/ministry';
import { toast } from '@/lib/sonner/sonner';

export namespace IUseMinistryController {
  export type ErrorHandler = (
    props: Partial<Record<keyof CreateMinistry, string>>
  ) => void;

  export interface Return {
    loading: boolean;
    create(
      data: CreateMinistry,
      config?: { hideToast: boolean }
    ): Promise<void>;
    list(): Promise<Ministry[]>;
  }
}

export const useMinistryController = (
  errorHandler?: IUseMinistryController.ErrorHandler
): IUseMinistryController.Return => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  const create: IUseMinistryController.Return['create'] = useCallback(
    async (data: CreateMinistry, config) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        if (!config?.hideToast) toast.warning('Nenhum usuário foi informado!');

        return;
      }

      const ministries = await MinistryController.find(
        { memberId: data.memberId },
        sessionData.id
      );

      if (ministries.length > 0) {
        setLoading(false);

        errorHandler &&
          errorHandler({
            ministry: 'Essa pessoa já tem um ministério cadastrado',
          });

        if (!config?.hideToast)
          toast.error('Essa pessoa já tem um ministério cadastrado');

        return;
      }

      const response = await MinistryController.create({
        ...data,
        userId: sessionData.id,
      });

      if (!config?.hideToast)
        toast.success(`Ministério adicionado com sucesso!`);

      setLoading(false);

      return response;
    },
    [errorHandler, sessionData?.id]
  );

  const list: IUseMinistryController.Return['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await MinistryController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
