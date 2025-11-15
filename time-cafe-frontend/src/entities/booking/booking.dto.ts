import { BookingStatus } from "./booking.enum"

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
