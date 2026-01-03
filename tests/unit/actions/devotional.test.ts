import {
  createDevotional,
  getDevotionals,
  getDevotionalsBySlug,
} from "@/actions/Devotional";
import { Devotional, TableInsert } from "@/types/Tables";
import Model from "@/core/model/Model";

const mockCreate = jest.fn();
const mockGetAll = jest.fn();
const mockGetOne = jest.fn();
const mockSearch = jest.fn();

jest.mock("/core/model/Model", () => {
  return jest.fn().mockImplementation(() => {
    return {
      create: mockCreate,
      getAll: mockGetAll,
      getOne: mockGetOne,
      search: mockSearch,
    };
  });
});

jest.mock("/lib/errors/errors", () => ({
  getErrorMessage: jest.fn().mockReturnValue("Erro tratado"),
}));

describe("createDevotional Action", () => {
  const userId = "user-123";

  const validData: Devotional = {
    title: "Meu Devocional",
    description: "Conteúdo abençoado",
    is_published: true,
    author_id: "",
    created_at: null,
    id: 1,
    image_url: null,
    slug: "",
  };

  it("deve retornar erro se a validação do Zod falhar", async () => {
    const invalidData = {
      title: "",
    };

    const response = await createDevotional(
      userId,
      invalidData as TableInsert<"devotionals">
    );

    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("deve criar o devocional se os dados forem válidos", async () => {
    mockCreate.mockResolvedValue({
      data: validData,
      error: null,
    });

    const response = await createDevotional(userId, validData);

    expect(mockCreate).toHaveBeenCalledWith({
      ...validData,
      author_id: userId,
    });

    expect(response.success).toBe(true);
  });

  it("deve repassar erro da Model se o banco falhar", async () => {
    mockCreate.mockResolvedValue({
      data: null,
      error: { message: "Erro banco" },
    });

    const response = await createDevotional(userId, validData);

    expect(response.success).toBe(false);
  });
});

describe("getDevotionals Action", () => {
  const mockData = [
    { id: 1, title: "Devocional 1", description: "Texto 1" },
    { id: 2, title: "Devocional 2", description: "Texto 2" },
    { id: 3, title: "Devocional 2", description: "Texto 2", slug: "amor" },
  ];

  it("deve chamar getAll quando NÃO houver query de busca", async () => {
    mockGetAll.mockResolvedValue({ data: mockData, error: null });

    const response = await getDevotionals();

    expect(Model).toHaveBeenCalledWith("devotionals");
    expect(mockGetAll).toHaveBeenCalled();
    expect(mockSearch).not.toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: mockData });
  });

  it("deve chamar search quando houver query de busca", async () => {
    const query = "Jesus";
    const searchResult = [mockData[0]];

    mockSearch.mockResolvedValue({ data: searchResult, error: null });

    const response = await getDevotionals(query);

    expect(mockSearch).toHaveBeenCalledWith("title", query);
    expect(mockGetAll).not.toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: searchResult });
  });

  it("deve retornar sucesso caso não tenha dados", async () => {
    mockGetAll.mockResolvedValue({
      data: [],
      success: true,
    });

    const response = await getDevotionals();

    expect(response).toEqual({ success: true, data: [] });
  });

  it("deve retornar erro se o Model falhar", async () => {
    mockGetAll.mockResolvedValue({
      data: null,
      error: { message: "Erro de conexão" },
    });

    const response = await getDevotionals();

    expect(response).toEqual({ success: false, error: "Erro tratado" });
  });
});

describe("getDevotional by slug action", () => {
  const mockDevotionalData = {
    id: 3,
    title: "Devocional 2",
    description: "Texto 2",
    slug: "amor",
  };

  it("retorna um devocional existente com sucesso", async () => {
    mockGetOne.mockResolvedValue({ data: mockDevotionalData, success: true });

    const response = await getDevotionalsBySlug("amor");

    expect(Model).toHaveBeenCalledWith("devotionals");
    expect(mockGetOne).toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: mockDevotionalData });
  });

  it("se não encontrar nada retorna null", async () => {
    mockGetOne.mockResolvedValue({ data: null, success: true });

    const response = await getDevotionalsBySlug("not-found");

    expect(Model).toHaveBeenCalledWith("devotionals");
    expect(mockGetOne).toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: null });
  });

  it("deve retornar erro se o Model falhar", async () => {
    mockGetOne.mockResolvedValue({
      data: null,
      error: { message: "Erro de conexão" },
    });

    const response = await getDevotionalsBySlug("error");

    expect(response).toEqual({ success: false, error: "Erro tratado" });
  });
});
