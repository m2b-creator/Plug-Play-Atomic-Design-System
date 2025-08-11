import type { ReactNode } from 'react';

/**
 * Universal component sizes used across the design system
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base props that all components in the design system should accept
 */
export interface BaseComponentProps {
  /** Additional CSS classes to apply to the component */
  className?: string;
  /** Child elements to render */
  children?: ReactNode;
  /** Visual variant of the component */
  variant?: string;
  /** Size variant of the component */
  size?: ComponentSize;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

/**
 * Common color variants used across components
 */
export type ColorVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'neutral';

/**
 * Button-specific variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';

/**
 * Input field types
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

/**
 * Typography variants
 */
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';

/**
 * Common spacing values used in the design system
 */
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Position values for components like tooltips, dropdowns
 */
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * Animation duration options
 */
export type AnimationDuration = 'none' | 'fast' | 'normal' | 'slow';

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';