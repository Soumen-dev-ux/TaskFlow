"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme")
      return saved === "dark" ? "dark" : "light"
    } catch {
      return "light"
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark")
    } else {
      root.removeAttribute("data-theme")
    }
    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="interactive-soft inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-input bg-muted text-foreground hover:bg-muted/80"
    >
      {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      <span className="text-sm font-medium">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  )
}
