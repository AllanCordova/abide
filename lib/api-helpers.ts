import { ApiResponse } from "@/types/ApiResponse";

export function assertSuccess<T>(response: ApiResponse<T>): NonNullable<T> {
  if (!response.success || response.error) {
    throw new Error(response.error || "Operação falhou");
  }

  if (response.data === null || response.data === undefined) {
    throw new Error("Dado não encontrado");
  }

  return response.data as NonNullable<T>;
}

export function getDataOrNull<T>(response: ApiResponse<T | null>): T | null {
  if (!response.success || response.error) {
    throw new Error(response.error || "Operação falhou");
  }

  return response.data ?? null;
}

export function getArrayData<T>(response: ApiResponse<T[]>): T[] {
  if (!response.success || response.error) {
    throw new Error(response.error || "Operação falhou");
  }

  return response.data ?? [];
}
