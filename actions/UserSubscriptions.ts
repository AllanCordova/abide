"use server";

import Model from "@/core/model/Model";
import { getUser } from "@/core/auth/AuthServer";
import { getErrorMessage } from "@/lib/errors/errors";
import { authenticatedAction } from "@/lib/safe-action";
import { ApiResponse } from "@/types/ApiResponse";
import { TableInsert, TableRow } from "@/types/Tables";

async function subscribeLogic(
  userId: string,
  rawData: Omit<TableInsert<"user_subscriptions">, "user_id">
) {
  const modelService = new Model("user_subscriptions");

  const { data, error } = await modelService.create({
    ...rawData,
    user_id: userId,
  });

  if (error) return { success: false, error: getErrorMessage(error) };
  return { success: true, data };
}

async function unSubscribeLogic(userId: string, subscriptionId: number) {
  const modelService = new Model("user_subscriptions");

  const { data, error } = await modelService.destroy({
    id: subscriptionId,
    user_id: userId,
  });

  if (error) return { success: false, error: getErrorMessage(error) };
  return { success: true, data };
}

export async function subscribeToDevotional(
  rawData: Omit<TableInsert<"user_subscriptions">, "user_id">
): Promise<ApiResponse<TableRow<"user_subscriptions">>> {
  return authenticatedAction(subscribeLogic, rawData);
}

export async function unsubscribeToDevotional(
  subscriptionId: number
): Promise<ApiResponse<TableRow<"user_subscriptions">>> {
  return authenticatedAction(unSubscribeLogic, subscriptionId);
}

export async function getSubscribedDevotionals(): Promise<
  ApiResponse<TableRow<"devotionals">[]>
> {
  const user = await getUser();

  if (!user.data) {
    return { success: true, data: [] };
  }

  const user_id = user.data.id;

  const subscriptionsModel = new Model("user_subscriptions");
  const { data: subscriptions, error: subscriptionsError } =
    await subscriptionsModel.getAll({ user_id });

  if (subscriptionsError) {
    return {
      success: false,
      error: getErrorMessage(subscriptionsError),
    };
  }

  if (!subscriptions || subscriptions.length === 0) {
    return { success: true, data: [] };
  }

  const devotionalIds = subscriptions.map((sub) => sub.devotional_id);

  const devotionalsModel = new Model("devotionals");
  const { data: devotionals, error: devotionalsError } =
    await devotionalsModel.getByIds(devotionalIds, "id");

  if (devotionalsError) {
    return {
      success: false,
      error: getErrorMessage(devotionalsError),
    };
  }

  return { success: true, data: devotionals || [] };
}

export async function getSubscriptionByDevotional(
  devotional_id: number
): Promise<ApiResponse<TableRow<"user_subscriptions"> | null>> {
  const modelService: Model<"user_subscriptions"> = new Model(
    "user_subscriptions"
  );

  const user = await getUser();

  if (!user.data) {
    return { success: true, data: null };
  }

  const user_id = user.data.id;

  const { data, error } = await modelService.getOne({
    devotional_id,
    user_id,
  });

  if (error) {
    return { success: false, error: getErrorMessage(error) };
  }

  return { success: true, data };
}
