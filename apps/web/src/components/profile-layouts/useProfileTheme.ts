import { useState } from 'react';

export interface ProfileTheme {
  primaryColor: string;
  secondaryColor: string;
  mode: 'light' | 'dark';
}

const DEFAULT_THEME: ProfileTheme = {
  primaryColor: '#3B82F6',
  secondaryColor: '#F4F4F5',
  mode: 'light'
};

/**
 * Hook para gerenciar o tema do perfil (cores e modo).
 * @param initialTheme Tema inicial opcional
 * @returns { theme, setTheme, setPrimaryColor, setSecondaryColor, toggleMode }
 */
export function useProfileTheme(initialTheme: ProfileTheme = DEFAULT_THEME) {
  const [theme, setTheme] = useState<ProfileTheme>(initialTheme);

  function setPrimaryColor(color: string) {
    setTheme((prev) => ({ ...prev, primaryColor: color }));
  }

  function setSecondaryColor(color: string) {
    setTheme((prev) => ({ ...prev, secondaryColor: color }));
  }

  function toggleMode() {
    setTheme((prev) => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }));
  }

  return { theme, setTheme, setPrimaryColor, setSecondaryColor, toggleMode };
}
