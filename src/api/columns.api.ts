import instance from '@api/base.api'

export const fetchAll = () => {
  return instance({
    url: '/columns',
    method: 'GET'
  })
}
