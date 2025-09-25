// import { $api } from "@/shared/api"
// import { BookingDto, CreateBookingDto, UpdateBookingDto } from "./booking.dto"

// const endPoint = "bookings"

// /**
//  * Create a new booking
//  * @param {CreateBookingDto} data - The booking data to be created
//  * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the created booking
//  */
// export const createBooking = (data: CreateBookingDto) => {
//   return $api<BookingDto, CreateBookingDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Get all bookings.
//  * 
//  * @returns {Promise<AxiosResponse<BookingDto[]>>} - A promise that resolves to an AxiosResponse with all bookings.
//  */
// export const getAllBookings = () => {
//   return $api<BookingDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Get a booking by its id.
//  * @param {number} id - The id of the booking to get.
//  * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the booking.
//  */
// export const getBooking = (id: number) => {
//   return $api<BookingDto>({
//     endPoint,
//     id, 
//     method: "GET"
//   })
// }

// /**
//  * Update a booking by its id.
//  * @param {number} id - The id of the booking to update.
//  * @param {UpdateBookingDto} data - The booking data to update with.
//  * @returns {Promise<AxiosResponse<BookingDto>>} - A promise that resolves to an AxiosResponse with the updated booking.
//  */
// export const updateBooking = (id: number, data: UpdateBookingDto) => {
//   return $api<BookingDto, UpdateBookingDto>({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Delete a booking by its id.
//  * @param {number} id - The id of the booking to delete.
//  * @returns {Promise<void>} - A promise that resolves when the booking has been deleted.
//  */
// export const deleteBooking = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

import { createApi } from "@reduxjs/toolkit/query/react";
import type { BookingDto, CreateBookingDto, UpdateBookingDto } from "./booking.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "bookings";

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getAllBookings: builder.query<BookingDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Bookings" as const, id })),
              { type: "Bookings", id: "LIST" },
            ]
          : [{ type: "Bookings", id: "LIST" }],
    }),

    getBooking: builder.query<BookingDto, number>({
      query: (id) => `${endPoint}/${id}`,
      providesTags: (result, error, id) => [{ type: "Bookings", id }],
    }),

    createBooking: builder.mutation<BookingDto, CreateBookingDto>({
      query: (data) => ({
        url: endPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Bookings", id: "LIST" }],
    }),

    updateBooking: builder.mutation<BookingDto, { id: number; data: UpdateBookingDto }>({
      query: ({ id, data }) => ({
        url: `${endPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Bookings", id }],
    }),

    deleteBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `${endPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Bookings", id },
        { type: "Bookings", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;
