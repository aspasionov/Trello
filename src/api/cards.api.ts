import instance from '@api/base.api'

import type { CardT } from '@store/columns/types'

export const fetchAll = async (): Promise<{ data: CardT[] }> => {
  return await instance<CardT[]>({
    url: '/cards',
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<{ data: CardT }> => {
  return await instance({
    url: `/cards/${id}`,
    method: 'DELETE'
  })
}

export const addOne = async (card: CardT): Promise<{ data: CardT }> => {
  return await instance({
    url: '/cards',
    method: 'POST',
    data: card
  })
}

export const updateOne = async (
  id: string,
  card: CardT
): Promise<{ data: CardT }> => {
  return await instance({
    url: `/cards/${id}`,
    method: 'PUT',
    data: card
  })
}
