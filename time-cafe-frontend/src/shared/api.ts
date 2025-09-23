import axios, { AxiosResponse } from "axios"

interface ApiArgs<TData = any> {
  endPoint: string
  id?: number
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: TData
  query?: Record<string, any>
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
})

/**
 * Ensures that a CSRF cookie is set before making a request
 * that requires authentication. This is necessary because Next.js
 * does not send cookies with API requests by default.
 */
async function ensureCsrfCookie() {
  await axiosInstance.get("/sanctum/csrf-cookie")
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
  args: ApiArgs<TData>
): Promise<AxiosResponse<TResponse>> {
  try {

    if (args.method !== "GET") {
      await ensureCsrfCookie()
    }

    const response = await axiosInstance.request<TResponse>({
      url: args.id ? `${args.endPoint}/${args.id}` : args.endPoint,
      method: args.method,
      data: args.data,
      params: args.query,
    })

    return response
  } catch (e) {
    console.error("Ошибка при запросе:", e)
    throw e
  }
}
