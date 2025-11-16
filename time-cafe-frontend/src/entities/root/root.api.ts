import { createApi } from "@reduxjs/toolkit/query/react";
import type { RootDto, CreateRootDto, UpdateRootDto, RootResponse } from "./root.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "roots";

export const rootsApi = createApi({
  reducerPath: "rootsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Roots"],
  endpoints: (builder) => ({
    getAllRoots: builder.query<RootResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Roots" as const, id })),
              { type: "Roots", id: "LIST" },
            ]
          : [{ type: "Roots", id: "LIST" }],
    }),

    getRoot: builder.query<RootDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Roots", id }],
    }),

    createRoot: builder.mutation<RootDto, CreateRootDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Roots", id: "LIST" }],
    }),

    updateRoot: builder.mutation<RootDto, { id: number; data: UpdateRootDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Roots", id }],
    }),

    deleteRoot: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Roots", id },
        { type: "Roots", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRootsQuery,
  useGetRootQuery,
  useCreateRootMutation,
  useUpdateRootMutation,
  useDeleteRootMutation,
} = rootsApi;
