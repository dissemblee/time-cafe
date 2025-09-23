import { $api } from '@/shared/api'
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto'

const endPoint = "users"

/**
 * Create a new user.
 * 
 * @param {CreateUserDto} data - The user data to be created.
 * @returns {Promise<UserDto>} - A promise of the created user.
 */
export const createUser = (data: CreateUserDto) => {
  return $api<UserDto, CreateUserDto>({
    endPoint,
    method: "POST",
    data,
  })
}


/**
 * Get all users.
 * 
 * @returns {Promise<UserDto[]>} - A promise of all users.
 */
export const getAllUsers = () => {
  return $api<UserDto[]>({
    endPoint,
    method: "GET",
  })
}

/**
 * Get a user by its id.
 * @param {number} id - The id of the user to get.
 * @returns {Promise<UserDto>} - A promise of the user.
 */
export const getUser = (id: number) => {
  return $api<UserDto>({
    endPoint,
    id,
    method: "GET",
  })
}

/**
 * Update a user by its id.
 * @param {number} id - The id of the user to update.
 * @param {UpdateUserDto} data - The user data to update with.
 * @returns {Promise<UserDto>} - A promise of the updated user.
 */
export const updateUser = (id: number, data: UpdateUserDto) => {
  return $api<UserDto, UpdateUserDto>({
    endPoint,
    id,
    method: "PUT",
    data,
  })
}

/**
 * Delete a user by its id.
 * @param {number} id - The id of the user to delete.
 * @returns {Promise<void>} - A promise that resolves when the user has been deleted.
 */
export const deleteUser = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE",
  })
}
