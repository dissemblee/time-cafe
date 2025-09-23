import { $api } from "@/shared/api"
import { CreateFoodItemDto, FoodItemDto, UpdateFoodItemDto } from "./foodItem.dto"

const endPoint = "food-items"

/**
 * Create a new food item.
 * @param {CreateFoodItemDto} data - The data to create the food item with
 * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the created food item
 */
export const createFoodItem = (data: CreateFoodItemDto) => {
  return $api<FoodItemDto, CreateFoodItemDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Get all food items.
 * @returns {Promise<AxiosResponse<FoodItemDto[]>>} - A promise that resolves to an AxiosResponse with all food items.
 */
export const getAllFoodItems = () => {
  return $api<FoodItemDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Get a food item by its id.
 * @param {number} id - The id of the food item to get.
 * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the food item.
 */
export const getFoodItems = (id: number) => {
  return $api<FoodItemDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Update a food item by its id.
 * @param {number} id - The id of the food item to update.
 * @param {UpdateFoodItemDto} data - The data to update the food item with.
 * @returns {Promise<AxiosResponse<FoodItemDto>>} - A promise that resolves to an AxiosResponse with the updated food item.
 */
export const updateFoodItems = (id: number, data: UpdateFoodItemDto) => {
  return $api<FoodItemDto, UpdateFoodItemDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Delete a food item by its id.
 * @param {number} id - The id of the food item to delete.
 * @returns {Promise<void>} - A promise that resolves when the food item is deleted.
 */
export const deleteFoodItems = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}
