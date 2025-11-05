import { createApi } from "@reduxjs/toolkit/query/react";
import type { StaffDto, CreateStaffDto, UpdateStaffDto } from "./staff.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "staffs";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Staffs"],
  endpoints: (builder) => ({
    getAllStaffs: builder.query<StaffDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Staffs" as const, id })),
              { type: "Staffs", id: "LIST" },
            ]
          : [{ type: "Staffs", id: "LIST" }],
    }),

    getStaff: builder.query<StaffDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Staffs", id }],
    }),

    createStaff: builder.mutation<StaffDto, CreateStaffDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Staffs", id: "LIST" }],
    }),

    updateStaff: builder.mutation<StaffDto, { id: number; data: UpdateStaffDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Staffs", id }],
    }),

    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Staffs", id },
        { type: "Staffs", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllStaffsQuery,
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
