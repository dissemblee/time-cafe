import { MetaResponse } from "@/shared/api"
import { BookingStatus } from "./booking.enum"
import { ClientDto } from "../client"
import { TableDto } from "../table"

export interface BookingDto {
  id: number
  client_id: number
  table_id: number
  start_time: string
  end_time: string
  status: BookingStatus
  price: number
  hours: number
  created_at?: string
  updated_at?: string
  client?: ClientDto
  table?: TableDto
}

export interface CreateBookingDto {
  client_id: number
  table_id: number
  start_time: string
  end_time: string
  status?: BookingStatus
  price: number
  hours: number
}

export interface UpdateBookingDto {
  client_id?: number
  table_id?: number
  start_time?: string
  end_time?: string
  status?: BookingStatus
  price?: number
  hours?: number
}

export interface BookingResponse {
  success: boolean;
  meta: MetaResponse;
  data: BookingDto[];
}
