'use client';
import { FC, PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { dataSheetSchema } from '@/app/(private)/(home)/components/create-form/schema';
import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDataSheetController } from '@/controllers/data-sheet/data-sheet.hook';

import { z } from 'zod';

export type CreateDataSheet = z.infer<typeof dataSheetSchema>;

const RG: FC<PropsWithChildren & { defaultValue?: string }> = ({
  children,
  defaultValue,
}) => <RadioGroup defaultValue={defaultValue}>{children}</RadioGroup>;

const RI: FC<{ name: string; value: string; label: string }> = ({
  name,
  value,
  label,
}) => (
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={value} id={name} />
    <Label htmlFor={name}>{label}</Label>
  </div>
);

const Radio = {
  Group: RG,
  Item: RI,
};

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
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Radio.Group>
            <Label>Caso de</Label>
            <Radio.Item
              name="reunion"
              value="reunion"
              label="Reunião (caso a atender)"
            />
            <Radio.Item
              name="emergency"
              value="emergency"
              label="Emergência (atendido)"
            />
          </Radio.Group>
          <Radio.Group>
            <Label>Consideração de</Label>
            <Radio.Item name="new-case" value="new-case" label="Caso novo" />
            <Radio.Item
              name="representation"
              value="representation"
              label="Reapresentação"
            />
            <Radio.Item
              name="low-attendance"
              value="low-attendance"
              label="Baixa de atendimento"
            />
            <Radio.Item
              name="monthly-case"
              value="monthly-case"
              label="Revisão de caso mensal"
            />
          </Radio.Group>
          <Radio.Group>
            <Label>Atenderá</Label>
            <Radio.Item name="sisters" value="sisters" label="Irmãs" />
            <Radio.Item name="deacons" value="deacons" label="Diáconos" />
          </Radio.Group>
          <Form.Input
            loading={loading}
            label="Data (reunião ou emergência)"
            name="date"
            type="date"
          />
          <Form.Input
            loading={loading}
            label="Prontuário nº"
            name="record-number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input loading={loading} label="Nome" name="name" />
          <Form.Input
            loading={loading}
            label="Idade"
            name="age"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Tempo de crente"
            name="believers-time"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Radio.Group>
            <Label>Estado civil</Label>
            <Radio.Item name="single" value="single" label="Solteiro(a)" />
            <Radio.Item name="married" value="married" label="Casado(a)" />
            <Radio.Item name="widowed" value="widowed" label="Viúvo(a)" />
            <Radio.Item
              name="separated"
              value="separated"
              label="Separado(a)"
            />
          </Radio.Group>
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Nome do cônjuge"
            name="spouse-name"
          />
          <Form.Input
            loading={loading}
            label="Idade do cônjuge"
            name="spouse-age"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Tempo de crente do cônjuge"
            name="spouse-believers-time"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Residência (rua e nº)"
            name="residence"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Congregação comum do atendido"
            name="common"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Bairro"
            name="district"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Cidade"
            name="city"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Quanto paga de aluguel? R$"
            name="rental-value"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Piedade atende mensal? R$"
            name="monthly-service-cost"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Quantos filhos/netos tem em casa?"
            name="dependents-count"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Quanto ganha do trabalho? R$"
            name="salary"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Quanto ganham os filhos? R$"
            name="dependents-salary"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Idade dos filhos:"
            name="age-of-children"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Quanto ganha da Previdência? R$"
            name="social-security"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Número de filhos que trabalham"
            name="working-children-count"
            type="number"
          />
          <Form.Input
            loading={loading}
            label="Idade dos netos:"
            name="age-of-grandchildren"
            type="number"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Textarea loading={loading} label="Histórico" name="history" />
        </div>
        <div className="flex items-start gap-2">
          <Form.Textarea
            loading={loading}
            label="Qual a necessidade?"
            name="want"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Irmãs da Piedade (nome ou assinatura)"
            name="sisters-names"
            type="text"
          />
          <Form.Input
            loading={loading}
            label="Diáconos (nome ou assinatura)"
            name="deacons-names"
            type="text"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Valor mensal R$"
            name="monthly-value"
            type="text"
          />
          <Form.Input
            loading={loading}
            label="Valor de momento R$"
            name="current-value"
            type="text"
          />
          <Radio.Group>
            <Label>Se for caso de emergência</Label>
            <Radio.Item
              name="emergency-take"
              value="single"
              label="Levará o dinheiro"
            />
            <Radio.Item
              name="emergency-not-take"
              value="married"
              label="não levará"
            />
          </Radio.Group>
          <Form.Input
            loading={loading}
            label="Valor da emergência R$"
            name="emergency-value"
            type="text"
          />
          <Radio.Group>
            <Label>Se for caso de emergência</Label>
            <Radio.Item
              name="personal-clothing"
              value="personal-clothing"
              label="Roupas uso pessoal"
            />
            <Radio.Item
              name="bed-linen"
              value="bed-linen"
              label="Roupas de cama"
            />
            <Radio.Item
              name="miscellaneous"
              value="miscellaneous"
              label="Diversos"
            />
          </Radio.Group>
          <Form.Textarea
            loading={loading}
            label="Aprovado em reunião - visto"
            name="approved"
          />
        </div>
        <div className="flex items-start gap-2">
          <Form.Input
            loading={loading}
            label="Valor por extenso (mensal + momento + emergência)"
            name="value-in-words"
            type="text"
          />
        </div>
        <Table>
          <TableCaption>PEDIDO DE ROUPAS E DIVERSOS</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>DESCRIÇÃO DO PRODUTO</TableHead>
              <TableHead>CÓDIGO</TableHead>
              <TableHead>QUANTIDADE</TableHead>
              <TableHead>IDADE</TableHead>
              <TableHead>TAMANHO</TableHead>
              <TableHead>OBSERVAÇÃO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
