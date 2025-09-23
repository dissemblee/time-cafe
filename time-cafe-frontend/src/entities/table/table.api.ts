import { $api } from "@/shared/api"
import { CreateTableDto, TableDto, UpdateTableDto } from "./table.dto"

const endPoint = "tables"

/**
 * Creates a new table.
 * 
 * @param {CreateTableDto} data - The data to create the table with.
 * @returns {Promise<AxiosResponse<TableDto>>} - A promise that resolves to an AxiosResponse with the created table.
 */
export const createTable = (data: CreateTableDto) => {
  return $api<TableDto, CreateTableDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Retrieves all tables.
 * 
 * @returns {Promise<AxiosResponse<TableDto[]>>} - A promise that resolves to an AxiosResponse with all tables.
 */
export const getAllTables = () => {
  return $api<TableDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Retrieves a table by its id.
 * 
 * @param {number} id - The id of the table to retrieve.
 * @returns {Promise<AxiosResponse<TableDto>>} - A promise that resolves to an AxiosResponse with the retrieved table.
 */
export const getTable = (id: number) => {
  return $api<TableDto>({
    endPoint,
    id,
    method: "GET"
  })
}

export const updateTable = (id: number, data: UpdateTableDto) => {
  return $api<TableDto, UpdateTableDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Deletes a table by its id.
 * @param {number} id - The id of the table to delete.
 * @returns {Promise<AxiosResponse<void>>} - A promise that resolves when the table has been deleted.
 */
export const deleteTable = (id: number) => {
  return $api({
    endPoint,
    id,
    method: "DELETE"
  })
}
