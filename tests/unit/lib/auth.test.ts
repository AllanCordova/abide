import { getProfile, getUser } from "@/lib/auth";
import supabase from "@/database/supabase/Client";

jest.mock("/database/supabase/Client", () => ({
  auth: {
    getUser: jest.fn(),
  },
  from: jest.fn(),
}));

describe("User Service", () => {
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockSingle = jest.fn();

  const setupDbChain = () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect.mockReturnValue({
        eq: mockEq.mockReturnValue({
          single: mockSingle,
        }),
      }),
    });
  };

  beforeEach(() => {
    setupDbChain();
  });

  describe("getUser", () => {
    it("deve retornar o user quando o auth.getUser funcionar", async () => {
      const fakeUser = { id: "123", email: "teste@teste.com" };

      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: fakeUser },
      });

      const result = await getUser();

      expect(result).toEqual({ success: true, data: fakeUser });
    });
  });

  describe("getProfile", () => {
    it("deve retornar null se não houver usuário logado", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
      });

      const result = await getProfile();

      expect(result).toEqual({ success: true, data: null });
      expect(supabase.from).not.toHaveBeenCalled();
    });

    it("deve buscar o perfil se o usuário estiver logado", async () => {
      const fakeUser = { id: "user-123" };
      const fakeProfile = { id: "user-123", name: "Dev" };

      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: fakeUser },
      });

      mockSingle.mockResolvedValue({ data: fakeProfile, error: null });

      const result = await getProfile();

      expect(supabase.from).toHaveBeenCalledWith("profiles");
      expect(mockEq).toHaveBeenCalledWith("id", fakeUser.id);
      expect(result).toEqual({ success: true, data: fakeProfile });
    });

    it("deve retornar success: false se o banco der erro", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: { id: "1" } },
      });

      mockSingle.mockResolvedValue({ data: null, error: { message: "Erro" } });

      const result = await getProfile();

      expect(result).toEqual({ success: false });
    });
  });
});
