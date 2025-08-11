import type { HTMLAttributes } from 'react';
import type { ComponentSize, Spacing } from '@/types';
import { cn } from '@/utils';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spacer */
  size?: ComponentSize | Spacing;
  /** Direction of the spacer */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Custom width (overrides size for horizontal spacing) */
  width?: string | number;
  /** Custom height (overrides size for vertical spacing) */
  height?: string | number;
  /** Whether the spacer should be flexible */
  flexible?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const spacerSizeClasses: Record<ComponentSize | Spacing, Record<'horizontal' | 'vertical', string>> = {
  // ComponentSize values
  xs: {
    horizontal: 'w-1',
    vertical: 'h-1',
  },
  sm: {
    horizontal: 'w-2',
    vertical: 'h-2',
  },
  md: {
    horizontal: 'w-4',
    vertical: 'h-4',
  },
  lg: {
    horizontal: 'w-6',
    vertical: 'h-6',
  },
  xl: {
    horizontal: 'w-8',
    vertical: 'h-8',
  },
  // Spacing values
  none: {
    horizontal: 'w-0',
    vertical: 'h-0',
  },
  '2xl': {
    horizontal: 'w-16',
    vertical: 'h-16',
  },
  '3xl': {
    horizontal: 'w-24',
    vertical: 'h-24',
  },
};

export const Spacer = ({
  size = 'md',
  direction = 'vertical',
  width,
  height,
  flexible = false,
  className,
  'data-test-id': testId,
  style,
  ...props
}: SpacerProps) => {
  const baseClasses = cn(
    'block',
    flexible && (direction === 'horizontal' || direction === 'both') && 'flex-1',
    flexible && (direction === 'vertical' || direction === 'both') && 'flex-grow'
  );

  let spacingClasses = '';
  
  if (direction === 'horizontal') {
    spacingClasses = spacerSizeClasses[size]?.horizontal || '';
  } else if (direction === 'vertical') {
    spacingClasses = spacerSizeClasses[size]?.vertical || '';
  } else if (direction === 'both') {
    const horizontalClass = spacerSizeClasses[size]?.horizontal || '';
    const verticalClass = spacerSizeClasses[size]?.vertical || '';
    spacingClasses = cn(horizontalClass, verticalClass);
  }

  const spacerClasses = cn(
    baseClasses,
    !flexible && spacingClasses,
    className
  );

  const customStyle = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style,
  };

  return (
    <div
      className={spacerClasses}
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
      aria-hidden="true"
      data-test-id={testId}
      {...props}
    />
  );
};

Spacer.displayName = 'Spacer';