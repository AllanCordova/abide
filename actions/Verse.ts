"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/errors";
import { ApiResponse } from "@/types/ApiResponse";
import { TableRow } from "@/types/Tables";

export async function getVersesByDay(
  day_id: number
): Promise<ApiResponse<TableRow<"verses">>> {
  const modelService: Model<"verses"> = new Model("verses");
  const { data, error } = await modelService.getOne({ day_id });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
