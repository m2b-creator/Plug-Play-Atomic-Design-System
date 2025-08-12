import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the checkbox */
  size?: ComponentSize;
  /** Label text */
  label?: ReactNode;
  /** Description text below the label */
  description?: string;
  /** Whether the checkbox is in an error state */
  error?: boolean;
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the checkbox input */
  inputClassName?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const checkboxSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const iconSizeClasses = {
  xs: 'w-2.5 h-2.5',
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
};

const labelSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  size = 'md',
  label,
  description,
  error = false,
  indeterminate = false,
  className,
  inputClassName,
  labelClassName,
  checked,
  disabled = false,
  'data-test-id': testId,
  id,
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  const containerClasses = cn(
    'flex items-start gap-3',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const checkboxWrapperClasses = cn(
    'relative flex items-center justify-center',
    checkboxSizeClasses[size],
    'flex-shrink-0 mt-0.5'
  );

  const checkboxClasses = cn(
    'absolute inset-0 w-full h-full',
    'border-2 rounded',
    'bg-white cursor-pointer',
    transitionClasses,
    focusRingClasses,
    'disabled:cursor-not-allowed disabled:bg-gray-50',
    // Unchecked state
    error 
      ? 'border-red-300 hover:border-red-400'
      : 'border-gray-300 hover:border-gray-400',
    // Checked state
    'checked:bg-blue-600 checked:border-blue-600 checked:hover:bg-blue-700',
    // Indeterminate state
    indeterminate && 'bg-blue-600 border-blue-600',
    inputClassName
  );

  const labelTextClasses = cn(
    'font-medium text-gray-900 cursor-pointer',
    'disabled:cursor-not-allowed',
    labelSizeClasses[size],
    labelClassName
  );

  const descriptionClasses = cn(
    'text-gray-500 mt-1',
    size === 'xs' ? 'text-xs' : 'text-sm'
  );

  const renderCheckIcon = () => {
    if (indeterminate) {
      return (
        <Icon
          name="Minus"
          className={cn(
            'text-white pointer-events-none absolute inset-0 m-auto',
            iconSizeClasses[size]
          )}
        />
      );
    }

    return (
      <Icon
        name="Check"
        className={cn(
          'text-white pointer-events-none absolute inset-0 m-auto',
          'opacity-0 transition-opacity',
          (checked || indeterminate) && 'opacity-100',
          iconSizeClasses[size]
        )}
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      <div className={checkboxWrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          checked={indeterminate ? false : checked}
          disabled={disabled}
          {...props}
        />
        {renderCheckIcon()}
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={checkboxId}
              className={labelTextClasses}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={descriptionClasses}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';