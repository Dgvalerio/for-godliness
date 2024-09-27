'use client';
import { ChangeEventHandler, FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { CommonChurchSelect } from '@/app/(private)/add-record/components/create-form/comom-church-select';
import {
  HousingCondition,
  HousingConditionValues,
  MaritalStatus,
  recordSchema,
} from '@/app/(private)/add-record/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import {
  IUseMemberController,
  useMemberController,
} from '@/controllers/member/member.hook';
import { applyMask } from '@/utils/functions/masks';

import { z } from 'zod';

export type CreateRecordSheet = z.infer<typeof recordSchema>;

export const DataSheetCreateForm: FC = () => {
  const form = useForm<CreateRecordSheet>({
    resolver: zodResolver(recordSchema),
  });

  const errorHandler: IUseMemberController.ErrorHandler = (props) => {
    if (props.cpf) form.setError('cpf', { message: props.cpf });
  };

  const { loading, create } = useMemberController(errorHandler);

  const clearHandler = (): void => form.reset();

  const cpfChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    form.setValue('cpf', applyMask.cpf(event.currentTarget.value));
  };

  const housingValueChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    form.setValue('housingValue', applyMask.money(event.currentTarget.value));
  };

  const submitHandler: SubmitHandler<CreateRecordSheet> = async (formData) => {
    await create(formData);
  };

  const housingCondition = form.watch('housingCondition');

  return (
    <Form.Root<CreateRecordSheet>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <Form.Input<CreateRecordSheet>
        loading={loading}
        label="Nome"
        name="name"
        containerClassName="flex-1"
      />
      <Form.Input<CreateRecordSheet>
        loading={loading}
        label="CPF"
        name="cpf"
        placeholder="___.___.___-__"
        containerClassName="flex-1"
        onChange={cpfChangeHandler}
      />
      <Form.Input<CreateRecordSheet>
        loading={loading}
        label="Data de nascimento"
        name="birthDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Input<CreateRecordSheet>
        loading={loading}
        label="Data de batismo"
        name="baptismDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Combobox<CreateRecordSheet>
        loading={loading}
        label="Estado Civil"
        name="maritalStatus"
        containerClassName="flex-1"
        items={Object.entries(MaritalStatus).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <CommonChurchSelect />
      <Form.Input<CreateRecordSheet>
        loading={loading}
        label="Profissão"
        name="occupation"
        containerClassName="flex-1"
      />
      <Form.Combobox<CreateRecordSheet>
        loading={loading}
        label="Condição de moradia"
        name="housingCondition"
        containerClassName="flex-1"
        items={Object.entries(HousingCondition).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      {housingCondition === HousingConditionValues.financed && (
        <Form.Input<CreateRecordSheet>
          loading={loading}
          label="Parcela do Financiamento"
          name="housingValue"
          containerClassName="flex-1"
          type="number"
        />
      )}
      {housingCondition === HousingConditionValues.rent && (
        <Form.Input<CreateRecordSheet>
          loading={loading}
          label="Valor do Aluguel"
          name="housingValue"
          containerClassName="flex-1"
          onChange={housingValueChangeHandler}
        />
      )}
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