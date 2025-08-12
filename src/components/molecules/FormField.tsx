import type { ReactNode } from 'react';
import { Label, Input, Text } from '../atoms';
import type { InputProps } from '@/components';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface FormFieldProps extends Omit<InputProps, 'error'> {
  /** Label text for the field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Size of the form field components */
  size?: ComponentSize;
  /** Layout direction */
  layout?: 'vertical' | 'horizontal';
  /** Custom label content */
  labelContent?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

export const FormField = ({
  label,
  required = false,
  error,
  helperText,
  size = 'md',
  layout = 'vertical',
  labelContent,
  className,
  'data-test-id': testId,
  id,
  ...inputProps
}: FormFieldProps) => {
  const fieldId = id || `field-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helperTextId = helperText ? `${fieldId}-helper` : undefined;

  const containerClasses = cn(
    'space-y-1',
    layout === 'horizontal' && 'flex items-center space-y-0 space-x-4',
    className
  );

  const labelClasses = cn(
    layout === 'horizontal' && 'min-w-0 flex-shrink-0'
  );

  const inputContainerClasses = cn(
    layout === 'horizontal' && 'flex-1'
  );

  const renderLabel = () => {
    if (!label && !labelContent) return null;

    return (
      <div className={labelClasses}>
        <Label 
          htmlFor={fieldId} 
          required={required}
          size={size}
        >
          {labelContent || label}
        </Label>
      </div>
    );
  };

  const renderInput = () => (
    <div className={inputContainerClasses}>
      <Input
        id={fieldId}
        size={size}
        error={!!error}
        aria-invalid={!!error}
        aria-describedby={cn(errorId, helperTextId).trim() || undefined}
        {...inputProps}
      />
    </div>
  );

  const renderMessages = () => {
    if (!error && !helperText) return null;

    return (
      <div className="space-y-1">
        {error && (
          <Text
            id={errorId}
            variant="caption"
            color="danger"
            role="alert"
          >
            {error}
          </Text>
        )}
        {helperText && !error && (
          <Text
            id={helperTextId}
            variant="caption"
            color="muted"
          >
            {helperText}
          </Text>
        )}
      </div>
    );
  };

  if (layout === 'horizontal') {
    return (
      <div className={containerClasses} data-test-id={testId}>
        {renderLabel()}
        <div className="flex-1 space-y-1">
          {renderInput()}
          {renderMessages()}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderLabel()}
      {renderInput()}
      {renderMessages()}
    </div>
  );
};

FormField.displayName = 'FormField';