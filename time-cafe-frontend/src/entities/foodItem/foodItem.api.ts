import { createApi } from "@reduxjs/toolkit/query/react";
import type { FoodItemDto, CreateFoodItemDto, UpdateFoodItemDto, FoodItemsResponse } from "./foodItem.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "food-items";

export const foodItemApi = createApi({
  reducerPath: "foodItemApi",
  baseQuery: customBaseQuery,
  tagTypes: ["FoodItems"],
  endpoints: (builder) => ({
    getAllFoodItems: builder.query<FoodItemsResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "FoodItems" as const, id })),
              { type: "FoodItems", id: "LIST" },
            ]
          : [{ type: "FoodItems", id: "LIST" }],
    }),

    getFoodItem: builder.query<FoodItemDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "FoodItems", id }],
    }),

    createFoodItem: builder.mutation<FoodItemDto, CreateFoodItemDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "FoodItems", id: "LIST" }],
    }),

    updateFoodItem: builder.mutation<FoodItemDto, { id: number; data: UpdateFoodItemDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "FoodItems", id }],
    }),

    deleteFoodItem: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "FoodItems", id },
        { type: "FoodItems", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFoodItemsQuery,
  useGetFoodItemQuery,
  useCreateFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
} = foodItemApi;
