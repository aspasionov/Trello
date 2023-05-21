import instance from '@api/base.api'
import type { ColumnT } from '@store/columns/types'

export const fetchAll = async (): Promise<any> => {
  return await instance({
    url: '/columns',
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<any> => {
  return await instance({
    url: `/columns/${id}`,
    method: 'DELETE'
  })
}

export const addOne = async (column: ColumnT): Promise<any> => {
  return await instance({
    url: '/columns',
    method: 'POST',
    data: column
  })
}

export const updateOne = async (
  id: string,
  column: ColumnT
): Promise<{ data: ColumnT }> => {
  return await instance({
    url: `/columns/${id}`,
    method: 'PUT',
    data: column
  })
}
