import { createApi } from "@reduxjs/toolkit/query/react";
import type { 
  RegistrationLinkDto, 
  CreateRegistrationLinkDto, 
  UpdateRegistrationLinkDto, 
  RegistrationLinkResponse,
  GenerateLinkResponse,
  ValidateLinkResponse
} from "./registrationLinks.dto";
import { customBaseQuery } from "@/shared/api";

const endPoint = "registration-links";

export const registrationLinksApi = createApi({
  reducerPath: "registrationLinksApi",
  baseQuery: customBaseQuery,
  tagTypes: ["RegistrationLinks"],
  endpoints: (builder) => ({
    getAllRegistrationLinks: builder.query<RegistrationLinkResponse, { page?: number; per_page?: number }>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: endPoint,
        method: "GET",
        params: { page, per_page },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "RegistrationLinks" as const, id })),
              { type: "RegistrationLinks", id: "LIST" },
            ]
          : [{ type: "RegistrationLinks", id: "LIST" }],
    }),

    getRegistrationLink: builder.query<RegistrationLinkDto, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "GET" }),
      providesTags: (_res, _err, id) => [{ type: "RegistrationLinks", id }],
    }),

    generateRegistrationLink: builder.mutation<GenerateLinkResponse, CreateRegistrationLinkDto>({
      query: (data) => ({ 
        url: `${endPoint}/generate`, 
        method: "POST", 
        body: data 
      }),
      invalidatesTags: [{ type: "RegistrationLinks", id: "LIST" }],
    }),

    validateRegistrationLink: builder.query<ValidateLinkResponse, string>({
      query: (token) => ({ 
        url: `${endPoint}/validate/${token}`, 
        method: "GET" 
      }),
    }),

    updateRegistrationLink: builder.mutation<RegistrationLinkDto, { id: number; data: UpdateRegistrationLinkDto }>({
      query: ({ id, data }) => ({ 
        url: `${endPoint}/${id}`, 
        method: "PUT", 
        body: data 
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "RegistrationLinks", id }],
    }),

    deleteRegistrationLink: builder.mutation<void, number>({
      query: (id) => ({ url: `${endPoint}/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "RegistrationLinks", id },
        { type: "RegistrationLinks", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRegistrationLinksQuery,
  useGetRegistrationLinkQuery,
  useGenerateRegistrationLinkMutation,
  useValidateRegistrationLinkQuery,
  useUpdateRegistrationLinkMutation,
  useDeleteRegistrationLinkMutation,
} = registrationLinksApi;