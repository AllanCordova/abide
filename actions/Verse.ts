"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { ApiResponse } from "@/types/ApiResponse";

export async function getVersesByDay(day_id: number): Promise<ApiResponse> {
  const modelService: Model<"verses"> = new Model("verses");
  const { data, error } = await modelService.getAll({ day_id });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
