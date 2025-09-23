import { $api } from "@/shared/api"
import { CreateRootDto, RootDto, UpdateRootDto } from "./root.dto"

const endPoint = "roots"

/**
 * Create a new root
 * @param {CreateRootDto} data - The data to create the root with
 * @returns {Promise<AxiosResponse<RootDto>>} - A promise that resolves to an AxiosResponse with the created root
 */
export const createRoots = (data: CreateRootDto) => {
  return $api<RootDto, CreateRootDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Retrieve all roots
 * @returns {Promise<RootDto[]>} - An array of root objects
 */
export const getAllRoots = () => {
  return $api<RootDto[]>({
    endPoint,
    method: "POST"
  })
}

/**
 * Get a root by id
 * @param {number} id - The id of the root to be retrieved
 * @returns {Promise<RootDto>} - The root data
 */
export const getRoot = (id: number) => {
  return $api<RootDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Update a root
 * @param {number} id The id of the root to update
 * @param {UpdateRootDto} data The data to update the root with
 * @returns {Promise<AxiosResponse<RootDto>>} A promise that resolves to an AxiosResponse with the updated root
 */
export const updateRoot = (id: number, data: UpdateRootDto) => {
  return $api<RootDto, UpdateRootDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Delete a root
 * @param {number} id The id of the root to delete
 * @returns {Promise<AxiosResponse<RootDto>>} A promise that resolves to an AxiosResponse with the deleted root
 */
export const deleteRoot = (id: number) => {
  return $api<RootDto>({
    endPoint,
    id,
    method: "DELETE"
  })
}
