import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeId = 'primary' | 'aesthetics' | 'web3-glass' | 'terracotta' | 'london-editorial'

export interface Theme {
  id: ThemeId
  name: string
  subtitle: string
  accentColor: string
}

export const themes: Theme[] = [
  {
    id: 'primary',
    name: 'Primary Minimalist',
    subtitle: 'Warm Cream & Charcoal (Default)',
    accentColor: '#2C2A28',
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics Lab',
    subtitle: 'Clinical Soft Teal & Dust Blue',
    accentColor: '#8FAFB4',
  },
  {
    id: 'web3-glass',
    name: 'Futuristic Glass',
    subtitle: 'Deep Emerald & Frosted Metallic',
    accentColor: '#4A7A7A',
  },
  {
    id: 'terracotta',
    name: 'Warm Terracotta',
    subtitle: 'Rich Amber, Clay & Burnt Copper',
    accentColor: '#C05621',
  },
  {
    id: 'london-editorial',
    name: 'London Editorial',
    subtitle: 'Warm Taupe, Beige & Modern Serif',
    accentColor: '#8C7A6B',
  },
]

interface ThemeContextType {
  currentTheme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'primary',
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('pasith_theme') as ThemeId
    return saved || 'primary'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('pasith_theme', currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
