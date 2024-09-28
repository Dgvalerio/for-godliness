'use client';
import { ChangeEventHandler, FC } from 'react';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { CommonChurchSelect } from '@/app/(private)/member/add/components/create-form/comom-church-select';
import {
  HousingCondition,
  HousingConditionValues,
  MaritalStatus,
  memberSchema,
} from '@/app/(private)/member/add/components/create-form/schemas/member.schema';
import { Ministry } from '@/app/(private)/member/add/components/create-form/schemas/ministry.schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  IUseMemberController,
  useMemberController,
} from '@/controllers/member/member.hook';
import { applyMask } from '@/utils/functions/masks';

import { z } from 'zod';

export type CreateMember = z.infer<typeof memberSchema>;

export type InputOnChange = ChangeEventHandler<HTMLInputElement>;

const MinistryInput: FC<{ loading: boolean }> = ({ loading }) => {
  const { watch, control, setValue } = useFormContext<CreateMember>();

  const handleCheckedChange = (
    onChange: (checked: boolean) => void,
    checked: boolean
  ): void => {
    if (!checked) {
      setValue('ministry', undefined);
      setValue('ministryPresentation', undefined);
    }

    onChange(checked);
  };

  const hasMinistry = watch('hasMinistry');

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-3 shadow-sm">
      <FormField
        control={control}
        name="hasMinistry"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <FormLabel>Tem ministério?</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={handleCheckedChange.bind(null, field.onChange)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {hasMinistry && (
        <>
          <Separator className="my-2" />
          <Form.Combobox<CreateMember>
            loading={loading}
            label="Ministério"
            name="ministry"
            containerClassName="flex-1"
            items={Object.entries(Ministry).map(([value, label]) => ({
              value,
              label,
            }))}
          />
          <Form.Input<CreateMember>
            loading={loading}
            label="Data de apresentação"
            name="ministryPresentation"
            containerClassName="flex-1"
            type="date"
          />
        </>
      )}
    </div>
  );
};

export const MemberCreateForm: FC = () => {
  const form = useForm<CreateMember>({
    resolver: zodResolver(memberSchema),
  });

  const errorHandler: IUseMemberController.ErrorHandler = (props) => {
    if (props.cpf) form.setError('cpf', { message: props.cpf });
  };

  const { loading, create } = useMemberController(errorHandler);

  const clearHandler = (): void => form.reset();

  const cpfChangeHandler: InputOnChange = (event) => {
    form.setValue('cpf', applyMask.cpf(event.currentTarget.value));
  };

  const housingValueChangeHandler: InputOnChange = (event) => {
    form.setValue('housingValue', applyMask.money(event.currentTarget.value));
  };

  const submitHandler: SubmitHandler<CreateMember> = async (formData) => {
    try {
      await create(formData);
    } catch (e) {
      console.log(e);
    }
  };

  const housingCondition = form.watch('housingCondition');

  return (
    <Form.Root<CreateMember>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <Form.Input<CreateMember>
        loading={loading}
        label="Nome"
        name="name"
        placeholder="Exemplo: José da Silva"
        containerClassName="flex-1"
      />
      <Form.Input<CreateMember>
        loading={loading}
        label="CPF"
        name="cpf"
        placeholder="___.___.___-__"
        containerClassName="flex-1"
        onChange={cpfChangeHandler}
      />
      <Form.Input<CreateMember>
        loading={loading}
        label="Data de nascimento"
        name="birthDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Input<CreateMember>
        loading={loading}
        label="Data de batismo"
        name="baptismDate"
        containerClassName="flex-1"
        type="date"
      />
      <Form.Combobox<CreateMember>
        loading={loading}
        label="Estado Civil"
        name="maritalStatus"
        containerClassName="flex-1"
        items={Object.entries(MaritalStatus).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <CommonChurchSelect loading={loading} />
      <Form.Input<CreateMember>
        loading={loading}
        label="Profissão"
        name="occupation"
        placeholder="Exemplo: Professor da rede municipal"
        containerClassName="flex-1"
      />
      <Form.Combobox<CreateMember>
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
        <Form.Input<CreateMember>
          loading={loading}
          label="Parcela do Financiamento"
          name="housingValue"
          containerClassName="flex-1"
          type="number"
        />
      )}
      {housingCondition === HousingConditionValues.rent && (
        <Form.Input<CreateMember>
          loading={loading}
          label="Valor do Aluguel"
          name="housingValue"
          containerClassName="flex-1"
          onChange={housingValueChangeHandler}
        />
      )}
      <Separator />
      <MinistryInput loading={loading} />
      <Separator />
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
