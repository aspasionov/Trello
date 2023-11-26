import instance from '@api/base.api'
import qs from 'qs'
import type { ColumnT } from '@store/desk/types'
import { type UserI } from '@store/users/types'

const defaultUserParams = {
  fields: 'name'
}

// const defaultColumnParams = {
//   page: 1,
//   limit: 6
// }

export const fetchAllColumns = async (params: {
  search?: string
  userIds?: string
}): Promise<never> => {
  for (const key in params) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (params[key] === undefined || !params[key]) delete params[key]
  }
  const fields: string = qs.stringify(params)
  return await instance({
    url: `/admin/columns?${fields}`,
    method: 'GET'
  })
}

export const fetchAllUsers = async (params?: {
  fields?: keyof UserI
}): Promise<{ data: UserI[] }> => {
  const fields: string = qs.stringify({ ...defaultUserParams, ...params })
  return await instance({
    url: `/admin/users?${fields}`,
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<never> => {
  return await instance({
    url: `/api/column/${id}`,
    method: 'DELETE'
  })
}

export const addOne = async (column: ColumnT): Promise<never> => {
  return await instance({
    url: '/api/column',
    method: 'post',
    data: column
  })
}

export const updateOne = async (
  id: string,
  column: ColumnT
): Promise<{ data: ColumnT }> => {
  return await instance({
    url: `/api/column/${id}`,
    method: 'patch',
    data: column
  })
}
