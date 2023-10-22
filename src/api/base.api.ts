import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

const initialConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000
  }
}

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return { ...initialConfig, ...config }
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data
}

const onRequestError = (error: AxiosError): AxiosError => {
  throw error
}

const onResponseError = (error: AxiosError): AxiosError => {
  throw error
}

export const instance: AxiosInstance = axios.create()
instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)

export default instance
