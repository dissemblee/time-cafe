import { StaffRole } from "./staff.enum"

export interface StaffDto {
  id: number
  user_id: number
  name: string
  phone: string
  personal_discount: number
  responsible: boolean
  role: StaffRole
  created_at?: string
  updated_at?: string
}

export interface CreateStaffDto {
  user_id: number
  name: string
  phone: string
  personal_discount?: number
  responsible?: boolean
  role: StaffRole
}

export interface UpdateStaffDto {
  user_id?: number
  name?: string
  phone?: string
  personal_discount?: number
  responsible?: boolean
  role?: StaffRole
}