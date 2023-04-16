import instance from '@api/base.api'

export const fetchAll = async (): Promise<unknown> => {
  return await instance({
    url: '/columns',
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<unknown> => {
  return await instance({
    url: `/columns/${id}`,
    method: 'DELETE'
  })
}

export const addOne = async (): Promise<unknown> => {
  return await instance({
    url: '/columns',
    method: 'POST'
  })
}

export const updateOne = async (id: string): Promise<unknown> => {
  return await instance({
    url: `/columns/${id}`,
    method: 'PUT'
  })
}
