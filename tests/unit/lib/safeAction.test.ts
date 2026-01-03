import { authenticatedAction } from "@/lib/safe-action";
import { getUser } from "@/core/auth/AuthServer";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

jest.mock("/core/auth/AuthServer", () => ({
  getUser: jest.fn(),
}));

describe("authenticatedAction Wrapper", () => {
  const mockActionLogic = jest.fn();

  it("deve redirecionar para login se o usuário NÃO estiver logado", async () => {
    (getUser as jest.Mock).mockResolvedValue({ data: null });

    const mockHeaders = new Map([["referer", "http://site.com/dashboard"]]);
    (headers as jest.Mock).mockResolvedValue(mockHeaders);

    try {
      await authenticatedAction(mockActionLogic, { algum: "dado" });
    } catch {
      // Expected to throw redirect
    }

    expect(getUser).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(
      expect.stringContaining("/login?callbackUrl=")
    );
    expect(mockActionLogic).not.toHaveBeenCalled();
  });

  it("deve executar a action e passar o User ID se estiver logado", async () => {
    const fakeUser = { id: "user-123" };
    (getUser as jest.Mock).mockResolvedValue({ data: fakeUser });

    mockActionLogic.mockResolvedValue({ success: true });

    const inputData = { titulo: "Oi" };

    const result = await authenticatedAction(mockActionLogic, inputData);

    expect(redirect).not.toHaveBeenCalled();
    expect(mockActionLogic).toHaveBeenCalledWith("user-123", inputData);
    expect(result).toEqual({ success: true });
  });
});
