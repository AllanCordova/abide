import {
  getDevotionalDays,
  getDevotionalDayById,
} from "@/actions/DevotionalDays";
import Model from "@/core/model/Model";

const mockGetAll = jest.fn();
const mockGetOne = jest.fn();

jest.mock("/core/model/Model", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getAll: mockGetAll,
      getOne: mockGetOne,
    };
  });
});

jest.mock("/lib/errors/errors", () => ({
  getErrorMessage: jest.fn().mockReturnValue("Erro tratado"),
}));

describe("getDevotionalDays Action", () => {
  const mockData = [
    {
      id: 1,
      content_body: "text",
      title: "meu primeiro devocional",
      day_number: 2,
    },
  ];

  it("deve retornar todos os dias de determinado devocional", async () => {
    mockGetAll.mockResolvedValue({ data: mockData, error: null });

    const response = await getDevotionalDays(1);

    expect(Model).toHaveBeenCalledWith("devotional_days");
    expect(mockGetAll).toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: mockData });
  });

  it("deve retornar sucesso caso não tenha dados", async () => {
    mockGetAll.mockResolvedValue({
      data: [],
      success: true,
    });

    const response = await getDevotionalDays(1);

    expect(response).toEqual({ success: true, data: [] });
  });

  it("deve retornar erro se o Model falhar", async () => {
    mockGetAll.mockResolvedValue({
      data: [],
      error: { message: "Erro de conexão" },
    });

    const response = await getDevotionalDays(1);

    expect(response).toEqual({ success: false, error: "Erro tratado" });
  });
});

describe("getDevotionalDayById Action", () => {
  const mockSingleData = {
    id: 1,
    content_body: "text",
    title: "meu primeiro devocional",
    day_number: 2,
  };
  it("deve retornar um dia especifo pelo seu id", async () => {
    mockGetOne.mockResolvedValue({ data: mockSingleData, error: null });

    const response = await getDevotionalDayById(1);

    expect(Model).toHaveBeenCalledWith("devotional_days");
    expect(mockGetOne).toHaveBeenCalled();
    expect(response).toEqual({ success: true, data: mockSingleData });
  });

  it("deve retornar null caso não tenha dados", async () => {
    mockGetOne.mockResolvedValue({
      data: null,
      success: true,
    });

    const response = await getDevotionalDayById(1);

    expect(response).toEqual({
      success: true,
      data: null,
    });
  });

  it("deve retornar erro se o Model falhar", async () => {
    mockGetOne.mockResolvedValue({
      data: null,
      error: { message: "Erro de conexão" },
    });

    const response = await getDevotionalDayById(1);

    expect(response).toEqual({ success: false, error: "Erro tratado" });
  });
});
