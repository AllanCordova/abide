"use client";

import supabase from "@/database/supabase/Client";
import { LoginType } from "@/types/Login";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { loginSchema } from "@/lib/schemas/authSchema";
import { ApiResponse } from "@/types/ApiResponse";

export async function signIn(user: LoginType): Promise<ApiResponse> {
  const validation = loginSchema.safeParse(user);

  if (validation.error) {
    return { success: false, error: validation.error.message };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function signUp(user: LoginType): Promise<ApiResponse> {
  const validation = loginSchema.safeParse(user);

  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function signOut(): Promise<ApiResponse> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true };
}
