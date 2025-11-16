import { MetaResponse } from "@/shared/api"

export interface BoardGameDto {
  id: number
  name: string
  description: string
  quantity: number
  created_at?: string
  updated_at?: string
}

export interface CreateBoardGameDto {
  name: string
  description: string
  quantity: number
}

export interface UpdateBoardGameDto {
  name?: string
  description?: string
  quantity?: number
}

export interface BoardGameResponse {
  success: boolean;
  meta: MetaResponse;
  data: BoardGameDto[];
}
