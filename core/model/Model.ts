import "server-only";

import { createClient } from "@/database/supabase/Server";
import { DbResponse } from "@/types/DbResponse";
import { TableFilter, TableInsert, TableName, TableRow } from "@/types/Tables";

export default class Model<T extends TableName> {
  private _table;

  public constructor(tableName: T) {
    this._table = tableName;
  }

  private async getClient() {
    return await createClient();
  }

  public async getAll(
    filter?: Partial<TableFilter<T>>
  ): Promise<DbResponse<TableRow<T>[]>> {
    const supabase = await this.getClient();
    let query = supabase
      .from(this._table)
      .select()
      .order("created_at", { ascending: true });

    if (filter) {
      query = query.match(filter);
    }

    const { data, error } = await query;

    return {
      data: data as TableRow<T>[],
      error,
    };
  }

  public async getOne(
    filter?: Partial<TableFilter<T>>
  ): Promise<DbResponse<TableRow<T>>> {
    const supabase = await this.getClient();
    let query = supabase.from(this._table).select();

    if (filter) {
      query = query.match(filter);
    }

    const { data, error } = await query.maybeSingle();

    return {
      data: data as TableRow<T>,
      error,
    };
  }

  public async getByIds(
    ids: (string | number)[],
    idColumn: string = "id"
  ): Promise<DbResponse<TableRow<T>[]>> {
    const supabase = await this.getClient();

    if (!ids || ids.length === 0) {
      return {
        data: [] as TableRow<T>[],
        error: null,
      };
    }

    const { data, error } = await supabase
      .from(this._table)
      .select()
      .in(idColumn, ids)
      .order("created_at", { ascending: true });

    return {
      data: data as TableRow<T>[],
      error,
    };
  }

  public async search(
    column: string,
    searchTerm: string
  ): Promise<DbResponse<TableRow<T>[]>> {
    const supabase = await this.getClient();

    const { data, error } = await supabase
      .from(this._table)
      .select("*")
      .ilike(column, `%${searchTerm}%`)
      .order("created_at", { ascending: false });

    return {
      data: data as TableRow<T>[],
      error,
    };
  }

  public async create(data: TableInsert<T>): Promise<DbResponse<TableRow<T>>> {
    const supabase = await this.getClient();
    const { data: createdData, error } = await supabase
      .from(this._table)
      .insert(data)
      .select()
      .single();

    return {
      data: createdData as TableRow<T>,
      error,
    };
  }

  public async destroy(
    filter: Partial<TableFilter<T>>
  ): Promise<DbResponse<TableRow<T>>> {
    const supabase = await this.getClient();

    let query = supabase.from(this._table).delete();

    if (filter) {
      query = query.match(filter);
    }

    const { data, error } = await query.select().single();

    return {
      data: data as TableRow<T>,
      error,
    };
  }
}
