import { MetaResponse } from "@/shared/api"
import { StaffRole } from "./staff.enum"

export interface StaffDto {
  id: number
  user_id: number
  name: string
  phone: string
  created_at?: string
  updated_at?: string
}

export interface CreateStaffDto {
  user_id: number
  name: string
  phone: string
}

export interface UpdateStaffDto {
  user_id?: number
  name?: string
  phone?: string
}

export interface StaffResponse {
  success: boolean;
  meta: MetaResponse
  data: StaffDto[];
}
