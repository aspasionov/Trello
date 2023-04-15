import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

const initialConfig: AxiosRequestConfig = {
  baseURL: 'https://62b851d3f4cb8d63df5be487.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000
  }
}

const instance: AxiosInstance = axios.create(initialConfig)

export default instance
