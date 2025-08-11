import type { ComponentSize, ColorVariant, ButtonVariant } from '@/types';

/**
 * Size utility classes for components
 */
export const sizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
  xl: 'text-xl px-8 py-4',
};

/**
 * Button variant utility classes
 */
export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-transparent',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
  outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300',
};

/**
 * Color variant utility classes
 */
export const colorVariantClasses: Record<ColorVariant, string> = {
  primary: 'text-blue-600 bg-blue-50 border-blue-200',
  secondary: 'text-gray-600 bg-gray-50 border-gray-200',
  danger: 'text-red-600 bg-red-50 border-red-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  success: 'text-green-600 bg-green-50 border-green-200',
  neutral: 'text-gray-600 bg-gray-50 border-gray-200',
};

/**
 * Focus ring utility classes
 */
export const focusRingClasses = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

/**
 * Disabled state utility classes
 */
export const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * Transition utility classes
 */
export const transitionClasses = 'transition-all duration-200 ease-in-out';

/**
 * Rounded corner utility classes
 */
export const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

/**
 * Shadow utility classes
 */
export const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

/**
 * Spacing utility classes
 */
export const spacingClasses = {
  none: '0',
  xs: '0.5',
  sm: '1',
  md: '1.5',
  lg: '2',
  xl: '3',
  '2xl': '4',
  '3xl': '6',
};