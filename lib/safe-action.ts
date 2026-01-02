import { getUser } from "./auth-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function authenticatedAction<T, R>(
  action: (userId: string, data: T) => Promise<R>,
  data: T
): Promise<R> {
  const user = await getUser();

  if (!user.data) {
    const headersList = await headers();
    const referer = headersList.get("referer") || "/";
    redirect(`/login?callbackUrl=${encodeURIComponent(referer)}`);
  }

  return action(user.data.id, data);
}
