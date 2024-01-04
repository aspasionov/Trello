import instance from '@api/base.api'
import qs from 'qs'
import { type UserI } from '@store/users/types'

const defaultUserParams = {
  fields: 'name'
}

const defaultColumnParams = {
  page: 1,
  limit: 4
}

export const fetchAllColumns = async (params: {
  page?: number
  search?: string
  userIds?: string
}): Promise<never> => {
  for (const key in params) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (params[key] === undefined || !params[key]) delete params[key]
  }
  const fields: string = qs.stringify({...defaultColumnParams, ...params })
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
