'use client';

import { useTheme } from '@/app/context/ThemeContext';

export const Test = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Переключить тему: {theme === 'light' ? 'Тёмная' : 'Светлая'}
      </button>
    </div>
  );
};
