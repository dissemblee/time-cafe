export enum FoodType {
  DRINK = 'drink',
  SNACK = 'snack',
  DESSERT = 'dessert',
  NO = 'no',
}

export interface FoodItemDto {
  id: number
  name: string
  description?: string
  price: number
  type: FoodType
  created_at?: string
  updated_at?: string
}

export interface CreateFoodItemDto {
  name: string
  description?: string
  price: number
  type: FoodType
}

export interface UpdateFoodItemDto {
  name?: string
  description?: string
  price?: number
  type?: FoodType
}

export interface FoodItemsResponse {
  success: boolean;
  data: FoodItemDto[];
}
