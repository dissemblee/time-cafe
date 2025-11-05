import { createApi } from "@reduxjs/toolkit/query/react"
import type { BoardGameDto, CreateBoardGameDto, UpdateBoardGameDto } from "./boardGame.dto"
import { customBaseQuery } from "@/shared/api"

const endPoint = "board-games"

export const boardGamesApi = createApi({
  reducerPath: "boardGamesApi",
  baseQuery: customBaseQuery,
  tagTypes: ["BoardGames"],
  endpoints: (builder) => ({
    getAllBoardGames: builder.query<BoardGameDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "BoardGames" as const, id })),
              { type: "BoardGames", id: "LIST" },
            ]
          : [{ type: "BoardGames", id: "LIST" }],
    }),

    getBoardGame: builder.query<BoardGameDto, number>({
      query: (id) => `${endPoint}/${id}`,
      providesTags: (result, error, id) => [{ type: "BoardGames", id }],
    }),

    createBoardGame: builder.mutation<BoardGameDto, CreateBoardGameDto>({
      query: (data) => ({
        url: endPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BoardGames", id: "LIST" }],
    }),

    updateBoardGame: builder.mutation<BoardGameDto, { id: number; data: UpdateBoardGameDto }>({
      query: ({ id, data }) => ({
        url: `${endPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "BoardGames", id }],
    }),

    deleteBoardGame: builder.mutation<void, number>({
      query: (id) => ({
        url: `${endPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BoardGames", id },
        { type: "BoardGames", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetAllBoardGamesQuery,
  useGetBoardGameQuery,
  useCreateBoardGameMutation,
  useUpdateBoardGameMutation,
  useDeleteBoardGameMutation,
} = boardGamesApi
