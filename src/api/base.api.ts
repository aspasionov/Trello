import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const initialConfig: AxiosRequestConfig = {
  baseURL: 'https://sheetdb.io/api/v1/1v07nmgsjb4i0',
  headers: {
    'Content-Type': 'application/json',
    timeout: 1000
  }
}

const instance: AxiosInstance = axios.create(initialConfig)

export default instance
