import instance from '@api/base.api'
import type { ColumnT } from '@store/desk/types'

export const fetchAll = async (): Promise<any> => {
  return await instance({
    url: '/api/column',
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<any> => {
  return await instance({
    url: `/api/column/${id}`,
    method: 'DELETE'
  })
}

export const addOne = async (column: ColumnT): Promise<any> => {
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
    method: 'PUT',
    data: column
  })
}
