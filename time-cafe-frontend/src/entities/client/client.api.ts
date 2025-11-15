import { createApi } from "@reduxjs/toolkit/query/react";
import type { ClientDto, CreateClientDto, UpdateClientDto } from "./client.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "clients";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getAllClients: builder.query<ClientDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Clients" as const, id })),
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }],
    }),

    getClient: builder.query<ClientDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Clients", id }],
    }),

    createClient: builder.mutation<ClientDto, CreateClientDto>({
      query: (data) => ({
        url: endPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),

    updateClient: builder.mutation<ClientDto, { id: number; data: UpdateClientDto }>({
      query: ({ id, data }) => ({
        url: `${endPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Clients", id }],
    }),

    deleteClient: builder.mutation<void, number>({
      query: (id) => ({
        url: `${endPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Clients", id },
        { type: "Clients", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
