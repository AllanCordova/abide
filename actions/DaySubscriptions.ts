"use server";

import Model from "@/core/model/Model";
import { getUser } from "@/lib/auth-server";
import { getErrorMessage } from "@/lib/errors/auth-errors";
import { authenticatedAction } from "@/lib/safe-action";
import { ApiResponse } from "@/types/ApiResponse";

async function subscribeLogic(userId: string, rawData: any) {
  const modelService = new Model("day_subscriptions");

  const { data, error } = await modelService.create({
    ...rawData,
    user_id: userId,
    completed_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: getErrorMessage(error) };
  return { success: true, data };
}

async function unSubscribeLogic(
  userId: string,
  data: { day_id: number; devotional_id: number }
) {
  const modelService = new Model("day_subscriptions");

  const { data: subscription, error: findError } = await modelService.getOne({
    day_id: data.day_id,
    devotional_id: data.devotional_id,
    user_id: userId,
  });

  if (findError || !subscription) {
    return { success: false, error: "Inscrição não encontrada" };
  }

  const { data: deletedData, error } = await modelService.destroy({
    id: subscription.id,
    user_id: userId,
  });

  if (error) return { success: false, error: getErrorMessage(error) };
  return { success: true, data: deletedData };
}

export async function toSubscribeDevotionalDay(rawData: any) {
  return authenticatedAction(subscribeLogic, rawData);
}

export async function unsubscribeToDevotionalDay(
  day_id: number,
  devotional_id: number
): Promise<ApiResponse> {
  return authenticatedAction(unSubscribeLogic, { day_id, devotional_id });
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

export async function getAllSubscribed(
  devotional_id: number
): Promise<ApiResponse> {
  const modelService: Model<"day_subscriptions"> = new Model(
    "day_subscriptions"
  );

  const user = await getUser();

  if (!user.data) {
    return { success: true, data: [] };
  }

  const user_id = user.data.id;

  const { data, error } = await modelService.getAll({
    devotional_id,
    user_id,
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
