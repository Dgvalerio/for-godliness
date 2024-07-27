import { buildDate } from '@/utils/functions/build-date';

import { z } from 'zod';

export const dataSheetSchema = z
  .object({
    client: z.string().min(1, 'O cliente deve ser informado.'),
    project: z.string().min(1, 'O projeto deve ser informado.'),
    category: z.string().min(1, 'A categoria deve ser informada.'),
    day: z.string().min(1, 'A data deve ser informada.'),
    startTime: z.string().min(1, 'A hora inicial deve ser informada.'),
    endTime: z.string().min(1, 'A hora final deve ser informada.'),
    description: z.string().min(1, 'A descrição deve ser informada.'),
  })
  .refine(
    (data) => {
      const now = new Date();

      const current = buildDate(now, { date: data.day });

      return current <= now;
    },
    {
      message: 'A data não deve ser maior que a atual.',
      path: ['day'],
    }
  )
  .refine(
    (data) => {
      const now = new Date();

      const initial = buildDate(now, { date: data.day, time: data.startTime });

      return initial < now;
    },
    {
      message: 'A hora inicial deve ser menor que a atual.',
      path: ['startTime'],
    }
  )
  .refine(
    (data) => {
      const now = new Date();

      const initial = buildDate(now, { date: data.day, time: data.endTime });

      return initial <= now;
    },
    {
      message: 'A hora final não deve ser maior que a atual.',
      path: ['endTime'],
    }
  )
  .refine(
    (data) => {
      const start = Number(data.startTime.replace(':', ''));
      const end = Number(data.endTime.replace(':', ''));

      return start < end;
    },
    {
      message: 'A hora final deve ser maior que a inicial.',
      path: ['endTime'],
    }
  );
