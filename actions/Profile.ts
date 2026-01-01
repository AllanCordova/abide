"use server";

import Model from "@/core/model/Model";
import { Profile } from "@/types/Tables";
import { ApiResponse } from "@/types/ApiResponse";
import { getErrorMessage } from "@/lib/errors/auth-errors";

export async function createProfile(
  profile: Omit<Profile, "id"> & { id: string }
): Promise<ApiResponse> {
  try {
    const modelService: Model<"profiles"> = new Model("profiles");
    const { data, error } = await modelService.create({
      ...profile,
      role: profile.role || "member",
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create profile",
    };
  }
}

