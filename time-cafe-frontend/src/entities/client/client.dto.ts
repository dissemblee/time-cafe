import { ClientStatus } from "./client.enum"

export interface ClientDto {
  id: number
  user_id: number
  name: string
  phone: string
  note?: string
  bank_number?: string
  discount_percent?: number
  status: ClientStatus
  date_of_birth?: string
  created_at?: string
  updated_at?: string
}

export interface CreateClientDto {
  user_id: number
  name: string
  phone: string
  note?: string
  bank_number?: string
  discount_percent?: number
  status?: ClientStatus
  date_of_birth?: string
}

export interface UpdateClientDto {
  user_id?: number
  name?: string
  phone?: string
  note?: string
  bank_number?: string
  discount_percent?: number
  status?: ClientStatus
  date_of_birth?: string
}