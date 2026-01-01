"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { ApiResponse } from "@/types/ApiResponse";

export async function getDevotionalDays(
  devotional_id: number
): Promise<ApiResponse> {
  const modelService: Model<"devotional_days"> = new Model("devotional_days");
  const { data, error } = await modelService.getAll({ devotional_id });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function getDevotionalDayById(id: number): Promise<ApiResponse> {
  const model = new Model("devotional_days");

  const { data, error } = await model.getOne({ id });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data: data };
}
