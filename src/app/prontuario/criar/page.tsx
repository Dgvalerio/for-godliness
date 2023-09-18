'use client';

import { FC, PropsWithChildren } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { Search, User } from 'lucide-react';

const H2: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
    {children}
  </h2>
);

const Home: NextPage = () => (
  <main className="flex w-full flex-1 flex-col items-center gap-4 p-4">
    <H2>Novo Prontuário</H2>
    <Label className="flex w-full flex-col gap-2">
      Nome
      <Input placeholder="Nome" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      CPF
      <Input placeholder="___.___.___-__" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Data de Nascimento
      <Input type="date" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Estado Civil
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Estado Civil" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Estado Civil</Select.Label>
            <Select.Item value="solteiro">Solteiro(a)</Select.Item>
            <Select.Item value="casado">Casado(a)</Select.Item>
            <Select.Item value="viuvo">Viúvo(a)</Select.Item>
            <Select.Item value="separado">Separado(a)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Comum Congregação
      <Input placeholder="Comum Congregação" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Ministério ou Cargo
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Ministério/Cargo" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Ministério</Select.Label>
            <Select.Item value="anc">Ancião</Select.Item>
            <Select.Item value="iop">Irmã da Obra da Piedade</Select.Item>
            <Select.Item value="co">Cooperador do Ofício</Select.Item>
            <Select.Item value="cjm">
              Cooperador de Jovens e Menores
            </Select.Item>
          </Select.Group>
          <Select.Group>
            <Select.Label>Cargo</Select.Label>
            <Select.Item value="eo">Encarregado de Orquestra</Select.Item>
            <Select.Item value="mo">Músico/Organista</Select.Item>
            <Select.Item value="pa">Porteiro/Auxiliar da porta</Select.Item>
            <Select.Item value="aa">Auxiliar Administrativo</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Profissão
      <Input placeholder="Profissão" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Renda mensal
      <Input placeholder="Renda mensal" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Origem da Renda
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Origem da Renda" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Origem da Renda</Select.Label>
            <Select.Item value="t">Trabalho</Select.Item>
            <Select.Item value="ps">Previdência Social</Select.Item>
            <Select.Item value="pa">Pensão Alimentícia</Select.Item>
            <Select.Item value="ps">Programas Sociais</Select.Item>
            <Select.Item value="o">Outros</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Condição de Moradia
      <Select.Root>
        <Select.Trigger>
          <Select.Value placeholder="Condição de Moradia" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Condição de Moradia</Select.Label>
            <Select.Item value="propria">Casa Própria</Select.Item>
            <Select.Item value="cedida">Casa Cedida</Select.Item>
            <Select.Item value="financiada">Casa Financiada</Select.Item>
            <Select.Item value="alugada">Casa Alugada</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Label>
    {'financiada' && (
      <Label className="flex w-full flex-col gap-2">
        Valor da prestação
        <Input placeholder="Valor da prestação" />
      </Label>
    )}
    {'alugada' && (
      <Label className="flex w-full flex-col gap-2">
        Valor do aluguel
        <Input placeholder="Valor do aluguel" />
      </Label>
    )}
    <Separator />
    <Label className="flex w-full flex-col gap-2">
      Estado
      <Input placeholder="Estado" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Cidade
      <Input placeholder="Cidade" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Bairro
      <Input placeholder="Bairro" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Rua
      <Input placeholder="Rua" />
    </Label>
    <Label className="flex w-full flex-col gap-2">
      Número da casa
      <Input placeholder="Número da casa" />
    </Label>
    <Separator />
    <Button className="w-full items-center gap-4 uppercase" asChild>
      <Link href="/">Adicionar prontuário</Link>
    </Button>
    <Button
      className="w-full items-center gap-4 uppercase"
      variant="ghost"
      asChild
    >
      <Link href="/">Cancelar</Link>
    </Button>
  </main>
);

export default Home;
