import { MetaResponse } from "@/shared/api"
import { TableStatus } from "./table.enum"

export interface TableDto {
  id: number
  room_id: number
  name: string
  seats: number
  sofas: number
  has_console: boolean
  has_tv: boolean
  status: TableStatus
  created_at?: string
  updated_at?: string
}

export interface CreateTableDto {
  room_id: number
  name: string
  seats: number
  sofas: number
  has_console?: boolean
  has_tv?: boolean
  status?: TableStatus
}

export interface UpdateTableDto {
  room_id?: number
  name?: string
  seats?: number
  sofas?: number
  has_console?: boolean
  has_tv?: boolean
  status?: TableStatus
}

export interface TableResponse {
  success: boolean;
  meta: MetaResponse
  data: TableDto[];
}
