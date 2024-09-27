import { compareAsc } from 'date-fns';
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

export enum MaritalStatusValues {
  single = 'single',
  married = 'married',
  widowed = 'widowed',
  separated = 'separated',
}

export const MaritalStatus: Record<MaritalStatusValues, string> = {
  single: 'Solteiro(a)',
  married: 'Casado(a)',
  widowed: 'Viúvo(a)',
  separated: 'Separado(a)',
};

export enum HousingConditionValues {
  own = 'own',
  rent = 'rent',
  financed = 'financed',
  loaned = 'loaned',
}

export const HousingCondition: Record<HousingConditionValues, string> = {
  own: 'Casa própria',
  rent: 'Casa alugada',
  financed: 'Casa financiada',
  loaned: 'Casa cedida',
};

export const recordSchema = z
  .object({
    name: z.string().min(1, 'O nome deve ser informado.'),
    cpf: z.string().min(1, 'O cpf deve ser informado.'),
    birthDate: z.string().date('Formato de data inválido.'),
    baptismDate: z.string().date('Formato de data inválido.'),
    maritalStatus: z.nativeEnum(MaritalStatusValues, {
      required_error: 'O estado civil deve ser informado.',
    }),
    occupation: z.string().min(1, 'A profissão deve ser informada.'),
    commonChurch: z.string().min(1, 'A comum congregação deve ser informada.'),
    housingCondition: z.nativeEnum(HousingConditionValues, {
      required_error: 'A condição de moradia deve ser informada.',
    }),
    housingValue: z.string().optional(),
  })
  .refine((data) => checkCPF(data.cpf), {
    message: 'Esse CPF é inválido.',
    path: ['cpf'],
  })
  .refine(
    (data) => {
      const now = new Date().toISOString();

      const time = now.split('T')[1];

      return compareAsc(`${data.birthDate}T${time}`, now) < 1;
    },
    {
      message: 'A data não deve ser maior que a atual.',
      path: ['birthDate'],
    }
  )
  .refine(
    (data) => {
      const now = new Date().toISOString();

      const time = now.split('T')[1];

      return compareAsc(`${data.baptismDate}T${time}`, now) < 1;
    },
    {
      message: 'A data não deve ser maior que a atual.',
      path: ['baptismDate'],
    }
  )
  .refine(
    (data) =>
      data.housingCondition !== HousingConditionValues.rent ||
      (data.housingValue !== undefined &&
        data.housingValue &&
        Number(data.housingValue.replaceAll(/\D/g, '')) > 0),
    {
      message: 'O valor do aluguel deve ser informado.',
      path: ['housingValue'],
    }
  )
  .refine(
    (data) =>
      data.housingCondition !== HousingConditionValues.financed ||
      (data.housingValue !== undefined &&
        data.housingValue &&
        Number(data.housingValue.replaceAll(/\D/g, '')) > 0),
    {
      message: 'O valor do financiamento deve ser informado.',
      path: ['housingValue'],
    }
  );
