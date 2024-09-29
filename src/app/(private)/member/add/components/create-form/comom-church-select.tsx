'use client';
import { FC, useCallback, useEffect, useState } from 'react';

import { CreateMember } from '@/app/(private)/member/add/components/create-form/create-form';
import { Form } from '@/components/form/form';
import { useChurchController } from '@/controllers/church/church.hook';

export const CommonChurchSelect: FC<{ loading: boolean }> = ({
  loading: formLoading,
}) => {
  const { list, loading } = useChurchController();

  const [churchesItems, setChurchesItems] = useState<
    { value: string; label: string }[]
  >([]);

  const load = useCallback(async (): Promise<void> => {
    const churches = await list();

    setChurchesItems(
      churches.map((church) => ({
        label: `${church.number} - ${church.name}`,
        value: church.id,
      }))
    );
  }, [list]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <Form.Combobox<CreateMember>
      loading={loading || formLoading}
      label="Comum congregação"
      name="commonChurch"
      containerClassName="flex-1"
      items={churchesItems}
    />
  );
};
