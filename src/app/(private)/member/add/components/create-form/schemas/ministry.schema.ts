import { compareAsc } from 'date-fns';
import { z } from 'zod';

export enum MinistryValues {
  elder = 'elder',
  deacon = 'deacon',
  sister = 'sister',
  officeCooperator = 'officeCooperator',
  youthMinorsCooperator = 'youthMinorsCooperator',
}

export const Ministry: Record<MinistryValues, string> = {
  elder: 'Ancião',
  deacon: 'Diácono',
  sister: 'Irmã da Obra da Piedade',
  officeCooperator: 'Cooperador do Ofício',
  youthMinorsCooperator: 'Cooperador de Jovens e Menores',
};

export const memberMinistrySchema = z
  .object({
    hasMinistry: z.boolean().default(false).optional(),
    ministry: z.nativeEnum(MinistryValues).optional(),
    ministryPresentation: z
      .string()
      .date('Formato de data inválido.')
      .optional(),
  })
  .refine(
    (data) =>
      !data.hasMinistry || (data.hasMinistry && data.ministry !== undefined),
    {
      message: 'O ministério deve ser informado.',
      path: ['ministry'],
    }
  )
  .refine(
    (data) =>
      !data.hasMinistry ||
      (data.hasMinistry && data.ministryPresentation !== undefined),
    {
      message: 'A data de apresentação deve ser informada.',
      path: ['ministryPresentation'],
    }
  )
  .refine(
    (data) => {
      if (!data.hasMinistry || !data.ministryPresentation) return true;

      const now = new Date().toISOString();
      const time = now.split('T')[1];

      return compareAsc(`${data.ministryPresentation}T${time}`, now) < 1;
    },
    {
      message: 'A data não deve ser maior que a atual.',
      path: ['ministryPresentation'],
    }
  );
