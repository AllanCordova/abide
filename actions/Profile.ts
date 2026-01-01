"use server";

import Model from "@/core/model/Model";
import { Profile } from "@/types/Tables";
import { ApiResponse } from "@/types/ApiResponse";
import { getErrorMessage } from "@/lib/errors/auth-errors";

export async function createProfile(
  profile: Omit<Profile, "id"> & { id: string }
): Promise<ApiResponse> {
  const modelService: Model<"profiles"> = new Model("profiles");
  const { data, error } = await modelService.create({
    ...profile,
    role: "member",
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
