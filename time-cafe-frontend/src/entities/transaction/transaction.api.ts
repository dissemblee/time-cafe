// import { $api } from "@/shared/api"
// import { CreateTransactionDto, TransactionDto, UpdateTransactionDto } from "./transaction.dto"

// const endPoint = "transactions"

// /**
//  * Creates a new transaction.
//  * @param {CreateTransactionDto} data - The data to create the transaction with
//  * @returns {Promise<AxiosResponse<TransactionDto>>} - A promise that resolves to an AxiosResponse with the created transaction
//  */
// export const createTransaction = (data: CreateTransactionDto) => {
//   return $api<TransactionDto, CreateTransactionDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Retrieves all transactions.
//  * @returns {Promise<AxiosResponse<TransactionDto[]>>} - A promise that resolves to an AxiosResponse with all transactions.
//  */
// export const getAllTransactions = () => {
//   return $api<TransactionDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Retrieves a transaction by its id.
//  * @param {number} id - The id of the transaction to retrieve.
//  * @returns {Promise<AxiosResponse<TransactionDto>>} - A promise that resolves to an AxiosResponse with the transaction.
//  */
// export const getTransaction = (id: number) => {
//   return $api<TransactionDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }

// /**
//  * Updates a transaction by its id.
//  * @param {number} id - The id of the transaction to update.
//  * @param {UpdateTransactionDto} data - The data to update the transaction with.
//  * @returns {Promise<AxiosResponse<TransactionDto>>} - A promise that resolves to an AxiosResponse with the updated transaction.
//  */
// export const updateTransaction = (id: number, data: UpdateTransactionDto) => {
//   return $api<TransactionDto, UpdateTransactionDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Deletes a transaction by its id.
//  * @param {number} id - The id of the transaction to delete.
//  * @returns {Promise<AxiosResponse<void>>} - A promise that resolves when the transaction has been deleted.
//  */
// export const deleteTransaction = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

import { createApi } from "@reduxjs/toolkit/query/react";
import type { TransactionDto, CreateTransactionDto, UpdateTransactionDto } from "./transaction.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "transactions";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TransactionDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Transactions" as const, id })),
              { type: "Transactions", id: "LIST" },
            ]
          : [{ type: "Transactions", id: "LIST" }],
    }),

    getTransaction: builder.query<TransactionDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Transactions", id }],
    }),

    createTransaction: builder.mutation<TransactionDto, CreateTransactionDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),

    updateTransaction: builder.mutation<TransactionDto, { id: number; data: UpdateTransactionDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Transactions", id }],
    }),

    deleteTransaction: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Transactions", id },
        { type: "Transactions", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
