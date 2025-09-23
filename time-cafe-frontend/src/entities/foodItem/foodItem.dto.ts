export interface FoodItemDto {
  id: number
  name: string
  description?: string
  price: number
  created_at?: string
  updated_at?: string
}

export interface CreateFoodItemDto {
  name: string
  description?: string
  price: number
}

export interface UpdateFoodItemDto {
  name?: string
  description?: string
  price?: number
}