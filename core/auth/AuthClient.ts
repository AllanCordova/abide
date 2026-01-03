"use client";

import supabase from "@/database/supabase/Client";
import { LoginType } from "@/types/Login";
import { getErrorMessage } from "@/lib/errors/errors";
import { loginSchema, signUpSchema } from "@/lib/schemas/authSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@supabase/supabase-js";

export async function signIn(user: LoginType): Promise<ApiResponse<User | null>> {
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

  return { success: true, data: data.user };
}

export async function signUp(user: LoginType): Promise<ApiResponse<User | null>> {
  const validation = signUpSchema.safeParse(user);

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

  return { success: true, data: data.user };
}

export async function signOut(): Promise<ApiResponse<void>> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true };
}
