const dark = "dark"
const light = "light"
const key = "theme"

export function toggleTheme() {
  let theme = getTheme()
  if (theme == light) {
    setTheme(dark)
  } else {
    setTheme(light)
  }
}

export function setTheme(theme: string) {
  if (!(theme === dark || theme === light)) {
    return
  }

  localStorage.setItem(key, theme)
  switch (theme) {
    case dark:
      document.body.classList.add(dark)
      break
    case light:
      document.body.classList.remove(dark)
      break
  }
}


export function getTheme() {
  let theme = light
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = dark
  } else {
    theme = light
  }

  const localVal = localStorage.getItem(key)
  if (localVal != null) {
    theme = localVal
  }
  return theme
}




setTheme(getTheme())


