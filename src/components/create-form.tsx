'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { dataSheetSchema } from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { useDataSheetController } from '@/controllers/data-sheet/data-sheet.hook';

import { format } from 'date-fns';
import { z } from 'zod';

const getToday = (): string => format(new Date(), 'yyyy-MM-dd');

export type CreateDataSheet = z.infer<typeof dataSheetSchema>;

export const DataSheetCreateForm: FC = () => {
  const { loading, create } = useDataSheetController();

  const form = useForm<CreateDataSheet>({
    resolver: zodResolver(dataSheetSchema),
  });

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<CreateDataSheet> = async (formData) => {
    await create(formData);
  };

  return (
    <Form.Root<CreateDataSheet>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <Form.Input<CreateDataSheet>
          loading={loading}
          label="Dia"
          name="day"
          containerClassName="flex-1"
          type="date"
          defaultValue={getToday()}
        />
      </div>
      <div className="mt-2 flex justify-between gap-2">
        <Button
          loading={loading}
          className="w-[25%]"
          variant="outline"
          onClick={clearHandler}
        >
          Limpar
        </Button>
        <Button loading={loading} className="w-[25%]" type="submit">
          Criar
        </Button>
      </div>
    </Form.Root>
  );
};
