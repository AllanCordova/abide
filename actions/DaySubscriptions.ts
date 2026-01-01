"use server";

import Model from "@/core/model/Model";
import { getProfile, getUser } from "@/lib/auth-server";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { ApiResponse } from "@/types/ApiResponse";
import { TableInsert } from "@/types/Tables";

export async function toSubscribe(
  rawData: Omit<TableInsert<"day_subscriptions">, "user_id">
): Promise<ApiResponse> {
  // future make a schema to validation
  //   const validation = devotionalSchema.safeParse(rawData);

  //   if (validation.error) {
  //     return { success: false, error: validation.error.message };
  //   }

  const modelService: Model<"day_subscriptions"> = new Model(
    "day_subscriptions"
  );

  // difine if user is owner to security
  const user = await getUser();

  if (!user.data) {
    return { success: false, error: 'você precisa fazer login para se inscrever' };
  }

  const user_id = user.data.id;

  const { data, error } = await modelService.create({
    ...rawData,
    user_id: user_id,
  });
  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}

export async function getSubscribed(
  devotional_id: number,
  day_id: number
): Promise<ApiResponse> {
  const modelService: Model<"day_subscriptions"> = new Model(
    "day_subscriptions"
  );

  const user = await getUser();

  if (!user.data) {
    return { success: true, data: [] };
  }

  const user_id = user.data.id;

  console.log(user_id);

  const { data, error } = await modelService.getOne({
    devotional_id,
    day_id,
    user_id,
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
