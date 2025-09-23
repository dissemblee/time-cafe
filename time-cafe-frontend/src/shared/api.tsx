import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

interface ApiProps<TData = any> {
  endPoint: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  data?: TData
  query?: Record<string, any>
}

export async function $api<TResponse = any, TData = any>(
  args: ApiProps<TData>
): Promise<AxiosResponse<TResponse>> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_APP_BACKEND_URL_DEV,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    })

    const response = await axiosInstance.request<TResponse>({
      url: args.endPoint,
      method: args.method,
      data: args.data,
      params: args.query,
    })

    return response
  } catch (e) {
    console.error("Возникла ошибка при запросе:", e)
    throw e
  }
}
