const authErrorMap: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos. Tente novamente.",
  "User not found": "Usuário não encontrado.",
  "Email not confirmed": "Você precisa confirmar seu e-mail antes de entrar.",
  "Password should be at least 6 characters":
    "A senha deve ter no mínimo 6 caracteres.",
};

export function getErrorMessage(errorRaw: any): string {
  if (!errorRaw) return "";

  const message = errorRaw.message || errorRaw.toString();

  const friendlyMessage = authErrorMap[message];

  return (
    friendlyMessage || "Ocorreu um erro inesperado. Tente novamente mais tarde."
  );
}
