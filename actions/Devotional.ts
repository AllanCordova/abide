"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { devotionalSchema } from "@/lib/schemas/devotionalSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { TableInsert } from "@/types/Tables";

export async function getDevotionals(): Promise<ApiResponse> {
  const modelService: Model<"devotionals"> = new Model("devotionals");
  const { data, error } = await modelService.getAll();
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function getDevotionalsBySlug(slug: string): Promise<ApiResponse> {
  const modelService: Model<"devotionals"> = new Model("devotionals");
  const { data, error } = await modelService.getOne({ slug });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function createDevotional(
  rawData: TableInsert<"devotionals">
): Promise<ApiResponse> {
  const validation = devotionalSchema.safeParse(rawData);

  if (validation.error) {
    return { success: false, error: validation.error.message };
  }

  const modelService: Model<"devotionals"> = new Model("devotionals");
  const { data, error } = await modelService.create(rawData);
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
