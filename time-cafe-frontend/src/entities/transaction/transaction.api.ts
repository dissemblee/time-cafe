import { createApi } from "@reduxjs/toolkit/query/react";
import type { TransactionDto, CreateTransactionDto, UpdateTransactionDto, TransactionResponse } from "./transaction.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "transactions";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TransactionResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Transactions" as const, id })),
              { type: "Transactions", id: "LIST" },
            ]
          : [{ type: "Transactions", id: "LIST" }],
    }),

    createPaymentSession: builder.mutation<{ success: boolean; payment_url: string; transaction_id: number },{ booking_id: number; client_id: number }>({
      query: (data) => ({
        url: "payments/create-session",
        method: "POST",
        body: data,
      }),
    }),

    confirmPayment: builder.mutation<{ success: boolean }, { id: number }>({
      query: ({ id }) => ({
        url: `fake-gateway/confirm/${id}`,
        method: "POST",
      }),
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
  useCreatePaymentSessionMutation,
  useConfirmPaymentMutation
} = transactionsApi;
