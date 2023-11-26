export const errorsToString = (errors): string => {
  if(!errors.length) return ''
  return errors.map(el => Object.entries(el).map(([key, value]) => `${key}: ${value}`)).join(',')
}
