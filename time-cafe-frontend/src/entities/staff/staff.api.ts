import { $api } from "@/shared/api"
import { CreateStaffDto, StaffDto, UpdateStaffDto } from "./staff.dto"

const endPoint = "staffs"

/**
 * Create a new staff
 * @param {CreateStaffDto} data - The staff data to be created
 * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the created staff
 */
export const createStaff = (data: CreateStaffDto) => {
  return $api<StaffDto, CreateStaffDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Get all staffs.
 * 
 * @returns {Promise<AxiosResponse<StaffDto[]>>} - A promise that resolves to an AxiosResponse with all staffs.
 */
export const getAllStaffs = () => {
  return $api<StaffDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Get a staff by its id.
 * @param {number} id - The id of the staff to get.
 * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the staff.
 */
export const getStaff = (id: number) => {
  return $api<StaffDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Updates a staff with the given id.
 * @param {number} id - The id of the staff to update.
 * @param {UpdateStaffDto} data - The staff data to update with.
 * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the updated staff.
 */
export const updateStaff = (id: number, data: UpdateStaffDto) => {
  return $api({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Deletes a staff with the given id.
 * @param {number} id - The id of the staff to delete.
 * @returns {Promise<AxiosResponse<void>>} - A promise that resolves to an AxiosResponse with no data.
 */
export const deleteStaff = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}
