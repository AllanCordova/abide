"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/core/auth/AuthClient";
import { Input } from "../form/Input";
import { loginSchema, LoginForm } from "@/lib/schemas/authSchema";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Loader2 } from "lucide-react";

const Login = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    const res = await signIn(data);

    if (res.error) {
      setError("root", { message: res.error });
      toast.error("Falha na autenticação");
      return;
    }

    toast.success("Bem-vindo de volta!");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
            <BookOpen size={24} />
          </div>
          <h1 className="text-fluid-xl font-bold text-foreground">
            Bem-vindo de volta
          </h1>
          <p className="text-muted text-sm mt-2">
            Insira suas credenciais para continuar sua jornada.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex justify-between items-center"></div>
            <Input
              label="Senha"
              type="password"
              placeholder="******"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="flex justify-end mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
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
                Entrando...
              </>
            ) : (
              "Entrar na conta"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted">
            Não tem uma conta ainda?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors"
            >
              Crie gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
