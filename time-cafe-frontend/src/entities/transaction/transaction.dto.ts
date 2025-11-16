import { MetaResponse } from "@/shared/api"
import { TransactionStatus } from "./transaction.enum"

export interface TransactionDto {
  id: number
  client_id: number
  table_id: number
  booking_id?: number
  status: TransactionStatus
  created_at?: string
  updated_at?: string
}

export interface CreateTransactionDto {
  client_id: number
  table_id: number
  booking_id?: number
  status?: TransactionStatus
}

export interface UpdateTransactionDto {
  client_id?: number
  table_id?: number
  booking_id?: number
  status?: TransactionStatus
}

export interface TransactionResponse {
  success: boolean;
  meta: MetaResponse
  data: TransactionDto[];
}
