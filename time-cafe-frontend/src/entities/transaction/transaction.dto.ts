import { MetaResponse } from "@/shared/api"
import { TransactionStatus } from "./transaction.enum"

export interface TransactionDto {
  id: number
  client_id: number
  booking_id: number
  amount: number
  status: TransactionStatus
  transaction_code: string | null
  gateway_payload: Record<string, any> | null
  created_at?: string
  updated_at?: string
}

export interface CreateTransactionDto {
  client_id: number
  booking_id: number
  amount: number
  status?: TransactionStatus
  transaction_code?: string
  gateway_payload?: Record<string, any>
}

export interface UpdateTransactionDto {
  client_id?: number
  booking_id?: number
  amount?: number
  status?: TransactionStatus
  transaction_code?: string
  gateway_payload?: Record<string, any>
}

export interface TransactionResponse {
  success: boolean
  meta: MetaResponse
  data: TransactionDto[]
}
