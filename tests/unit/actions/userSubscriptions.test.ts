import {
  subscribeToDevotional,
  unsubscribeToDevotional,
  getSubscribedDevotionals,
  getSubscriptionByDevotional,
} from "@/actions/UserSubscriptions";
import { getUser } from "@/core/auth/AuthServer";
import Model from "@/core/model/Model";

const mockCreate = jest.fn();
const mockDestroy = jest.fn();
const mockGetAll = jest.fn();
const mockGetByIds = jest.fn();
const mockGetOne = jest.fn();

jest.mock("/core/model/Model", () => {
  return jest.fn().mockImplementation(() => {
    return {
      create: mockCreate,
      destroy: mockDestroy,
      getAll: mockGetAll,
      getByIds: mockGetByIds,
      getOne: mockGetOne,
    };
  });
});

jest.mock("/lib/errors/errors", () => ({
  getErrorMessage: jest.fn().mockReturnValue("Erro tratado"),
}));

jest.mock("/core/auth/AuthServer", () => ({
  getUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

describe("Subscription Actions", () => {
  const fakeUserId = "user-123";

  beforeEach(() => {
    (getUser as jest.Mock).mockResolvedValue({ data: { id: fakeUserId } });
  });

  describe("subscribeToDevotional", () => {
    const validData = { devotional_id: 1 };

    it("deve criar inscrição associando ao ID do usuário logado", async () => {
      mockCreate.mockResolvedValue({
        data: { id: 10, ...validData, user_id: fakeUserId },
        error: null,
      });

      const response = await subscribeToDevotional(validData);

      expect(mockCreate).toHaveBeenCalledWith({
        ...validData,
        user_id: fakeUserId,
      });

      expect(response.success).toBe(true);
    });

    it("deve retornar erro se o Model falhar", async () => {
      mockCreate.mockResolvedValue({
        data: null,
        error: { message: "Erro banco" },
      });

      const response = await subscribeToDevotional(validData);

      expect(response.success).toBe(false);
      expect(response.error).toBe("Erro tratado");
    });
  });

  describe("unsubscribeToDevotional", () => {
    const subId = 55;

    it("deve remover a inscrição usando o ID do usuário para segurança", async () => {
      mockDestroy.mockResolvedValue({
        data: { id: subId },
        error: null,
      });

      const response = await unsubscribeToDevotional(subId);

      expect(mockDestroy).toHaveBeenCalledWith({
        id: subId,
        user_id: fakeUserId,
      });

      expect(response.success).toBe(true);
    });

    it("deve retornar erro tratado na falha", async () => {
      mockDestroy.mockResolvedValue({
        data: null,
        error: { message: "Erro banco" },
      });

      const response = await unsubscribeToDevotional(subId);

      expect(response.success).toBe(false);
    });
  });

  describe("getSubscribedDevotionals", () => {
    it("deve buscar inscrições e depois buscar os detalhes dos devocionais", async () => {
      mockGetAll.mockResolvedValue({
        data: [{ devotional_id: 100 }, { devotional_id: 200 }],
        error: null,
      });

      const mockDevotionals = [
        { id: 100, title: "Dev A" },
        { id: 200, title: "Dev B" },
      ];
      mockGetByIds.mockResolvedValue({
        data: mockDevotionals,
        error: null,
      });

      const response = await getSubscribedDevotionals();

      expect(Model).toHaveBeenCalledWith("user_subscriptions");
      expect(mockGetAll).toHaveBeenCalledWith({ user_id: fakeUserId });

      expect(Model).toHaveBeenCalledWith("devotionals");
      expect(mockGetByIds).toHaveBeenCalledWith([100, 200], "id");

      expect(response).toEqual({ success: true, data: mockDevotionals });
    });

    it("deve retornar lista vazia se não tiver inscrições", async () => {
      mockGetAll.mockResolvedValue({ data: [], error: null });

      const response = await getSubscribedDevotionals();

      expect(mockGetByIds).not.toHaveBeenCalled();
      expect(response).toEqual({ success: true, data: [] });
    });

    it("deve retornar array vazio se user não estiver logado", async () => {
      (getUser as jest.Mock).mockResolvedValue({ data: null });

      const response = await getSubscribedDevotionals();

      expect(response).toEqual({ success: true, data: [] });
    });
  });

  describe("getSubscriptionByDevotional", () => {
    it("deve buscar inscrição específica do usuário", async () => {
      const devId = 99;
      const mockSub = { id: 1, devotional_id: devId, user_id: fakeUserId };

      mockGetOne.mockResolvedValue({ data: mockSub, error: null });

      const response = await getSubscriptionByDevotional(devId);

      expect(mockGetOne).toHaveBeenCalledWith({
        devotional_id: devId,
        user_id: fakeUserId,
      });
      expect(response).toEqual({ success: true, data: mockSub });
    });

    it("deve retronar success e nul se não encontrar nada", async () => {
      const devId = 1;
      mockGetOne.mockResolvedValue({ data: null, success: true });

      const response = await getSubscriptionByDevotional(devId);

      expect(mockGetOne).toHaveBeenCalledWith({
        devotional_id: devId,
        user_id: fakeUserId,
      });
      expect(response).toEqual({ success: true, data: null });
    });

    it("deve retronar error em casos de problema com o servidor", async () => {
      const devId = 1;
      mockGetOne.mockResolvedValue({ data: null, error: "erro de conexão" });

      const response = await getSubscriptionByDevotional(devId);

      expect(response).toEqual({ success: false, error: "Erro tratado" });
    });
  });
});
