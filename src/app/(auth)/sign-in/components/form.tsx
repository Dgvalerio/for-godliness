'use client';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';

import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail deve ser informado.')
    .email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

type PasswordCheckData = z.infer<typeof signInSchema>;

export interface SignInFormProps {
  loading?: boolean;
  onSuccess(data: PasswordCheckData): Promise<void>;
}

export const SignInForm: FC<SignInFormProps> = ({ loading, onSuccess }) => {
  const form = useForm<PasswordCheckData>({
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<PasswordCheckData> = async (data) =>
    onSuccess(data);

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
        data-test="email-input"
      />
      <Form.Input<PasswordCheckData>
        placeholder="********"
        name="password"
        containerClassName="flex-1"
        type="password"
        data-test="password-input"
      />
      <Button type="submit" loading={loading} data-test="submit-button">
        Entrar
      </Button>
    </Form.Root>
  );
};
