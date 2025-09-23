export interface RoomDto {
  id: number
  name: string
  type: string
  smoking_allowed: boolean
  created_at?: string
  updated_at?: string
}

export interface CreateRoomDto {
  name: string
  type: string
  smoking_allowed: boolean
}

export interface UpdateRoomDto {
  name?: string
  type?: string
  smoking_allowed?: boolean
}