"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/errors";
import { ApiResponse } from "@/types/ApiResponse";
import { TableRow } from "@/types/Tables";

export async function getDevotionalDays(
  devotional_id: number
): Promise<ApiResponse<TableRow<"devotional_days">[]>> {
  const modelService: Model<"devotional_days"> = new Model("devotional_days");
  const { data, error } = await modelService.getAll({ devotional_id });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function getDevotionalDayById(
  id: number
): Promise<ApiResponse<TableRow<"devotional_days"> | null>> {
  const model = new Model("devotional_days");

  const { data, error } = await model.getOne({ id });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data: data };
}
