import { $api } from "@/shared/api"
import { CreateRoomDto, RoomDto, UpdateRoomDto } from "./room.dto"

const endPoint = "rooms"

/**
 * Create a new room
 * @param {CreateRoomDto} data - The room data to be created
 * @returns {Promise<AxiosResponse<RoomDto>>} - A promise that resolves to an AxiosResponse with the created room
 */
export const createRoom = (data: CreateRoomDto) => {
  return $api<RoomDto, CreateRoomDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Get all rooms.
 * 
 * @returns {Promise<AxiosResponse<RoomDto[]>>} - A promise of all rooms.
 */
export const getAllRooms = () => {
  return $api<RoomDto[]>({
    endPoint,
    method: "POST"
  })
}

/**
 * Get a room by id
 * @param {number} id - The id of the room to be retrieved
 * @returns {Promise<AxiosResponse<RoomDto>>} - A promise that resolves to an AxiosResponse with the room
 */
export const getRoom = (id: number) => {
  return $api<RoomDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Update a room by its id
 * @param {number} id - The id of the room to be updated
 * @param {UpdateRoomDto} data - The room data to update with
 * @returns {Promise<AxiosResponse<RoomDto>>} - A promise that resolves to an AxiosResponse with the updated room
 */
export const updateRoom = (id: number, data: UpdateRoomDto) => {
  return $api<RoomDto, UpdateRoomDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Delete a room by its id
 * @param {number} id - The id of the room to delete
 * @returns {Promise<void>} - A promise that resolves when the room has been deleted
 */
export const deleteRoom = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}
