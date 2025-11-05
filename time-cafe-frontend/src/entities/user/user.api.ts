import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserDto, CreateUserDto, UpdateUserDto } from "./user.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserDto[], void>({
      query: () => ({ url: endPoint, method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
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
