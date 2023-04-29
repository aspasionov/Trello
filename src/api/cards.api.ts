import instance from '@api/base.api'

import type { CardT } from '@store/columns/types'

export const fetchAll = async (): Promise<any> => {
  return await instance({
    url: '/cards',
    method: 'GET',
  })
}

export const deleteOne = async (id: string): Promise<any> => {
  return await instance({
    url: `/cards/${id}`,
    method: 'DELETE',
  })
}

export const addOne = async (card: CardT): Promise<any> => {
  return await instance({
    url: '/cards',
    method: 'POST',
    data: card,
  })
}

export const updateOne = async (id: string): Promise<unknown> => {
  return await instance({
    url: `/cards/${id}`,
    method: 'PUT',
  })
}
