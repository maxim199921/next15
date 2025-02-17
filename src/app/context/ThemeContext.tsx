'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  children?: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ initialTheme: Theme; children?: React.ReactNode }> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    Cookies.set('theme', theme, { expires: 7 });

    if (theme === 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
