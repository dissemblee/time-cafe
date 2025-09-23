export interface RoomLayoutItemDto {
  id: number
  room_id: number
  type: string
  table_id?: number
  x: number
  y: number
  width: number
  height: number
  rotation: number
  created_at?: string
  updated_at?: string
}

export interface CreateRoomLayoutItemDto {
  room_id: number
  type: string
  table_id?: number
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

export interface UpdateRoomLayoutItemDto {
  room_id?: number
  type?: string
  table_id?: number
  x?: number
  y?: number
  width?: number
  height?: number
  rotation?: number
}
