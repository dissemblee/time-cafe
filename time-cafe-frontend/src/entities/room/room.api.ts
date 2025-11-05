import { createApi } from "@reduxjs/toolkit/query/react";
import type { RoomDto, CreateRoomDto, UpdateRoomDto } from "./room.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "rooms";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    getAllRooms: builder.query<RoomDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Rooms" as const, id })),
              { type: "Rooms", id: "LIST" },
            ]
          : [{ type: "Rooms", id: "LIST" }],
    }),

    getRoom: builder.query<RoomDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Rooms", id }],
    }),

    createRoom: builder.mutation<RoomDto, CreateRoomDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Rooms", id: "LIST" }],
    }),

    updateRoom: builder.mutation<RoomDto, { id: number; data: UpdateRoomDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Rooms", id }],
    }),

    deleteRoom: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Rooms", id },
        { type: "Rooms", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
