import type { HTMLAttributes } from 'react';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: ComponentSize;
  /** Color of the spinner */
  color?: 'primary' | 'secondary' | 'white';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const spinnerSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

const spinnerColorClasses = {
  primary: 'border-blue-600',
  secondary: 'border-gray-600',
  white: 'border-white',
};

export const Spinner = ({
  size = 'md',
  color = 'primary',
  className,
  'data-test-id': testId,
  ...props
}: SpinnerProps) => {
  const baseClasses = cn(
    'inline-block animate-spin rounded-full border-2 border-solid border-r-transparent',
    'motion-reduce:animate-[spin_1.5s_linear_infinite]'
  );

  const sizeClasses = spinnerSizeClasses[size];
  const colorClasses = spinnerColorClasses[color];

  const spinnerClasses = cn(
    baseClasses,
    sizeClasses,
    colorClasses,
    className
  );

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Loading"
      data-test-id={testId}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.displayName = 'Spinner';