export interface RootDto {
  id: number
  user_id: number
  name: string
  phone: string
  social_network?: string
  created_at?: string
  updated_at?: string
}

export interface CreateRootDto {
  user_id: number
  name: string
  phone: string
  social_network?: string
}

export interface UpdateRootDto {
  user_id?: number
  name?: string
  phone?: string
  social_network?: string
}
