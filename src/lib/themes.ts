import { atom, map, type MapStore, type PreinitializedMapStore, type Atom, type WritableAtom } from "nanostores";

interface ThemeVariant {
  selector?: string;
  mediaQuery?: string
}

export interface Theme {
  key: string,
  name: string
  variant: ThemeVariant,
  defaultStrategy: keyof ThemeVariant
  default: boolean
  active?: boolean
}

export type ThemeStore = MapStore<Theme> | PreinitializedMapStore<Theme>



export const getTwThemes = (themes: Theme[]) => {
  const map = new Map()
  themes.forEach((t) => {
    const variant: ThemeVariant = {}
    t.defaultStrategy === "selector" ? variant.selector = t.variant.selector : variant.mediaQuery = t.variant.mediaQuery
    map.set(t.name, variant)
  })
  return Object.fromEntries(map)
}

export const darkTheme: ThemeStore = map({
  key: "prefers-dark",
  name: "dark",
  variant: {
    selector: ".dark",
    mediaQuery: '(prefers-color-scheme: dark)'
  },
  defaultStrategy: "selector",
  default: false
})

export const highContrastTheme: ThemeStore = map({
  key: "prefers-high-contrast",
  name: "high-contrast",
  variant: {
    selector: ".high-contrast",
    mediaQuery: '(prefers-contrast: more)'
  },
  defaultStrategy: "selector",
  default: false
})

export const themes = [highContrastTheme, darkTheme]

export const getThemeActive = (theme: Theme): boolean => {
  if (localStorage.getItem(theme.key)) {
    return (localStorage.getItem(theme.key)) === "true"
  }
  if (theme.variant.mediaQuery) {
    return window.matchMedia(theme.variant.mediaQuery).matches
  }
  return theme.default
}

export const setThemeActive = (theme: ThemeStore, active: boolean) => {
  theme.setKey("active", active)
  setThemeSelector(theme.get(), active)
  localStorage.setItem(theme.get().key, active.toString())
}

export const setThemeSelector = (theme: Theme, active: boolean, element: HTMLElement = document.documentElement) => {
  if (theme.defaultStrategy == "selector" && theme.variant.selector) {
    const className = theme.variant.selector.substring(1, theme.variant.selector.length)
    if (active) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }
}

export const initTheme = (theme: ThemeStore) => {
  const active = getThemeActive(theme.get())
  theme.setKey("active", active)

  setThemeSelector(theme.get(), active)
}






