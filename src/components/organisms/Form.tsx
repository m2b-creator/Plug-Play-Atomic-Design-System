'use client';

import type { ReactNode, FormHTMLAttributes } from 'react';
import { useState, useRef, createContext, useContext } from 'react';
import { Button, Text, Heading, Divider } from '../atoms';
import { FormField } from '../molecules';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

// Form validation types
export type ValidationRule = {
  required?: boolean | string;
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  min?: { value: number; message?: string };
  max?: { value: number; message?: string };
  custom?: (value: unknown) => string | boolean;
};

export type FieldError = {
  type: string;
  message: string;
};

export type FormData = Record<string, unknown>;
export type FormErrors = Record<string, FieldError>;

// Form context
interface FormContextValue {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  touched: Record<string, boolean>;
  updateField: (name: string, value: unknown) => void;
  setFieldError: (name: string, error: FieldError | null) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value: unknown, rules?: ValidationRule) => FieldError | null;
  size: ComponentSize;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

// Multi-step form types
export interface FormStep {
  /** Step identifier */
  id: string;
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Step content */
  content: ReactNode;
  /** Whether step is optional */
  optional?: boolean;
  /** Step validation rules */
  validate?: () => boolean | Promise<boolean>;
}

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form fields initial data */
  defaultValues?: FormData;
  /** Form submission handler */
  onSubmit: (data: FormData) => void | Promise<void>;
  /** Form validation handler */
  onValidate?: (data: FormData) => FormErrors | Promise<FormErrors>;
  /** Multi-step configuration */
  steps?: FormStep[];
  /** Current step index (for controlled multi-step) */
  currentStep?: number;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Form size variant */
  size?: ComponentSize;
  /** Whether form is loading/submitting */
  loading?: boolean;
  /** Form layout */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Whether to show step navigation */
  showStepNavigation?: boolean;
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Custom submit button */
  submitButton?: ReactNode;
  /** Custom reset button */
  resetButton?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

export const Form = ({
  defaultValues = {},
  onSubmit,
  onValidate,
  steps,
  currentStep,
  onStepChange,
  size = 'md',
  layout = 'vertical',
  showStepNavigation = true,
  submitButton,
  resetButton,
  footer,
  className,
  children,
  'data-test-id': testId,
  ...formProps
}: FormProps) => {
  const [formData, setFormData] = useState<FormData>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [internalCurrentStep, setInternalCurrentStep] = useState(0);
  
  const formRef = useRef<HTMLFormElement>(null);
  const isMultiStep = steps && steps.length > 0;
  
  // Use controlled or uncontrolled step state
  const activeStepIndex = currentStep !== undefined ? currentStep : internalCurrentStep;
  const setActiveStep = (stepIndex: number) => {
    if (currentStep === undefined) {
      setInternalCurrentStep(stepIndex);
    }
    onStepChange?.(stepIndex);
  };

  const updateField = (name: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when value changes
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const setFieldError = (name: string, error: FieldError | null) => {
    setErrors(prev => {
      if (error) {
        return { ...prev, [name]: error };
      } else {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
    });
  };

  const setFieldTouched = (name: string, touched: boolean) => {
    setTouched(prev => ({ ...prev, [name]: touched }));
  };

  const validateField = (name: string, value: unknown, rules?: ValidationRule): FieldError | null => {
    if (!rules) return null;

    // Required validation
    if (rules.required) {
      const isEmpty = value === undefined || value === null || value === '' || 
                     (Array.isArray(value) && value.length === 0);
      
      if (isEmpty) {
        const message = typeof rules.required === 'string' 
          ? rules.required 
          : `${name} is required`;
        return { type: 'required', message };
      }
    }

    // Skip other validations if value is empty and not required
    if (value === undefined || value === null || value === '') {
      return null;
    }

    // String length validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength.value) {
        return {
          type: 'minLength',
          message: rules.minLength.message || `${name} must be at least ${rules.minLength.value} characters`
        };
      }

      if (rules.maxLength && value.length > rules.maxLength.value) {
        return {
          type: 'maxLength',
          message: rules.maxLength.message || `${name} must be no more than ${rules.maxLength.value} characters`
        };
      }

      if (rules.pattern && !rules.pattern.value.test(value)) {
        return {
          type: 'pattern',
          message: rules.pattern.message || `${name} format is invalid`
        };
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rules.min && value < rules.min.value) {
        return {
          type: 'min',
          message: rules.min.message || `${name} must be at least ${rules.min.value}`
        };
      }

      if (rules.max && value > rules.max.value) {
        return {
          type: 'max',
          message: rules.max.message || `${name} must be no more than ${rules.max.value}`
        };
      }
    }

    // Custom validation
    if (rules.custom) {
      const result = rules.custom(value);
      if (typeof result === 'string') {
        return { type: 'custom', message: result };
      } else if (result === false) {
        return { type: 'custom', message: `${name} is invalid` };
      }
    }

    return null;
  };

  const validateForm = async (): Promise<boolean> => {
    if (onValidate) {
      const validationErrors = await onValidate(formData);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    }

    // If no custom validation, check if there are any field errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const isValid = await validateForm();
      if (isValid) {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(defaultValues);
    setErrors({});
    setTouched({});
    setActiveStep(0);
  };

  const canGoNext = () => {
    if (!isMultiStep) return false;
    return activeStepIndex < steps.length - 1;
  };

  const canGoPrevious = () => {
    if (!isMultiStep) return false;
    return activeStepIndex > 0;
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps!.length) {
      setActiveStep(stepIndex);
    }
  };

  const goNext = async () => {
    if (!canGoNext()) return;
    
    const currentStepData = steps![activeStepIndex];
    if (currentStepData.validate) {
      const isValid = await currentStepData.validate();
      if (!isValid) return;
    }
    
    goToStep(activeStepIndex + 1);
  };

  const goPrevious = () => {
    if (canGoPrevious()) {
      goToStep(activeStepIndex - 1);
    }
  };

  const contextValue: FormContextValue = {
    formData,
    errors,
    isSubmitting,
    touched,
    updateField,
    setFieldError,
    setFieldTouched,
    validateField,
    size,
  };

  const renderStepNavigation = () => {
    if (!isMultiStep || !showStepNavigation) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4 mb-6">
          {steps!.map((step, index) => {
            const isActive = index === activeStepIndex;
            const isCompleted = index < activeStepIndex;
            const isClickable = index <= activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isClickable && goToStep(index)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                  isActive && 'bg-blue-100 text-blue-700',
                  isCompleted && 'bg-green-100 text-green-700',
                  !isActive && !isCompleted && 'text-gray-500',
                  isClickable && 'hover:bg-gray-50 cursor-pointer',
                  !isClickable && 'cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                  isActive && 'bg-blue-600 text-white',
                  isCompleted && 'bg-green-600 text-white',
                  !isActive && !isCompleted && 'bg-gray-300 text-gray-600'
                )}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <Text className={cn(
                  'font-medium',
                  isActive && 'text-blue-700',
                  isCompleted && 'text-green-700'
                )}>
                  {step.title}
                </Text>
              </button>
            );
          })}
        </div>
        
        {/* Current step info */}
        <div className="text-center">
          <Heading variant="h5" className="mb-2">
            {steps![activeStepIndex].title}
          </Heading>
          {steps![activeStepIndex].description && (
            <Text className="text-gray-600">
              {steps![activeStepIndex].description}
            </Text>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (!isMultiStep) return children;
    return steps![activeStepIndex].content;
  };

  const renderFormActions = () => {
    if (isMultiStep) {
      return (
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={goPrevious}
            disabled={!canGoPrevious() || isSubmitting}
          >
            Previous
          </Button>
          
          <div className="flex space-x-3">
            {canGoNext() ? (
              <Button
                type="button"
                variant="primary"
                onClick={goNext}
                disabled={isSubmitting}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        {resetButton || (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        )}
        {submitButton || (
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        )}
      </div>
    );
  };

  const formClasses = cn(
    'w-full',
    layout === 'horizontal' && 'space-y-6',
    layout === 'vertical' && 'space-y-4',
    layout === 'inline' && 'flex flex-wrap items-end gap-4',
    className
  );

  return (
    <FormContext.Provider value={contextValue}>
      <form
        ref={formRef}
        className={formClasses}
        onSubmit={handleSubmit}
        data-test-id={testId}
        {...formProps}
      >
        {renderStepNavigation()}
        
        <div className={cn(
          layout === 'vertical' && 'space-y-4',
          layout === 'horizontal' && 'space-y-6',
          transitionClasses
        )}>
          {renderStepContent()}
        </div>

        {renderFormActions()}
        
        {footer && (
          <>
            <Divider className="my-6" />
            {footer}
          </>
        )}
      </form>
    </FormContext.Provider>
  );
};

Form.displayName = 'Form';

// Enhanced FormField component that integrates with Form context
export interface FormContextFieldProps {
  /** Field name */
  name: string;
  /** Field label */
  label?: string;
  /** Field placeholder */
  placeholder?: string;
  /** Field type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select';
  /** Whether field is required */
  required?: boolean;
  /** Field validation rules */
  rules?: ValidationRule;
  /** Select options */
  options?: { label: string; value: unknown }[];
  /** Additional props */
  [key: string]: unknown;
}

export const FormFieldWithContext = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  rules,
  options,
  ...props
}: FormContextFieldProps) => {
  const {
    formData,
    errors,
    touched,
    updateField,
    setFieldTouched,
    validateField,
    size
  } = useFormContext();

  const value = String(formData[name] || '');
  const error = touched[name] ? errors[name] : undefined;

  const combinedRules: ValidationRule = {
    ...rules,
    required: required || rules?.required
  };

  const handleChange = (newValue: unknown) => {
    updateField(name, newValue);
    
    // Validate on change if enabled
    const fieldError = validateField(name, newValue, combinedRules);
    if (fieldError) {
      setFieldTouched(name, true);
    }
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
    validateField(name, value, combinedRules);
    // Error will be shown via the errors state
  };

  if (type === 'select') {
    return (
      <FormField
        label={label}
        error={error?.message}
        required={required}
        size={size}
        {...props}
      >
        <select
          name={name}
          value={String(value)}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  }

  if (type === 'textarea') {
    return (
      <FormField
        label={label}
        error={error?.message}
        required={required}
        size={size}
        {...props}
      >
        <textarea
          name={name}
          value={String(value)}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          {...props}
        />
      </FormField>
    );
  }

  return (
    <FormField
      label={label}
      error={error?.message}
      required={required}
      size={size}
      {...props}
    >
      <input
        type={type}
        name={name}
        value={String(value)}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </FormField>
  );
};