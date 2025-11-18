import { MetaResponse } from "@/shared/api"
import { ClientStatus } from "./client.enum"

export interface ClientDto {
  id: number
  user_id: number
  name: string
  phone: string
  bank_number?: string
  created_at?: string
  updated_at?: string
}

export interface CreateClientDto {
  user_id: number
  name: string
  phone: string
}

export interface UpdateClientDto {
  user_id?: number
  name?: string
  phone?: string
}

export interface ClientResponse {
  success: boolean;
  meta: MetaResponse;
  data: ClientDto[];
}
