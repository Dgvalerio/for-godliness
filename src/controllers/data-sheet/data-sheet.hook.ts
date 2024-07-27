'use client';
import { useCallback, useState } from 'react';

import { useSession } from 'next-auth/react';

import { CreateDataSheet } from '@/components/create-form';
import {
  DataSheet,
  DataSheetController,
} from '@/controllers/data-sheet/data-sheet';

import { toast } from 'sonner';

interface IUseDataSheetController {
  loading: boolean;
  create(data: CreateDataSheet): Promise<void>;
  list(): Promise<DataSheet[]>;
}

export const useDataSheetController = (): IUseDataSheetController => {
  const { data: sessionData } = useSession();
  const [loading, setLoading] = useState(false);

  const create: IUseDataSheetController['create'] = useCallback(
    async (data: CreateDataSheet) => {
      setLoading(true);

      if (!sessionData?.id) {
        setLoading(false);

        return void toast.warning('Nenhum usuário foi informado!');
      }

      const response = await DataSheetController.create({
        ...data,
        userId: sessionData.id,
      });

      setLoading(false);

      return response;
    },
    [sessionData]
  );

  const list: IUseDataSheetController['list'] = useCallback(async () => {
    setLoading(true);

    if (!sessionData?.id) {
      setLoading(false);

      void toast.warning('Nenhum usuário foi informado!');

      return [];
    }

    const response = await DataSheetController.list(sessionData.id);

    setLoading(false);

    return response;
  }, [sessionData]);

  return { loading, create, list };
};
