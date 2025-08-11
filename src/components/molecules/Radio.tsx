import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface RadioOption {
  /** The value of the radio option */
  value: string;
  /** The display label */
  label: ReactNode;
  /** Optional description */
  description?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the radio buttons */
  size?: ComponentSize;
  /** Label text for the radio group */
  label?: ReactNode;
  /** Array of radio options */
  options?: RadioOption[];
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
  /** Whether the radio group is in an error state */
  error?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for individual radio inputs */
  inputClassName?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

export interface SingleRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the radio button */
  size?: ComponentSize;
  /** Label text for this radio button */
  label?: ReactNode;
  /** Description text below the label */
  description?: string;
  /** Whether the radio is in an error state */
  error?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the radio input */
  inputClassName?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const radioSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

const dotSizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
};

const labelSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

// Single Radio Component
export const RadioButton = forwardRef<HTMLInputElement, SingleRadioProps>(({
  size = 'md',
  label,
  description,
  error = false,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  'data-test-id': testId,
  id,
  ...props
}, ref) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = cn(
    'flex items-start gap-3',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const radioWrapperClasses = cn(
    'relative flex items-center justify-center',
    radioSizeClasses[size],
    'flex-shrink-0 mt-0.5'
  );

  const radioClasses = cn(
    'absolute inset-0 w-full h-full',
    'border-2 rounded-full',
    'bg-white cursor-pointer appearance-none',
    transitionClasses,
    focusRingClasses,
    'disabled:cursor-not-allowed disabled:bg-gray-50',
    // Unchecked state
    error 
      ? 'border-red-300 hover:border-red-400'
      : 'border-gray-300 hover:border-gray-400',
    // Checked state
    'checked:border-blue-600 checked:hover:border-blue-700',
    inputClassName
  );

  const dotClasses = cn(
    'absolute inset-0 m-auto rounded-full bg-blue-600',
    'opacity-0 transition-opacity pointer-events-none',
    'peer-checked:opacity-100',
    dotSizeClasses[size]
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

  return (
    <div className={containerClasses} data-test-id={testId}>
      <div className={radioWrapperClasses}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={cn(radioClasses, 'peer')}
          disabled={disabled}
          {...props}
        />
        <div className={dotClasses} />
      </div>

      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label
              htmlFor={radioId}
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

RadioButton.displayName = 'RadioButton';

// Radio Group Component
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  size = 'md',
  label,
  options = [],
  orientation = 'vertical',
  error = false,
  className,
  inputClassName,
  name,
  value,
  onChange,
  'data-test-id': testId,
  ...props
}, ref) => {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = cn(
    'space-y-2',
    className
  );

  const optionsContainerClasses = cn(
    'flex gap-4',
    orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
  );

  const groupLabelClasses = cn(
    'block font-medium text-gray-900 mb-3',
    labelSizeClasses[size]
  );

  return (
    <fieldset className={containerClasses} data-test-id={testId}>
      {label && (
        <legend className={groupLabelClasses}>
          {label}
        </legend>
      )}
      
      <div className={optionsContainerClasses} role="radiogroup" aria-labelledby={label ? groupId : undefined}>
        {options.map((option, index) => (
          <RadioButton
            key={option.value}
            ref={index === 0 ? ref : undefined}
            size={size}
            label={option.label}
            description={option.description}
            error={error}
            inputClassName={inputClassName}
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={onChange}
            {...props}
          />
        ))}
      </div>
    </fieldset>
  );
});

Radio.displayName = 'Radio';