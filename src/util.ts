import type { CollectionEntry } from "astro:content"

export const generateElementId = (prefix: string): string => {
  return prefix + Math.round(Math.random() * 1000)
}


