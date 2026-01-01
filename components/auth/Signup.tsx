"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/core/auth/AuthClient";
import { createProfile } from "@/actions/Profile";
import { Input } from "../form/Input";
import { Profile } from "@/types/Tables";
import { toast } from "sonner";
import { signUpSchema, SignUpForm } from "@/lib/schemas/authSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Loader2, User, Mail, Lock, ArrowRight } from "lucide-react";

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpForm) {
    const userPayload = {
      email: data.email,
      password: data.password,
    };

    // First, sign up the user
    const signUpResponse = await signUp(userPayload);

    if (signUpResponse.error) {
      setError("root", { message: signUpResponse.error });
      toast.error("Erro ao criar conta");
      return;
    }

    // If signup successful, create the profile using server action
    if (signUpResponse.data?.user?.id) {
      const profileResponse = await createProfile({
        id: signUpResponse.data.user.id,
        name: data.name,
        role: "member",
        avatar_url: null,
      });

      if (profileResponse.error) {
        setError("root", { message: profileResponse.error });
        toast.error("Erro ao criar perfil");
        return;
      }
    }

    toast.success("Conta criada com sucesso! Bem-vindo(a).");
    // O router.refresh() garante que o Header identifique o novo usuário imediatamente
    router.refresh();
    router.push("/");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {/* Card Principal */}
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
            <BookOpen size={24} />
          </div>
          <h1 className="text-fluid-xl font-bold text-foreground">
            Crie sua conta
          </h1>
          <p className="text-muted text-sm mt-2">
            Comece sua jornada de crescimento e constância hoje mesmo.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div className="space-y-1">
            <Input
              label="Nome Completo"
              placeholder="Como você quer ser chamado?"
              error={errors.name?.message}
              // Dica: Se seu Input aceitar ícone no futuro, use <User size={18} />
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <Input
              label="Senha"
              type="password"
              placeholder="******"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-1">
            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="******"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          {/* Erro Geral */}
          {errors.root && (
            <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg text-sm text-center font-medium animate-pulse">
              {errors.root.message}
            </div>
          )}

          {/* Botão Submit */}
          <button
            disabled={isSubmitting}
            className="
              w-full mt-6
              bg-primary text-primary-foreground font-semibold 
              h-11 rounded-lg 
              hover:bg-primary-hover 
              disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center gap-2
              shadow-lg shadow-primary/20
            "
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Criando conta...
              </>
            ) : (
              <>
                Registrar-se <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Rodapé (Link Login) */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors"
            >
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
