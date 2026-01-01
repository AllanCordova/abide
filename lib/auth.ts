import supabase from "@/database/supabase/Client";
import { ApiResponse } from "@/types/ApiResponse";

export async function getUser(): Promise<ApiResponse> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { success: true, data: user };
}

export async function getProfile(): Promise<ApiResponse> {
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

export async function getProfileById(id: string): Promise<ApiResponse> {
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
