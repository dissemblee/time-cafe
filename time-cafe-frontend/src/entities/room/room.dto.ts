import { MetaResponse } from "@/shared/api"

export interface RoomDto {
  id: number
  name: string
  type: string
  smoking_allowed: boolean
  description: string
  features: string[]
  min_price: number
  created_at?: string
  updated_at?: string
}

export interface CreateRoomDto {
  name: string
  type: string
  smoking_allowed: boolean
  description: string
  features: string[]
  min_price: number
}

export interface UpdateRoomDto {
  name?: string
  type?: string
  smoking_allowed?: boolean
  description: string
  features: string[]
  min_price: number
}

export interface RoomsResponse {
  success: boolean;
  meta: MetaResponse
  data: RoomDto[];
}
