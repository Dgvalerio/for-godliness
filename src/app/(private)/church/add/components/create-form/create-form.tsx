'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { churchSchema } from '@/app/(private)/church/add/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import {
  IUseChurchController,
  useChurchController,
} from '@/controllers/church/church.hook';

import { z } from 'zod';

export type CreateChurch = z.infer<typeof churchSchema>;

export const ChurchCreateForm: FC = () => {
  const form = useForm<CreateChurch>({ resolver: zodResolver(churchSchema) });

  const errorHandler: IUseChurchController.ErrorHandler = (props) => {
    if (props.name) form.setError('name', { message: props.name });
    if (props.number) form.setError('number', { message: props.number });
  };

  const { loading, create } = useChurchController(errorHandler);

  const clearHandler = (): void => form.reset();

  const submitHandler: SubmitHandler<CreateChurch> = async (formData) => {
    await create(formData);
  };

  return (
    <Form.Root<CreateChurch>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-4"
    >
      <Form.Input<CreateChurch>
        loading={loading}
        label="Nome"
        placeholder="Exemplo: Sítio Palanqueta I"
        name="name"
        containerClassName="flex-1"
      />
      <Form.Input<CreateChurch>
        loading={loading}
        label="Número do relatório"
        placeholder="Exemplo: 123"
        name="number"
        containerClassName="flex-1"
        type="number"
      />
      <div className="mt-4 flex justify-between gap-2">
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
