"use server";

import { createClient } from "@/database/supabase/Server";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "@supabase/supabase-js";
import { TableRow } from "@/types/Tables";

export async function getUser(): Promise<ApiResponse<User | null>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { success: true, data: user };
}

export async function getProfile(): Promise<ApiResponse<TableRow<"profiles"> | null>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: true, data: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return { success: false };
  }

  return { success: true, data: data };
}

export async function getProfileById(
  id: string
): Promise<ApiResponse<TableRow<"profiles">>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { success: false };
  }

  return { success: true, data: data };
}

