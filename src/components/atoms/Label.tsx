import type { LabelHTMLAttributes, ReactNode } from 'react';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Size of the label text */
  size?: ComponentSize;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field has an error state */
  error?: boolean;
  /** Whether the label is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Label content */
  children: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const labelSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const Label = ({
  size = 'sm',
  required = false,
  error = false,
  disabled = false,
  className,
  children,
  'data-test-id': testId,
  ...props
}: LabelProps) => {
  const baseClasses = cn(
    'block font-medium leading-6',
    transitionClasses
  );

  const sizeClasses = labelSizeClasses[size];
  
  const stateClasses = cn(
    error ? 'text-red-700' : 'text-gray-900',
    disabled && 'text-gray-400 cursor-not-allowed'
  );

  const labelClasses = cn(
    baseClasses,
    sizeClasses,
    stateClasses,
    className
  );

  return (
    <label
      className={labelClasses}
      data-test-id={testId}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

Label.displayName = 'Label';