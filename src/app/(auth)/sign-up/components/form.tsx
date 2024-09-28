'use client';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/form/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/lib/sonner/sonner';

import { z } from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(1, 'O nome deve ser informado.'),
    email: z
      .string()
      .min(1, 'O e-mail deve ser informado.')
      .email('E-mail inválido.'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    passwordConfirmation: z
      .string()
      .min(8, 'A confirmação de senha deve ter pelo menos 8 caracteres.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'A senha deve ser igual a confirmação de senha.',
    path: ['passwordConfirmation'],
  });

type SignUpData = z.infer<typeof signUpSchema>;

export interface SignUpFormProps {
  onSuccess(data: SignUpData): Promise<void>;
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSuccess }) => {
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);

  const submitHandler: SubmitHandler<SignUpData> = async (data) => {
    setLoading(true);

    try {
      await onSuccess(data);
    } catch (e) {
      const error = e as FirebaseError;

      if (error.code === 'auth/email-already-in-use') {
        form.setError('email', {
          message: 'Esse e-mail já está em uso por outro usuário.',
        });
      }

      toast.error(
        'Houve uma falha ao realizar o cadastro, verifique seus dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root<SignUpData>
      {...form}
      onSubmit={submitHandler}
      className="flex flex-col gap-2"
    >
      <h1 className="text-center text-2xl font-semibold tracking-tight">
        Cadastro
      </h1>
      <Form.Input<SignUpData>
        placeholder="Exemplo: José da Silva"
        label="Nome"
        name="name"
        containerClassName="flex-1"
        data-test="name-input"
      />
      <Form.Input<SignUpData>
        placeholder="Exemplo: name@example.com"
        label="E-mail"
        name="email"
        containerClassName="flex-1"
        data-test="email-input"
        type="email"
      />
      <Form.Input<SignUpData>
        placeholder="********"
        label="Senha"
        name="password"
        containerClassName="flex-1"
        data-test="password-input"
        type="password"
      />
      <Form.Input<SignUpData>
        placeholder="********"
        label="Confirmação de senha"
        name="passwordConfirmation"
        containerClassName="flex-1"
        data-test="password-confirmation-input"
        type="password"
      />
      <Button type="submit" loading={loading} data-test="submit-button">
        Cadastrar
      </Button>
    </Form.Root>
  );
};
