import instance from '@api/base.api'
import type { ColumnT } from '@store/desk/types'
import qs from 'qs'

export const fetchAll = async (params: { search: string }): Promise<never> => {
  const fields: string = qs.stringify(params)
  return await instance({
    url: `/api/column?${fields}`,
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
