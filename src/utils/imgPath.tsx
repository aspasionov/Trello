export const renderImgPath = (path: string): string => {
  const currentUrl: string = import.meta.env.VITE_BASE_URL
  return `${currentUrl}${path}`
}
