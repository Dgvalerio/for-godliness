'use client';
import { ChangeEventHandler, FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  MaritalStatus,
  recordSchema,
} from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { useDataSheetController } from '@/controllers/data-sheet/data-sheet.hook';

import { z } from 'zod';

export type RecordSheet = z.infer<typeof recordSchema>;

export const DataSheetCreateForm: FC = () => {
  const { loading, create } = useDataSheetController();

  const form = useForm<RecordSheet>({
    resolver: zodResolver(recordSchema),
  });

  const clearHandler = (): void => form.reset();

  const cpfChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const prev = event.currentTarget.value;
    const justNumber = prev.replaceAll(/\D/g, '');

    const part1 = justNumber.slice(0, 3);
    const part2 = justNumber.slice(3, 6);
    const part3 = justNumber.slice(6, 9);
    const part4 = justNumber.slice(9, 11);

    let cpfFormat = '';

    if (part1) cpfFormat = part1;
    if (part2) cpfFormat += `.` + part2;
    if (part3) cpfFormat += `.` + part3;
    if (part4) cpfFormat += `-` + part4;

    form.setValue('cpf', cpfFormat);
  };

  const submitHandler: SubmitHandler<RecordSheet> = async (formData) => {
    console.log({ formData });
    // await create(formData);
  };

  useEffect(() => {
    console.log(form.formState.errors, form.getValues());
  }, [form, form.formState.errors]);

  return (
    <Form.Root<RecordSheet>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <Form.Input<RecordSheet>
        loading={loading}
        label="Nome"
        name="name"
        containerClassName="flex-1"
      />
      <Form.Input<RecordSheet>
        loading={loading}
        label="CPF"
        name="cpf"
        placeholder="___.___.___-__"
        containerClassName="flex-1"
        onChange={cpfChangeHandler}
      />
      <Form.Input<RecordSheet>
        loading={loading}
        label="Data de nascimento"
        name="birthDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Input<RecordSheet>
        loading={loading}
        label="Data de batismo"
        name="baptismDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Combobox<RecordSheet>
        // loading={loading}
        label="Estado Civil"
        name="maritalStatus"
        containerClassName="flex-1"
        items={Object.entries(MaritalStatus).map(([value, label]) => ({
          value: label,
          label,
        }))}
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
