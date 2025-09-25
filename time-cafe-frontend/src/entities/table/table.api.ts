// import { $api } from "@/shared/api"
// import { CreateTableDto, TableDto, UpdateTableDto } from "./table.dto"

// const endPoint = "tables"

// /**
//  * Creates a new table.
//  * 
//  * @param {CreateTableDto} data - The data to create the table with.
//  * @returns {Promise<AxiosResponse<TableDto>>} - A promise that resolves to an AxiosResponse with the created table.
//  */
// export const createTable = (data: CreateTableDto) => {
//   return $api<TableDto, CreateTableDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Retrieves all tables.
//  * 
//  * @returns {Promise<AxiosResponse<TableDto[]>>} - A promise that resolves to an AxiosResponse with all tables.
//  */
// export const getAllTables = () => {
//   return $api<TableDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Retrieves a table by its id.
//  * 
//  * @param {number} id - The id of the table to retrieve.
//  * @returns {Promise<AxiosResponse<TableDto>>} - A promise that resolves to an AxiosResponse with the retrieved table.
//  */
// export const getTable = (id: number) => {
//   return $api<TableDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }

// export const updateTable = (id: number, data: UpdateTableDto) => {
//   return $api<TableDto, UpdateTableDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Deletes a table by its id.
//  * @param {number} id - The id of the table to delete.
//  * @returns {Promise<AxiosResponse<void>>} - A promise that resolves when the table has been deleted.
//  */
// export const deleteTable = (id: number) => {
//   return $api({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

import { createApi } from "@reduxjs/toolkit/query/react";
import type { TableDto, CreateTableDto, UpdateTableDto } from "./table.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "tables";

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Tables"],
  endpoints: (builder) => ({
    getAllTables: builder.query<TableDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tables" as const, id })),
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
