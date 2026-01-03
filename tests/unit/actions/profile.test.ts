import { createProfile } from "@/actions/Profile";
import Model from "@/core/model/Model";
import { Profile } from "@/types/Tables";

const mockCreate = jest.fn();

jest.mock("/core/model/Model", () => {
  return jest.fn().mockImplementation(() => {
    return {
      create: mockCreate,
    };
  });
});

jest.mock("/lib/errors/errors", () => ({
  getErrorMessage: jest.fn().mockReturnValue("Erro tratado"),
}));

describe("createProfile Server Action", () => {
  const mockProfileData: Profile = {
    id: "123",
    name: "User Teste",
    avatar_url: null,
    role: "admin",
  };

  it("deve instanciar a Model corretamente e forçar role='member'", async () => {
    mockCreate.mockResolvedValue({ data: mockProfileData, error: null });

    const response = await createProfile(mockProfileData);

    expect(mockCreate).toHaveBeenCalledWith({
      ...mockProfileData,
      role: "member",
    });

    expect(Model).toHaveBeenCalledWith("profiles");

    expect(response).toEqual({ success: true, data: mockProfileData });
  });

  it("deve tratar erros retornados pela Model", async () => {
    mockCreate.mockResolvedValue({
      data: null,
      error: { code: "23505", message: "Duplicate key" },
    });

    const response = await createProfile(mockProfileData);

    expect(response).toEqual({
      success: false,
      error: "Erro tratado",
    });
  });
});
