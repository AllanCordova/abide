import Model from "@/core/model/Model";
import { createClient } from "@/database/supabase/Server";
import { TableName, TableInsert } from "@/types/Tables";

interface MockQueryBuilder {
  select: jest.Mock;
  insert: jest.Mock;
  delete: jest.Mock;
  order: jest.Mock;
  match: jest.Mock;
  ilike: jest.Mock;
  in: jest.Mock;
  single: jest.Mock;
  maybeSingle: jest.Mock;
  then: jest.Mock;
}

interface MockSupabase {
  from: jest.Mock<MockQueryBuilder>;
}

jest.mock("/database/supabase/Server", () => ({
  createClient: jest.fn(),
}));

describe("Model Class", () => {
  let mockSupabase: MockSupabase;
  let mockQueryBuilder: MockQueryBuilder;

  const tableName: TableName = "users" as TableName;
  const mockData = [{ id: 1, name: "Teste" }];
  const mockError = { message: "Erro simulado" };

  beforeEach(() => {
    mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
      single: jest.fn(),
      maybeSingle: jest.fn(),

      then: jest.fn((resolve) => resolve({ data: mockData, error: null })),
    };

    mockSupabase = {
      from: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  describe("getAll", () => {
    it("deve buscar todos os registros ordenados por created_at", async () => {
      const model = new Model(tableName);

      mockQueryBuilder.then.mockImplementation(
        (resolve: (value: { data: unknown; error: null }) => void) =>
          resolve({ data: mockData, error: null })
      );

      const response = await model.getAll();

      expect(createClient).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith(tableName);
      expect(mockQueryBuilder.select).toHaveBeenCalled();
      expect(mockQueryBuilder.order).toHaveBeenCalledWith("created_at", {
        ascending: true,
      });
      expect(response).toEqual({ data: mockData, error: null });
    });

    it("deve aplicar filtro 'match' se fornecido", async () => {
      const model = new Model(tableName);
      const filter = { id: 1 };

      await model.getAll(filter);

      expect(mockQueryBuilder.match).toHaveBeenCalledWith(filter);
    });
  });

  describe("getOne", () => {
    it("deve buscar um único registro usando maybeSingle", async () => {
      const model = new Model(tableName);
      const singleData = { id: 1, name: "Teste" };

      mockQueryBuilder.maybeSingle.mockResolvedValue({
        data: singleData,
        error: null,
      });

      const response = await model.getOne();

      expect(mockQueryBuilder.select).toHaveBeenCalled();
      expect(mockQueryBuilder.maybeSingle).toHaveBeenCalled();
      expect(response.data).toEqual(singleData);
    });

    it("deve aplicar filtro no getOne", async () => {
      const model = new Model(tableName);
      const filter = { id: 1 };

      mockQueryBuilder.maybeSingle.mockResolvedValue({
        data: null,
        error: null,
      });

      await model.getOne(filter);

      expect(mockQueryBuilder.match).toHaveBeenCalledWith(filter);
    });
  });

  describe("getByIds", () => {
    it("deve retornar array vazio se a lista de IDs for vazia", async () => {
      const model = new Model(tableName);
      const response = await model.getByIds([]);

      expect(createClient).toHaveBeenCalled();
      expect(mockSupabase.from).not.toHaveBeenCalled();
      expect(response.data).toEqual([]);
    });

    it("deve buscar pelos IDs usando .in()", async () => {
      const model = new Model(tableName);
      const ids = [1, 2, 3];

      mockQueryBuilder.then.mockImplementation(
        (resolve: (value: { data: unknown; error: null }) => void) =>
          resolve({ data: mockData, error: null })
      );

      await model.getByIds(ids);

      expect(mockQueryBuilder.in).toHaveBeenCalledWith("id", ids);
      expect(mockQueryBuilder.order).toHaveBeenCalledWith("created_at", {
        ascending: true,
      });
    });
  });

  describe("search", () => {
    it("deve usar ilike para buscar termos", async () => {
      const model = new Model(tableName);
      const term = "test";

      mockQueryBuilder.then.mockImplementation(
        (resolve: (value: { data: unknown; error: null }) => void) =>
          resolve({ data: mockData, error: null })
      );

      await model.search("name", term);

      expect(mockQueryBuilder.select).toHaveBeenCalledWith("*");
      expect(mockQueryBuilder.ilike).toHaveBeenCalledWith("name", `%${term}%`);
      expect(mockQueryBuilder.order).toHaveBeenCalledWith("created_at", {
        ascending: false,
      });
    });
  });

  describe("create", () => {
    it("deve inserir dados e retornar o registro criado", async () => {
      const model = new Model(tableName);
      const newData = { name: "Novo" };
      const createdRecord = { id: 1, ...newData };

      mockQueryBuilder.single.mockResolvedValue({
        data: createdRecord,
        error: null,
      });

      const response = await model.create(newData as unknown as TableInsert<typeof tableName>);

      expect(mockQueryBuilder.insert).toHaveBeenCalledWith(newData);
      expect(mockQueryBuilder.select).toHaveBeenCalled();
      expect(mockQueryBuilder.single).toHaveBeenCalled();
      expect(response.data).toEqual(createdRecord);
    });

    it("deve retornar erro se a inserção falhar", async () => {
      const model = new Model(tableName);
      mockQueryBuilder.single.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const response = await model.create({} as unknown as TableInsert<typeof tableName>);

      expect(response.error).toEqual(mockError);
    });
  });

  describe("destroy", () => {
    it("deve deletar, aplicar match e retornar o dado deletado", async () => {
      const model = new Model(tableName);
      const filter = { id: 99 };
      const deletedRecord = { id: 99, name: "Deletado" };

      mockQueryBuilder.single.mockResolvedValue({
        data: deletedRecord,
        error: null,
      });

      const response = await model.destroy(filter);

      expect(mockQueryBuilder.delete).toHaveBeenCalled();
      expect(mockQueryBuilder.match).toHaveBeenCalledWith(filter);
      expect(mockQueryBuilder.select).toHaveBeenCalled();
      expect(mockQueryBuilder.single).toHaveBeenCalled();
      expect(response.data).toEqual(deletedRecord);
    });
  });
});
