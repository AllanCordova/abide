const postgresErrorMap: Record<string, string> = {
  "23505": "Este registro já existe no sistema.",
  "23503": "Operação não permitida pois depende de outro registro inexistente.",
  "23502": "Um campo obrigatório não foi preenchido.",
  "23514": "Os dados enviados não cumprem as regras de validação.",
  "42501": "Você não tem permissão para realizar esta ação.",
  PGRST116: "Nenhum resultado encontrado.",
};

const authErrorMap: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "User not found": "Usuário não encontrado.",
  "Email not confirmed": "Confirme seu e-mail antes de acessar.",
  "Password should be at least 6 characters":
    "A senha precisa ter no mínimo 6 caracteres.",
  "Token has expired or is invalid":
    "O link expirou ou é inválido. Solicite um novo.",
  "Auth session missing!": "Sessão expirada. Faça login novamente.",
  "Rate limit exceeded":
    "Muitas tentativas. Aguarde alguns instantes e tente novamente.",
  "Signups not allowed for this instance":
    "Novos cadastros estão temporariamente desabilitados.",
  "User already registered": "Este e-mail já está cadastrado.",
};

type ErrorInput =
  | { code?: string; message?: string; toString?: () => string }
  | { message: string }
  | Error
  | string
  | null
  | undefined;

function hasCode(error: ErrorInput): error is { code: string; message?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}

function getErrorMessage(errorRaw: ErrorInput): string {
  if (!errorRaw) return "";

  if (hasCode(errorRaw) && postgresErrorMap[errorRaw.code]) {
    if (errorRaw.code === "23505") {
      if (errorRaw.message?.includes("email"))
        return "Este e-mail já está em uso.";
      if (errorRaw.message?.includes("slug"))
        return "Este endereço personalizado já existe.";
      if (errorRaw.message?.includes("username"))
        return "Este nome de usuário já existe.";
    }

    return postgresErrorMap[errorRaw.code];
  }

  let message = "";
  if (typeof errorRaw === "string") {
    message = errorRaw;
  } else if (errorRaw instanceof Error) {
    message = errorRaw.message;
  } else if (
    typeof errorRaw === "object" &&
    errorRaw !== null &&
    "message" in errorRaw &&
    typeof errorRaw.message === "string"
  ) {
    message = errorRaw.message;
  } else if (
    typeof errorRaw === "object" &&
    errorRaw !== null &&
    "toString" in errorRaw &&
    typeof errorRaw.toString === "function"
  ) {
    message = errorRaw.toString();
  } else {
    message = String(errorRaw);
  }

  const cleanMessage = message.trim();

  if (authErrorMap[cleanMessage]) {
    return authErrorMap[cleanMessage];
  }

  if (cleanMessage.includes("rate limit"))
    return authErrorMap["Rate limit exceeded"];
  if (cleanMessage.includes("credentials"))
    return authErrorMap["Invalid login credentials"];

  if (cleanMessage === "Failed to fetch" || cleanMessage.includes("network")) {
    return "Erro de conexão. Verifique sua internet e tente novamente.";
  }

  console.error("Erro Não Tratado:", errorRaw);
  return "Ocorreu um erro inesperado. Tente novamente.";
}

export { getErrorMessage };
