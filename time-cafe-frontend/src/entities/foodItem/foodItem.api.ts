// import { $api } from "@/shared/api"
// import { CreateFoodItemDto, FoodItemDto, UpdateFoodItemDto } from "./foodItem.dto"

// const endPoint = "food-items"

// /**
//  * Create a new food item.
//  * @param {CreateFoodItemDto} data - The data to create the food item with
//  * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the created food item
//  */
// export const createFoodItem = (data: CreateFoodItemDto) => {
//   return $api<FoodItemDto, CreateFoodItemDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Get all food items.
//  * @returns {Promise<AxiosResponse<FoodItemDto[]>>} - A promise that resolves to an AxiosResponse with all food items.
//  */
// export const getAllFoodItems = () => {
//   return $api<FoodItemDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Get a food item by its id.
//  * @param {number} id - The id of the food item to get.
//  * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the food item.
//  */
// export const getFoodItems = (id: number) => {
//   return $api<FoodItemDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }

// /**
//  * Update a food item by its id.
//  * @param {number} id - The id of the food item to update.
//  * @param {UpdateFoodItemDto} data - The data to update the food item with.
//  * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the updated food item.
//  */
// export const updateFoodItems = (id: number, data: UpdateFoodItemDto) => {
//   return $api<FoodItemDto, UpdateFoodItemDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Delete a food item by its id.
//  * @param {number} id - The id of the food item to delete.
//  * @returns {Promise<void>} - A promise that resolves when the food item is deleted.
//  */
// export const deleteFoodItems = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

import { createApi } from "@reduxjs/toolkit/query/react";
import type { FoodItemDto, CreateFoodItemDto, UpdateFoodItemDto } from "./foodItem.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "food-items";

export const foodItemApi = createApi({
  reducerPath: "foodItemApi",
  baseQuery: customBaseQuery,
  tagTypes: ["FoodItems"],
  endpoints: (builder) => ({
    getAllFoodItems: builder.query<FoodItemDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "FoodItems" as const, id })),
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
