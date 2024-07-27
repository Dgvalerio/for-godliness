'use client';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';

import { z } from 'zod';

const passwordCheckSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido')
    .min(1, 'O e-mail deve ser informado.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

type PasswordCheckData = z.infer<typeof passwordCheckSchema>;

export interface PasswordCheckProps {
  email: string;
  loading?: boolean;
  onSuccess(data: PasswordCheckData): Promise<void>;
}

export const PasswordCheck: FC<PasswordCheckProps> = ({
  email,
  loading,
  onSuccess,
}) => {
  const form = useForm<PasswordCheckData>({
    resolver: zodResolver(passwordCheckSchema),
  });

  const submitHandler: SubmitHandler<PasswordCheckData> = async (data) =>
    onSuccess(data);

  useEffect(() => {
    form.setValue('email', email);
  }, [email, form]);

  return (
    <Form.Root<PasswordCheckData>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
      <Form.Input<PasswordCheckData>
        placeholder="name@example.com"
        name="email"
        containerClassName="flex-1"
        type="email"
      />
      <Form.Input<PasswordCheckData>
        placeholder="********"
        name="password"
        containerClassName="flex-1"
        type="password"
      />
      <Button type="submit" loading={loading}>
        Entrar
      </Button>
    </Form.Root>
  );
};
