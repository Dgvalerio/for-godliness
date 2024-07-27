'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';

import { z } from 'zod';

const emailCheckSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido')
    .min(1, 'O e-mail deve ser informado.'),
});

type EmailCheckData = z.infer<typeof emailCheckSchema>;

export interface EmailCheckProps {
  onSuccess(email: string): void;
  loading?: boolean;
}

export const EmailCheck: FC<EmailCheckProps> = ({ onSuccess, loading }) => {
  const form = useForm<EmailCheckData>({
    resolver: zodResolver(emailCheckSchema),
  });

  const submitHandler: SubmitHandler<EmailCheckData> = async (data) =>
    onSuccess(data.email);

  return (
    <Form.Root<EmailCheckData>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
      <p className="text-sm text-zinc-400">
        Insira seu e-mail para entrar no sistema
      </p>
      <Form.Input<EmailCheckData>
        placeholder="name@example.com"
        name="email"
        containerClassName="flex-1"
        type="email"
      />
      <Button type="submit" loading={loading} disabled>
        Checar e-mail
      </Button>
    </Form.Root>
  );
};
