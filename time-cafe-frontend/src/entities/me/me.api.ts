import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/shared/api";
import { MeResponse } from "./me.dto";

export const meApi = createApi({
  reducerPath: "meApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      providesTags: ["Me"],
    }),
  }),
});

export const { useGetMeQuery } = meApi;
