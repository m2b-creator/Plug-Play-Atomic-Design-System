import { cn } from './cn';
import type { BaseComponentProps } from '@/types';

/**
 * Generic component factory that creates components with consistent styling patterns
 */
export function createComponentFactory<T extends Record<string, unknown>>(
  baseClasses: string,
  variantMap?: Record<string, string | Record<string, string>>
) {
  return function createComponent(
    props: T & BaseComponentProps,
    additionalClasses?: string
  ): string {
    const { className, variant, size, disabled } = props;
    
    let classes = baseClasses;
    
    // Add variant classes if variant mapping exists
    if (variant && variantMap) {
      const variantClasses = variantMap[variant];
      if (typeof variantClasses === 'string') {
        classes = cn(classes, variantClasses);
      } else if (typeof variantClasses === 'object' && size && variantClasses[size]) {
        classes = cn(classes, variantClasses[size]);
      }
    }
    
    // Add disabled classes
    if (disabled) {
      classes = cn(classes, 'opacity-50 cursor-not-allowed');
    }
    
    // Merge with additional classes and custom className
    return cn(classes, additionalClasses, className);
  };
}

/**
 * Helper to create accessible props for components
 */
export function createAccessibleProps(
  props: BaseComponentProps & { 
    role?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-expanded'?: boolean;
    'aria-pressed'?: boolean;
  }
) {
  const { 'data-test-id': testId, role, ...ariaProps } = props;
  
  return {
    ...(testId && { 'data-test-id': testId }),
    ...(role && { role }),
    ...Object.entries(ariaProps).reduce((acc, [key, value]) => {
      if (key.startsWith('aria-') && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, unknown>),
  };
}