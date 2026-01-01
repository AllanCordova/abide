import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha precisa ter 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha precisa ter 6 caracteres"),
});

export type SignUpForm = z.infer<typeof signUpSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
