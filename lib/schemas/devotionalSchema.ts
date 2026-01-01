import { z } from "zod";

export const devotionalSchema = z.object({
  use: z.string().min(10, "O Devocional precisa ter 10 caracteres"),
  description: z
    .string()
    .max(300, "A Descrição pode ter no maximo 300 caracteres"),
});

export type DevotionalInput = z.infer<typeof devotionalSchema>;
