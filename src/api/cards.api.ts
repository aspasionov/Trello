import instance from '@api/base.api'

import type { CardT } from '@store/desk/types'

export const fetchAll = async (): Promise<{ data: CardT[] }> => {
  return await instance<CardT[]>({
    url: '/cards',
    method: 'GET'
  })
}

export const deleteOne = async (id: string): Promise<{ data: CardT }> => {
  return await instance({
    url: `/api/task/${id}`,
    method: 'DELETE'
  })
}

export const getOneCard = async (id: string): Promise<CardT> => {
  return await instance({
    url: `/api/task/${id}`
  })
}

export const addOne = async (card: CardT): Promise<{ data: CardT }> => {
  return await instance({
    url: '/api/task',
    method: 'POST',
    data: card
  })
}

export const updateOne = async (
  id: string,
  card: CardT
): Promise<{ data: CardT }> => {
  return await instance({
    url: `/api/task/${id}`,
    method: 'PATCH',
    data: card
  })
}

export const addBackground = async (
  id: string,
  formData: any
): Promise<{ data: CardT }> => {
  return await instance({
    url: `/api/task/files/${id}`,
    method: 'POST',
    data: formData
  })
}
