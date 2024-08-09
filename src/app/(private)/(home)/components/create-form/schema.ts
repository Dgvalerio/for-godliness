import { z } from 'zod';

// From GePeTo
const checkCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D+/g, '');

  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais, o que é inválido
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Valida os dígitos verificadores
  let sum = 0;
  let rest;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  return rest === parseInt(cpf.substring(10, 11));
};

export const recordSchema = z
  .object({
    name: z.string().min(1, 'O nome deve ser informado.'),
    cpf: z.string().min(1, 'O cpf deve ser informado.'),
    birthDate: z.string().min(1, 'A data de nascimento deve ser informada.'),
    baptismDate: z.string().min(1, 'A data de batismo ser informada.'),
  })
  .refine((data) => checkCPF(data.cpf), {
    message: 'Esse CPF é inválido.',
    path: ['cpf'],
  });
