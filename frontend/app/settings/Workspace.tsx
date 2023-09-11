import React from 'react'
import { useTheme } from 'next-themes'

export default function Workspace() {
  const { theme, setTheme } = useTheme()
  const [themeMode, setThemeMode] = React.useState(theme === 'system')
  const [darkMode, setDarkMode] = React.useState(theme === 'dark')

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div>loading...</div>

  const toggleThemeMode = () => {
    if (themeMode) {
      setTheme('light')
      setDarkMode(false)
    } else {
      setTheme('system')
    }
    setThemeMode(!themeMode)
  }
  const toggleDarkMode = () => {
    if (darkMode) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
    setDarkMode(!darkMode)
  }

  return (
    <div>
      <p>Workspace</p>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">System Default</span>
          <input
            type="checkbox"
            className="toggle"
            checked={themeMode}
            onChange={() => toggleThemeMode()}
          />
        </label>
        {!themeMode && (
          <section>
            <label className="label cursor-pointer">
              <span className="label-text">Light Mode</span>
              <input
                type="checkbox"
                className="toggle"
                checked={!darkMode}
                onChange={() => toggleDarkMode()}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Dark Mode</span>
              <input
                type="checkbox"
                className="toggle"
                checked={darkMode}
                onChange={() => toggleDarkMode()}
              />
            </label>
          </section>
        )}
      </div>
    </div>
  )
}
