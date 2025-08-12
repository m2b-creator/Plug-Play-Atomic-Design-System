// Theme System - Manages theme variants and CSS custom properties
// Supports light/dark modes and custom theme extensions

import { designTokens } from './design-tokens';

export interface Theme {
  name: string;
  colors: {
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    
    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      link: string;
      linkHover: string;
    };
    
    // Border colors
    border: {
      primary: string;
      secondary: string;
      focus: string;
      error: string;
    };
    
    // Interactive colors
    interactive: {
      primary: string;
      primaryHover: string;
      primaryActive: string;
      primaryDisabled: string;
      
      secondary: string;
      secondaryHover: string;
      secondaryActive: string;
      
      danger: string;
      dangerHover: string;
      dangerActive: string;
      
      success: string;
      warning: string;
    };
    
    // Overlay colors
    overlay: {
      backdrop: string;
      tooltip: string;
      popover: string;
    };
  };
}

// Light theme definition
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: {
      primary: designTokens.colors.neutral[50],      // #fafafa
      secondary: designTokens.colors.neutral[100],   // #f4f4f5
      tertiary: designTokens.colors.neutral[200],    // #e4e4e7
      inverse: designTokens.colors.neutral[900],     // #18181b
    },
    
    text: {
      primary: designTokens.colors.neutral[900],     // #18181b
      secondary: designTokens.colors.neutral[600],   // #52525b
      tertiary: designTokens.colors.neutral[500],    // #71717a
      inverse: designTokens.colors.neutral[50],      // #fafafa
      link: designTokens.colors.primary[600],        // #2563eb
      linkHover: designTokens.colors.primary[700],   // #1d4ed8
    },
    
    border: {
      primary: designTokens.colors.neutral[200],     // #e4e4e7
      secondary: designTokens.colors.neutral[300],   // #d4d4d8
      focus: designTokens.colors.primary[500],       // #3b82f6
      error: designTokens.colors.danger[500],        // #ef4444
    },
    
    interactive: {
      primary: designTokens.colors.primary[600],     // #2563eb
      primaryHover: designTokens.colors.primary[700], // #1d4ed8
      primaryActive: designTokens.colors.primary[800], // #1e40af
      primaryDisabled: designTokens.colors.neutral[300], // #d4d4d8
      
      secondary: designTokens.colors.neutral[100],   // #f4f4f5
      secondaryHover: designTokens.colors.neutral[200], // #e4e4e7
      secondaryActive: designTokens.colors.neutral[300], // #d4d4d8
      
      danger: designTokens.colors.danger[600],       // #dc2626
      dangerHover: designTokens.colors.danger[700],  // #b91c1c
      dangerActive: designTokens.colors.danger[800], // #991b1b
      
      success: designTokens.colors.success[600],     // #16a34a
      warning: designTokens.colors.warning[500],     // #f59e0b
    },
    
    overlay: {
      backdrop: 'rgba(0, 0, 0, 0.5)',
      tooltip: designTokens.colors.neutral[900],     // #18181b
      popover: designTokens.colors.neutral[50],      // #fafafa
    },
  },
};

// Dark theme definition
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: {
      primary: designTokens.colors.neutral[900],     // #18181b
      secondary: designTokens.colors.neutral[800],   // #27272a
      tertiary: designTokens.colors.neutral[700],    // #3f3f46
      inverse: designTokens.colors.neutral[50],      // #fafafa
    },
    
    text: {
      primary: designTokens.colors.neutral[50],      // #fafafa
      secondary: designTokens.colors.neutral[300],   // #d4d4d8
      tertiary: designTokens.colors.neutral[400],    // #a1a1aa
      inverse: designTokens.colors.neutral[900],     // #18181b
      link: designTokens.colors.primary[400],        // #60a5fa
      linkHover: designTokens.colors.primary[300],   // #93c5fd
    },
    
    border: {
      primary: designTokens.colors.neutral[700],     // #3f3f46
      secondary: designTokens.colors.neutral[600],   // #52525b
      focus: designTokens.colors.primary[500],       // #3b82f6
      error: designTokens.colors.danger[500],        // #ef4444
    },
    
    interactive: {
      primary: designTokens.colors.primary[500],     // #3b82f6
      primaryHover: designTokens.colors.primary[400], // #60a5fa
      primaryActive: designTokens.colors.primary[600], // #2563eb
      primaryDisabled: designTokens.colors.neutral[700], // #3f3f46
      
      secondary: designTokens.colors.neutral[700],   // #3f3f46
      secondaryHover: designTokens.colors.neutral[600], // #52525b
      secondaryActive: designTokens.colors.neutral[500], // #71717a
      
      danger: designTokens.colors.danger[500],       // #ef4444
      dangerHover: designTokens.colors.danger[400],  // #f87171
      dangerActive: designTokens.colors.danger[600], // #dc2626
      
      success: designTokens.colors.success[500],     // #22c55e
      warning: designTokens.colors.warning[400],     // #fbbf24
    },
    
    overlay: {
      backdrop: 'rgba(0, 0, 0, 0.75)',
      tooltip: designTokens.colors.neutral[800],     // #27272a
      popover: designTokens.colors.neutral[800],     // #27272a
    },
  },
};

// Available themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeName = keyof typeof themes;

// CSS custom properties generator
export const generateCSSCustomProperties = (theme: Theme) => {
  const { colors } = theme;
  
  return {
    // Background colors
    '--color-bg-primary': colors.background.primary,
    '--color-bg-secondary': colors.background.secondary,
    '--color-bg-tertiary': colors.background.tertiary,
    '--color-bg-inverse': colors.background.inverse,
    
    // Text colors
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-tertiary': colors.text.tertiary,
    '--color-text-inverse': colors.text.inverse,
    '--color-text-link': colors.text.link,
    '--color-text-link-hover': colors.text.linkHover,
    
    // Border colors
    '--color-border-primary': colors.border.primary,
    '--color-border-secondary': colors.border.secondary,
    '--color-border-focus': colors.border.focus,
    '--color-border-error': colors.border.error,
    
    // Interactive colors
    '--color-primary': colors.interactive.primary,
    '--color-primary-hover': colors.interactive.primaryHover,
    '--color-primary-active': colors.interactive.primaryActive,
    '--color-primary-disabled': colors.interactive.primaryDisabled,
    
    '--color-secondary': colors.interactive.secondary,
    '--color-secondary-hover': colors.interactive.secondaryHover,
    '--color-secondary-active': colors.interactive.secondaryActive,
    
    '--color-danger': colors.interactive.danger,
    '--color-danger-hover': colors.interactive.dangerHover,
    '--color-danger-active': colors.interactive.dangerActive,
    
    '--color-success': colors.interactive.success,
    '--color-warning': colors.interactive.warning,
    
    // Overlay colors
    '--color-overlay-backdrop': colors.overlay.backdrop,
    '--color-overlay-tooltip': colors.overlay.tooltip,
    '--color-overlay-popover': colors.overlay.popover,
  } as const;
};

// Theme utility functions
export const getTheme = (name: ThemeName): Theme => {
  return themes[name];
};

export const getThemeColors = (name: ThemeName) => {
  return themes[name].colors;
};

// CSS variable utilities for components
export const cssVar = (name: string) => `var(--${name})`;

// Component-specific theme utilities
export const getButtonColors = (variant: 'primary' | 'secondary' | 'danger', theme: Theme) => {
  const { colors } = theme;
  
  switch (variant) {
    case 'primary':
      return {
        background: colors.interactive.primary,
        backgroundHover: colors.interactive.primaryHover,
        backgroundActive: colors.interactive.primaryActive,
        text: colors.text.inverse,
      };
    case 'secondary':
      return {
        background: colors.interactive.secondary,
        backgroundHover: colors.interactive.secondaryHover,
        backgroundActive: colors.interactive.secondaryActive,
        text: colors.text.primary,
      };
    case 'danger':
      return {
        background: colors.interactive.danger,
        backgroundHover: colors.interactive.dangerHover,
        backgroundActive: colors.interactive.dangerActive,
        text: colors.text.inverse,
      };
    default:
      return {
        background: colors.interactive.primary,
        backgroundHover: colors.interactive.primaryHover,
        backgroundActive: colors.interactive.primaryActive,
        text: colors.text.inverse,
      };
  }
};