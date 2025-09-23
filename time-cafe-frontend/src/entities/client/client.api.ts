import { $api } from "@/shared/api"
import { ClientDto, CreateClientDto, UpdateClientDto } from "./client.dto"

const endPoint = "clients"

/**
 * Create a new client.
 * @param {CreateClientDto} data - The client data to be created.
 * @returns {Promise<ClientDto>} - A promise of the created client.
 */
export const createClient = (data: CreateClientDto) => {
  return $api<ClientDto, CreateClientDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Get all clients.
 * @returns {Promise<ClientDto[]>} - A promise of all clients.
 */
export const getAllClients = () => {
  return $api<ClientDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Get a client by its id.
 * @param {number} id - The id of the client to get.
 * @returns {Promise<ClientDto>} - A promise of the client.
 */
export const getClient = (id: number) => {
  return $api<ClientDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Update a client by its id.
 * @param {number} id - The id of the client to update.
 * @param {UpdateClientDto} data - The client data to update with.
 * @returns {Promise<ClientDto>} - A promise of the updated client.
 */
export const updateClient = (id: number, data: UpdateClientDto) => {
  return $api<ClientDto, UpdateClientDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Delete a client by its id.
 * @param {number} id - The id of the client to delete.
 * @returns {Promise<void>} - A promise that resolves when the client has been deleted.
 */
export const deleteClient = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}
