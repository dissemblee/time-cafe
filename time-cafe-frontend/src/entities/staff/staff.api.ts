// import { $api } from "@/shared/api"
// import { CreateStaffDto, StaffDto, UpdateStaffDto } from "./staff.dto"

// const endPoint = "staffs"

// /**
//  * Create a new staff
//  * @param {CreateStaffDto} data - The staff data to be created
//  * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the created staff
//  */
// export const createStaff = (data: CreateStaffDto) => {
//   return $api<StaffDto, CreateStaffDto>({
//     endPoint,
//     method: "POST",
//     data
//   })
// }

// /**
//  * Get all staffs.
//  * 
//  * @returns {Promise<AxiosResponse<StaffDto[]>>} - A promise that resolves to an AxiosResponse with all staffs.
//  */
// export const getAllStaffs = () => {
//   return $api<StaffDto[]>({
//     endPoint,
//     method: "GET"
//   })
// }

// /**
//  * Get a staff by its id.
//  * @param {number} id - The id of the staff to get.
//  * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the staff.
//  */
// export const getStaff = (id: number) => {
//   return $api<StaffDto>({
//     endPoint,
//     id,
//     method: "GET"
//   })
// }

// /**
//  * Updates a staff with the given id.
//  * @param {number} id - The id of the staff to update.
//  * @param {UpdateStaffDto} data - The staff data to update with.
//  * @returns {Promise<AxiosResponse<StaffDto>>} - A promise that resolves to an AxiosResponse with the updated staff.
//  */
// export const updateStaff = (id: number, data: UpdateStaffDto) => {
//   return $api({
//     endPoint,
//     id,
//     method: "PUT",
//     data
//   })
// }

// /**
//  * Deletes a staff with the given id.
//  * @param {number} id - The id of the staff to delete.
//  * @returns {Promise<AxiosResponse<void>>} - A promise that resolves to an AxiosResponse with no data.
//  */
// export const deleteStaff = (id: number) => {
//   return $api<void>({
//     endPoint,
//     id,
//     method: "DELETE"
//   })
// }

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
