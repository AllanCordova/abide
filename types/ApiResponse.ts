export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T | null;
  error?: string;
};
