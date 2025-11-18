import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { getCookie } from 'cookies-next';

export interface MetaResponse {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface ApiArgs {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: Record<string, any>;
}

interface ApiArgsAxios<TData = any> {
  endPoint: string
  id?: number
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: TData
  query?: Record<string, any>
}

/**
 * Axios instance с правильными заголовками и withCredentials
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
  },
});

/**
 * Обеспечивает наличие CSRF cookie перед POST/PUT/DELETE
 */
async function ensureCsrfCookie() {
  await axios.get(`${(process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(/\/api\/?$/, "")}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
}

/**
 * Makes a request to the backend API.
 *
 * @param {ApiArgs<TData>} args - The request arguments.
 * @returns {Promise<AxiosResponse<TResponse>>} - The response.
 *
 * @throws {Error} - If there is an error with the request.
 */
export async function $api<TResponse = any, TData = any>(
  args: ApiArgsAxios<TData>
): Promise<AxiosResponse<TResponse>> {
  try {

    if (args.method !== "GET") {
      await ensureCsrfCookie()
    }

    const xsrfToken = getCookie("XSRF-TOKEN")?.toString();

    const response = await axiosInstance.request<TResponse>({
      url: args.id ? `${args.endPoint}/${args.id}` : args.endPoint,
      method: args.method,
      data: args.data,
      params: args.query,
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {})
      }
    })

    return response
  } catch (e) {
    console.error("Ошибка при запросе:", e)
    throw e
  }
}

/**
 * customBaseQuery для RTK Query
 */
export const customBaseQuery: BaseQueryFn<
  ApiArgs,
  unknown,
  { status?: number; data?: any }
> = async ({ url, method = "GET", body, params }: any) => {
  try {
    if (method !== "GET") {
      await ensureCsrfCookie();
    }

    const xsrfToken = getCookie("XSRF-TOKEN")?.toString();

    const response = await axiosInstance.request({
      url,
      method,
      data: body,
      params,
      headers: {
        "Content-Type": "application/json",
        ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {})
      }
    });

    return { data: response.data };
  } catch (err) {
    const error = err as AxiosError;
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data,
      },
    };
  }
};
