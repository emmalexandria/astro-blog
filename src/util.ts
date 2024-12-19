export const generateElementId = (prefix: string): string => {
  return prefix + Math.round(Math.random() * 1000)
}
