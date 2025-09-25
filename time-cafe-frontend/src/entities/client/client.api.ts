// import { $api } from "@/shared/api"
// import { ClientDto, CreateClientDto, UpdateClientDto } from "./client.dto"

// const endPoint = "clients"

// /**
//  * Create a new client.
//  * @param {CreateClientDto} data - The client data to be created.
//  * @returns {Promise<ClientDto>} - A promise of the created client.
//  */
// export const createClient = (data: CreateClientDto) => {
//   return $api<ClientDto, CreateClientDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Get all clients.
//  * @returns {Promise<ClientDto[]>} - A promise of all clients.
//  */
// export const getAllClients = () => {
//   return $api<ClientDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Get a client by its id.
//  * @param {number} id - The id of the client to get.
//  * @returns {Promise<ClientDto>} - A promise of the client.
//  */
// export const getClient = (id: number) => {
//   return $api<ClientDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }

// /**
//  * Update a client by its id.
//  * @param {number} id - The id of the client to update.
//  * @param {UpdateClientDto} data - The client data to update with.
//  * @returns {Promise<ClientDto>} - A promise of the updated client.
//  */
// export const updateClient = (id: number, data: UpdateClientDto) => {
//   return $api<ClientDto, UpdateClientDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Delete a client by its id.
//  * @param {number} id - The id of the client to delete.
//  * @returns {Promise<void>} - A promise that resolves when the client has been deleted.
//  */
// export const deleteClient = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

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
      query: (id) => `${endPoint}/${id}`,
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
