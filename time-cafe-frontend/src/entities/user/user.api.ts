import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserDto, CreateUserDto, UpdateUserDto, UserResponse } from "./user.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),

    getUser: builder.query<UserDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "Users", id }],
    }),

    createUser: builder.mutation<UserDto, CreateUserDto>({
      query: (data) => ({ url: endPoint, method: "POST", body: data }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUser: builder.mutation<UserDto, { id: number; data: UpdateUserDto }>({
      query: ({ id, data }) => ({ url: `${endPoint}/${id}`, method: "PUT", body: data }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Users", id }],
    }),

    deleteUser: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
