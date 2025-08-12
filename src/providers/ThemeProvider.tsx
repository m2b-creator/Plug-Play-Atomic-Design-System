'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeName, themes, generateCSSCustomProperties } from '@/styles/theme';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  enableSystemTheme?: boolean;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  enableSystemTheme = true,
  storageKey = 'atomicpnp-theme',
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): ThemeName => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Load theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey) as ThemeName;
        if (stored && themes[stored]) {
          setThemeName(stored);
        } else if (enableSystemTheme) {
          setThemeName(getSystemTheme());
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
      }
    }
    setMounted(true);
  }, [storageKey, enableSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystemTheme || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is stored in localStorage
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        setThemeName(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystemTheme, storageKey]);

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    if (!mounted) return;

    const theme = themes[themeName];
    const customProperties = generateCSSCustomProperties(theme);

    // Apply CSS custom properties to document root
    const root = document.documentElement;
    Object.entries(customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update data attribute for CSS selectors
    root.setAttribute('data-theme', themeName);

    // Store theme preference
    try {
      localStorage.setItem(storageKey, themeName);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [themeName, mounted, storageKey]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  const toggleTheme = () => {
    setThemeName(current => current === 'light' ? 'dark' : 'light');
  };

  const contextValue: ThemeContextType = {
    theme: themes[themeName],
    themeName,
    setTheme,
    toggleTheme,
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Component for theme toggle button
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  className = '', 
  size = 'md',
  showLabel = false 
}: ThemeToggleProps) {
  const { themeName, toggleTheme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center
        rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-colors duration-200
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={`Switch to ${themeName === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${themeName === 'light' ? 'dark' : 'light'} theme`}
    >
      {themeName === 'light' ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      {showLabel && (
        <span className="ml-2 text-sm">
          {themeName === 'light' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}