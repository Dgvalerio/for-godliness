import { z } from 'zod';

export const churchSchema = z.object({
  name: z.string().min(1, 'O nome deve ser informado.'),
  number: z.coerce.number().min(1, 'O número deve ser informado.'),
});
