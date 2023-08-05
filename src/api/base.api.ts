import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

const initialConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3333/',
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

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  throw error
}

const onResponseError = async (error: AxiosError): Promise<unknown> => {
  // console.log('error', error.response)
  throw error
}

export const instance: AxiosInstance = axios.create()
instance.interceptors.request.use(onRequest, onRequestError)
instance.interceptors.response.use(onResponse, onResponseError)

export default instance
