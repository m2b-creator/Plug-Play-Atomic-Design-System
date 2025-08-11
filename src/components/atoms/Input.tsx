import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef as reactForwardRef } from 'react';
import type { ComponentSize, InputType } from '@/types';
import { cn, focusRingClasses, disabledClasses, transitionClasses } from '@/utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Input field type */
  type?: InputType;
  /** Size of the input */
  size?: ComponentSize;
  /** Whether the input has an error state */
  error?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Icon to display before the input */
  leftIcon?: ReactNode;
  /** Icon to display after the input */
  rightIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const inputSizeClasses: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
};

const iconSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export const Input = reactForwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  size = 'md',
  error = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  'data-test-id': testId,
  ...props
}, ref) => {
  const baseClasses = cn(
    'block w-full rounded-md border bg-white shadow-sm',
    'placeholder:text-gray-400',
    transitionClasses,
    focusRingClasses,
    disabledClasses,
    'disabled:bg-gray-50 disabled:text-gray-500'
  );

  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  const paddingClasses = cn(
    inputSizeClasses[size],
    leftIcon && 'pl-10',
    rightIcon && 'pr-10'
  );

  const inputClasses = cn(
    baseClasses,
    stateClasses,
    paddingClasses,
    className
  );

  const iconClasses = cn(
    'absolute top-1/2 transform -translate-y-1/2 text-gray-400',
    iconSizeClasses[size]
  );

  if (leftIcon || rightIcon) {
    return (
      <div className="relative">
        {leftIcon && (
          <div className={cn(iconClasses, 'left-3')}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          disabled={disabled}
          data-test-id={testId}
          {...props}
        />
        {rightIcon && (
          <div className={cn(iconClasses, 'right-3')}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      className={inputClasses}
      disabled={disabled}
      data-test-id={testId}
      {...props}
    />
  );
});

Input.displayName = 'Input';