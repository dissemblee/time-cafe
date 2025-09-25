// import { $api } from "@/shared/api"
// import { CreateRoomLayoutItemDto, RoomLayoutItemDto, UpdateRoomLayoutItemDto } from "./roomLayoutItem.dto"

// const endPoint = "room-layout-items"

// /**
//  * Create a new room layout item
//  * @param {CreateRoomLayoutItemDto} data - The data to create the room layout item with
//  * @returns {Promise<AxiosResponse<RoomLayoutItemDto>>} - A promise that resolves to an AxiosResponse with the created room layout item
//  */
// export const createRoomLayoutItem = (data: CreateRoomLayoutItemDto) => {
//   return $api<RoomLayoutItemDto, CreateRoomLayoutItemDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Get all room layout items
//  * @returns {Promise<AxiosResponse<RoomLayoutItemDto[]>>} - A promise that resolves to an AxiosResponse with all room layout items
//  */
// export const getAllRoomLayoutItem = () => {
//   return $api<RoomLayoutItemDto>({
//     endPoint,
//     method: 'GET'
//   })
// }


// /**
//  * Get a room layout item by id
//  * @param {number} id - The id of the room layout item to get
//  * @returns {Promise<AxiosResponse<RoomLayoutItemDto>>} - A promise that resolves to an AxiosResponse with the room layout item
//  */
// export const getRoomLayoutItem = (id: number) => {
//   return $api<RoomLayoutItemDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }


// /**
//  * Update a room layout item
//  * @param {number} id - The id of the room layout item to update
//  * @param {UpdateRoomLayoutItemDto} data - The data to update the room layout item with
//  * @returns {Promise<AxiosResponse<RoomLayoutItemDto>>} - A promise that resolves to an AxiosResponse with the updated room layout item
//  */
// export const updateRoomLayoutItem = (id: number, data: UpdateRoomLayoutItemDto) => {
//   return $api<RoomLayoutItemDto, UpdateRoomLayoutItemDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Delete a room layout item by id
//  * @param {number} id - The id of the room layout item to delete
//  * @returns {Promise<AxiosResponse<void>>} - A promise that resolves to an AxiosResponse with no data
//  */
// export const deleteRoomLayoutItem = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

import { createApi } from "@reduxjs/toolkit/query/react";
import type { RoomLayoutItemDto, CreateRoomLayoutItemDto, UpdateRoomLayoutItemDto } from "./roomLayoutItem.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "room-layout-items";

export const roomLayoutItemsApi = createApi({
  reducerPath: "roomLayoutItemsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["RoomLayoutItems"],
  endpoints: (builder) => ({
    getAllRoomLayoutItems: builder.query<RoomLayoutItemDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "RoomLayoutItems" as const, id })),
              { type: "RoomLayoutItems", id: "LIST" },
            ]
          : [{ type: "RoomLayoutItems", id: "LIST" }],
    }),

    getRoomLayoutItem: builder.query<RoomLayoutItemDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "RoomLayoutItems", id }],
    }),

    createRoomLayoutItem: builder.mutation<RoomLayoutItemDto, CreateRoomLayoutItemDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "RoomLayoutItems", id: "LIST" }],
    }),

    updateRoomLayoutItem: builder.mutation<RoomLayoutItemDto, { id: number; data: UpdateRoomLayoutItemDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "RoomLayoutItems", id }],
    }),

    deleteRoomLayoutItem: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "RoomLayoutItems", id },
        { type: "RoomLayoutItems", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRoomLayoutItemsQuery,
  useGetRoomLayoutItemQuery,
  useCreateRoomLayoutItemMutation,
  useUpdateRoomLayoutItemMutation,
  useDeleteRoomLayoutItemMutation,
} = roomLayoutItemsApi;
