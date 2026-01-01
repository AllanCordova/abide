import { Database, Tables } from "@/database/database.types";

export type TableName = keyof Database["public"]["Tables"];

export type TableFilter<T extends TableName> = Partial<Tables<T>>;

export type TableRow<T extends TableName> = Tables<T>;

export type TableInsert<T extends TableName> =
  Database["public"]["Tables"][T]["Insert"];

export type TableUpdate<T extends TableName> =
  Database["public"]["Tables"][T]["Update"];

export type Devotional = Tables<"devotionals">;
export type DevotionalDay = Tables<"devotional_days">;
export type Verse = Tables<"verses">;
export type DaySubscriptions = Tables<"day_subscriptions">;

export type Profile = Tables<"profiles">;
