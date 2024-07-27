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
      <div>
        <div>
          <span>Caso de (assinalar com x)</span>
          <label>
            Reunião (caso a atender)
            <input type="radio" />
          </label>
          <label>
            Emergência (atendido)
            <input type="radio" />
          </label>
        </div>
        <div>
          <span>Consideração de (assinalar com x)</span>
          <label>
            Caso novo
            <input type="radio" />
          </label>
          <label>
            Reapresentação
            <input type="radio" />
          </label>
          <label>
            Baixa de atendimento
            <input type="radio" />
          </label>
          <label>
            Revisão de caso mensal
            <input type="radio" />
          </label>
        </div>
        <div>
          <span>Atenderá (assinalar x)</span>
          <label>
            Irmãs
            <input type="radio" />
          </label>
          <label>
            Diáconos
            <input type="radio" />
          </label>
        </div>
        <div>
          <label>
            Data(reunião ou emergência)
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Prontuário nº
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Nome
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Idade
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Tempo de crente
            <input type="text" />
          </label>
        </div>
        <div>
          <span>Estado civil(assinalar com x)</span>
          <label>
            Solteiro(a)
            <input type="radio" />
          </label>
          <label>
            Casado(a)
            <input type="radio" />
          </label>
          <label>
            Viúvo(a)
            <input type="radio" />
          </label>
          <label>
            Separado(a)
            <input type="radio" />
          </label>
        </div>
        <div>
          <label>
            Nome do cônjuge
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Idade
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Tempo de crente
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Residência (rua e nº)
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Congregação comum do atendido
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Bairro
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Cidade
            <input type="text" />
          </label>
        </div>

        <div>
          <label>
            Quanto paga de aluguel? R$__________________________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Piedade atende mensal? R$ __________________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Quantos filhos/netos tem em casa? _____
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Quanto ganha do trabalho? R$ _______________________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Quanto ganham os filhos? R$ ________________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Idade dos filhos: ___/ ___/___/___/___/___
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Quanto ganha da Previdência? R$ ____________________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Número de filhos que trabalham _____________
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Idade dos netos: ___/ ___/___/___/___/___
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Histórico
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Qual a necessidade?
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Irmãs da Piedade (nome ou assinatura)
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Diáconos (nome ou assinatura)
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Valor mensal R$
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Valor de momento R$
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Valor de momento R$
            <input type="text" />
          </label>
        </div>

        <div>
          <span>Se for caso de emergência</span>
          <label>
            Levará o dinheiro
            <input type="radio" />
          </label>
          <label>
            não levará
            <input type="radio" />
          </label>
        </div>
        <div>
          <label>
            Valor da emergência R$
            <input type="text" />
          </label>
        </div>
        <div>
          <span>Se for caso de emergência</span>
          <label>
            Roupas uso pessoal
            <input type="radio" />
          </label>
          <label>
            Roupas de cama
            <input type="radio" />
          </label>
          <label>
            Diversos
            <input type="radio" />
          </label>
        </div>
        <div>
          <label>
            Aprovado em reunião - visto
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            Valor por extenso (mensal + momento + emergência)
            <input type="text" />
          </label>
        </div>
        <div>
          <span>PEDIDO DE ROUPAS E DIVERSOS</span>
          <table>
            <thead>
              <tr>
                <th>DESCRIÇÃO DO PRODUTO</th>
                <th>CÓDIGO</th>
                <th>QUANTIDADE</th>
                <th>IDADE</th>
                <th>TAMANHO</th>
                <th>OBSERVAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
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
