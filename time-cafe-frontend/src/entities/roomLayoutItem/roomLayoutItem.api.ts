import { createApi } from "@reduxjs/toolkit/query/react";
import type { RoomLayoutItemDto, CreateRoomLayoutItemDto, UpdateRoomLayoutItemDto } from "./roomLayoutItem.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "room-layout-items";

export const roomLayoutItemsApi = createApi({
  reducerPath: "roomLayoutItemsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["RoomLayoutItems"],
  endpoints: (builder) => ({
    getAllRoomLayoutItems: builder.query<{ data: RoomLayoutItemDto[] }, void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "RoomLayoutItems" as const, id })),
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
