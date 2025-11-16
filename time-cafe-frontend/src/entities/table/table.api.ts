import { createApi } from "@reduxjs/toolkit/query/react";
import type { TableDto, CreateTableDto, UpdateTableDto, TableResponse } from "./table.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "tables";

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Tables"],
  endpoints: (builder) => ({
    getAllTables: builder.query<TableResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Tables" as const, id })),
              { type: "Tables", id: "LIST" },
            ]
          : [{ type: "Tables", id: "LIST" }],
    }),

    getTable: builder.query<TableDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Tables", id }],
    }),

    createTable: builder.mutation<TableDto, CreateTableDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Tables", id: "LIST" }],
    }),

    updateTable: builder.mutation<TableDto, { id: number; data: UpdateTableDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Tables", id }],
    }),

    deleteTable: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Tables", id },
        { type: "Tables", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTablesQuery,
  useGetTableQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} = tablesApi;
