import { renderHook, waitFor, act } from "@testing-library/react";
import { useUserSession } from "@/hooks/useUserSession";
import { getProfile } from "@/lib/auth";
import { signOut } from "@/core/auth/AuthClient";
import { toast } from "sonner";

const mockRefresh = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("/lib/auth", () => ({
  getProfile: jest.fn(),
}));
jest.mock("/core/auth/AuthClient", () => ({
  signOut: jest.fn(),
}));

const mockUnsubscribe = jest.fn();
const mockOnAuthStateChange = jest.fn(() => ({
  data: { subscription: { unsubscribe: mockUnsubscribe } },
}));

jest.mock("/database/supabase/Client", () => ({
  auth: {
    onAuthStateChange: () => mockOnAuthStateChange(),
  },
}));

describe("useUserSession Hook", () => {
  const mockProfile = {
    id: "123",
    name: "Teste User",
    email: "teste@email.com",
  };

  it("deve iniciar com loading true e profile null", async () => {
    (getProfile as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useUserSession());

    expect(result.current.loading).toBe(true);
    expect(result.current.profile).toBeNull();
  });

  it("deve carregar o perfil do usuário com sucesso", async () => {
    (getProfile as jest.Mock).mockResolvedValue({
      data: mockProfile,
      error: null,
    });

    const { result } = renderHook(() => useUserSession());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(mockOnAuthStateChange).toHaveBeenCalled();
  });

  it("handleLogout deve chamar signOut e exibir toast de sucesso", async () => {
    (getProfile as jest.Mock).mockResolvedValue({
      data: mockProfile,
      error: null,
    });
    (signOut as jest.Mock).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useUserSession());

    let success;
    await act(async () => {
      success = await result.current.handleLogout();
    });

    expect(signOut).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Você saiu da conta.");
    expect(success).toBe(true);
  });

  it("handleLogout deve exibir erro se signOut falhar", async () => {
    (getProfile as jest.Mock).mockResolvedValue({
      data: mockProfile,
      error: null,
    });
    (signOut as jest.Mock).mockResolvedValue({ error: "Erro ao sair" });

    const { result } = renderHook(() => useUserSession());

    let success;
    await act(async () => {
      success = await result.current.handleLogout();
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao sair");
    expect(success).toBe(false);
  });

  it("deve chamar unsubscribe quando o hook for desmontado", () => {
    (getProfile as jest.Mock).mockResolvedValue({
      data: mockProfile,
      error: null,
    });

    const { unmount } = renderHook(() => useUserSession());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
