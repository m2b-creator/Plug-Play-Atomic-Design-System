import type { ReactNode, HTMLAttributes } from 'react';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Size/thickness of the divider */
  size?: ComponentSize;
  /** Color variant of the divider */
  variant?: 'default' | 'light' | 'strong';
  /** Whether the divider has decorative content */
  decorative?: boolean;
  /** Content to display in the center of the divider */
  label?: ReactNode;
  /** Position of the label */
  labelPosition?: 'left' | 'center' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const dividerSizeClasses: Record<ComponentSize, Record<'horizontal' | 'vertical', string>> = {
  xs: {
    horizontal: 'border-t',
    vertical: 'border-l w-px h-4',
  },
  sm: {
    horizontal: 'border-t',
    vertical: 'border-l w-px h-6',
  },
  md: {
    horizontal: 'border-t',
    vertical: 'border-l w-px h-8',
  },
  lg: {
    horizontal: 'border-t-2',
    vertical: 'border-l-2 w-0.5 h-12',
  },
  xl: {
    horizontal: 'border-t-4',
    vertical: 'border-l-4 w-1 h-16',
  },
};

const dividerVariantClasses = {
  default: 'border-gray-300',
  light: 'border-gray-200',
  strong: 'border-gray-400',
};

const labelSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs px-2',
  sm: 'text-xs px-3',
  md: 'text-sm px-4',
  lg: 'text-base px-5',
  xl: 'text-lg px-6',
};

export const Divider = ({
  orientation = 'horizontal',
  size = 'sm',
  variant = 'default',
  decorative = true,
  label,
  labelPosition = 'center',
  className,
  'data-test-id': testId,
  ...props
}: DividerProps) => {
  const baseClasses = dividerSizeClasses[size][orientation];
  const variantClasses = dividerVariantClasses[variant];

  if (label && orientation === 'horizontal') {
    const containerClasses = cn(
      'relative flex items-center',
      className
    );

    const lineClasses = cn(
      'flex-1',
      baseClasses,
      variantClasses
    );

    const labelClasses = cn(
      'bg-white text-gray-500 font-medium',
      labelSizeClasses[size]
    );

    const justifyClasses = labelPosition === 'left' ? 'justify-start' : 
                          labelPosition === 'right' ? 'justify-end' : 
                          'justify-center';

    return (
      <div
        className={cn(containerClasses, justifyClasses)}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        data-test-id={testId}
        {...props}
      >
        {labelPosition !== 'right' && <div className={lineClasses} />}
        <span className={labelClasses}>{label}</span>
        {labelPosition !== 'left' && <div className={lineClasses} />}
      </div>
    );
  }

  const dividerClasses = cn(
    baseClasses,
    variantClasses,
    orientation === 'horizontal' ? 'w-full' : 'inline-block',
    className
  );

  return (
    <div
      className={dividerClasses}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      data-test-id={testId}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';