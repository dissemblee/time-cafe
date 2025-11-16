import { createApi } from "@reduxjs/toolkit/query/react";
import type { BookingDto, BookingResponse, CreateBookingDto, UpdateBookingDto } from "./booking.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "bookings";

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    getAllBookings: builder.query<BookingResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Bookings" as const, id })),
              { type: "Bookings", id: "LIST" },
            ]
          : [{ type: "Bookings", id: "LIST" }],
    }),

    getBooking: builder.query<BookingDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
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
