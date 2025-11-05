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
