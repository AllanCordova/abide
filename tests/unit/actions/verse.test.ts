import { getVersesByDay } from "@/actions/Verse";
import Model from "@/core/model/Model";

const mockGetOne = jest.fn();

jest.mock("/core/model/Model", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getOne: mockGetOne,
    };
  });
});

jest.mock("/lib/errors/errors", () => ({
  getErrorMessage: jest.fn().mockReturnValue("Erro tratado"),
}));

describe("getVersesByDay Action", () => {
  const mockData = { id: 1, book_name: "Mateus", text_content: "text" };

  it("deve retornar todos os versos de determinado dia existente", async () => {
    mockGetOne.mockResolvedValue({ data: mockData, error: null });

    const response = await getVersesByDay(1);

    expect(Model).toHaveBeenCalledWith("verses");
    expect(mockGetOne).toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: mockData });
  });

  it("deve retornar sucesso caso não tenha dados", async () => {
    mockGetOne.mockResolvedValue({
      data: null,
      success: true,
    });

    const response = await getVersesByDay(2);

    expect(response).toEqual({ success: true, data: null });
  });

  it("deve retornar erro se o Model falhar", async () => {
    mockGetOne.mockResolvedValue({
      data: null,
      error: { message: "Erro de conexão" },
    });

    const response = await getVersesByDay(1);

    expect(response).toEqual({ success: false, error: "Erro tratado" });
  });
});
