import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

const initialConfig: AxiosRequestConfig = {
  baseURL: 'https://62b851d3f4cb8d63df5be487.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000,
  },
}

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return { ...initialConfig, ...config }
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  throw error
}

export const instance: AxiosInstance = axios.create()
instance.interceptors.request.use(onRequest, onRequestError)

export default instance
