import { $api } from "@/shared/api"
import { BookingDto, CreateBookingDto, UpdateBookingDto } from "./booking.dto"

const endPoint = "bookings"

/**
 * Create a new booking
 * @param {CreateBookingDto} data - The booking data to be created
 * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the created booking
 */
export const createBooking = (data: CreateBookingDto) => {
  return $api<BookingDto, CreateBookingDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Get all bookings.
 * 
 * @returns {Promise<AxiosResponse<BookingDto[]>>} - A promise that resolves to an AxiosResponse with all bookings.
 */
export const getAllBookings = () => {
  return $api<BookingDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Get a booking by its id.
 * @param {number} id - The id of the booking to get.
 * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the booking.
 */
export const getBooking = (id: number) => {
  return $api<BookingDto>({
    endPoint,
    id, 
    method: "GET"
  })
}

/**
 * Update a booking by its id.
 * @param {number} id - The id of the booking to update.
 * @param {UpdateBookingDto} data - The booking data to update with.
 * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the updated booking.
 */
export const updateBooking = (id: number, data: UpdateBookingDto) => {
  return $api<BookingDto, UpdateBookingDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Delete a booking by its id.
 * @param {number} id - The id of the booking to delete.
 * @returns {Promise<void>} - A promise that resolves when the booking has been deleted.
 */
export const deleteBooking = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}
