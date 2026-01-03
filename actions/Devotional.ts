"use server";

import Model from "@/core/model/Model";
import { getErrorMessage } from "@/lib/errors/errors";
import { authenticatedAction } from "@/lib/safe-action";
import { devotionalSchema } from "@/lib/schemas/devotionalSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { TableInsert, TableRow } from "@/types/Tables";

export async function getDevotionals(
  searchQuery?: string
): Promise<ApiResponse<TableRow<"devotionals">[]>> {
  const modelService: Model<"devotionals"> = new Model("devotionals");

  if (searchQuery) {
    const { data, error } = await modelService.search("title", searchQuery);

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true, data: data };
  }

  const { data, error } = await modelService.getAll();

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function getDevotionalsBySlug(
  slug: string
): Promise<ApiResponse<TableRow<"devotionals"> | null>> {
  const modelService: Model<"devotionals"> = new Model("devotionals");
  const { data, error } = await modelService.getOne({ slug });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function createDevotional(
  user_id: string,
  rawData: TableInsert<"devotionals">
): Promise<ApiResponse<TableRow<"devotionals">>> {
  const validation = devotionalSchema.safeParse(rawData);

  if (validation.error) {
    return { success: false, error: validation.error.message };
  }

  const modelService: Model<"devotionals"> = new Model("devotionals");
  const { data, error } = await modelService.create({
    ...rawData,
    author_id: user_id,
  });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function toCreateDevotional(
  rawData: TableInsert<"devotionals">
) {
  return authenticatedAction(createDevotional, rawData);
}
