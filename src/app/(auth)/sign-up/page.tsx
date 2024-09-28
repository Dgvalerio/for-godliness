'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

import {
  SignUpForm,
  SignUpFormProps,
} from '@/app/(auth)/sign-up/components/form';
import { toast } from '@/lib/sonner/sonner';
import { routes } from '@/utils/constants/routes';

import { getAuth } from 'firebase/auth';

const SignUpPage: NextPage = () => {
  const router = useRouter();

  const signUpHandler: SignUpFormProps['onSuccess'] = async (data) => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(result.user, { displayName: data.name });

    toast.success('Cadastro realizado com sucesso!');

    router.push(routes.signIn);
  };

  return <SignUpForm onSuccess={signUpHandler} />;
};

export default SignUpPage;
