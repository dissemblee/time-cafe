import { MetaResponse } from "@/shared/api"

export interface RootDto {
  id: number
  user_id: number
  name: string
  phone: string
  created_at?: string
  updated_at?: string
}

export interface CreateRootDto {
  user_id: number
  name: string
  phone: string
}

export interface UpdateRootDto {
  user_id?: number
  name?: string
  phone?: string
}

export interface RootResponse {
  success: boolean;
  meta: MetaResponse
  data: RootDto[];
}
