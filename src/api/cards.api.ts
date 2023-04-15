import instance from '@api/base.api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchAll = async () => {
  return await instance({
    url: '/cards',
    method: 'GET'
  })
}
