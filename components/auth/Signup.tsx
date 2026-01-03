"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/core/auth/AuthClient";
import { createProfile } from "@/actions/Profile";
import { Input } from "../form/Input";
import { toast } from "sonner";
import { signUpSchema, SignUpForm } from "@/lib/schemas/authSchema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Loader2, ArrowRight } from "lucide-react";

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

    const signUpResponse = await signUp(userPayload);

    if (signUpResponse.error) {
      setError("root", { message: signUpResponse.error });
      toast.error("Erro ao criar conta");
      return;
    }

    if (signUpResponse.data?.id) {
      const profileResponse = await createProfile({
        id: signUpResponse.data.id,
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

    toast.success("Conta criada com sucesso! faça login no APP.");
    router.push("login");
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <div className="space-y-1">
            <Input
              label="Nome Completo"
              placeholder="Como você quer ser chamado?"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Senha"
              type="password"
              placeholder="******"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="space-y-1">
            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="******"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          {errors.root && (
            <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg text-sm text-center font-medium animate-pulse">
              {errors.root.message}
            </div>
          )}

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
