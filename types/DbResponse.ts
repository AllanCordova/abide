import { PostgrestError } from "@supabase/supabase-js";

export type DbResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};
