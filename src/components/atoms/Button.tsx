import type { ReactNode, ButtonHTMLAttributes } from 'react';
import type { ButtonVariant, ComponentSize } from '@/types';
import { cn, buttonVariantClasses, sizeClasses, focusRingClasses, disabledClasses, transitionClasses } from '@/utils';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ComponentSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Icon to display before the text */
  leftIcon?: ReactNode;
  /** Icon to display after the text */
  rightIcon?: ReactNode;
  /** Whether this is an icon-only button */
  iconOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Button content */
  children?: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const iconSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

const iconOnlyPadding: Record<ComponentSize, string> = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
  xl: 'p-4',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  className,
  children,
  'data-test-id': testId,
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-md border',
    'hover:opacity-90 active:scale-95',
    transitionClasses,
    focusRingClasses,
    disabledClasses
  );

  const variantClasses = buttonVariantClasses[variant];
  const paddingClasses = iconOnly ? iconOnlyPadding[size] : sizeClasses[size];
  const widthClasses = fullWidth ? 'w-full' : '';

  const buttonClasses = cn(
    baseClasses,
    variantClasses,
    paddingClasses,
    widthClasses,
    className
  );

  const iconClasses = iconSizeClasses[size];

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      data-test-id={testId}
      {...props}
    >
      {leftIcon && (
        <span className={cn(iconClasses, children && !iconOnly && 'mr-2')}>
          {leftIcon}
        </span>
      )}
      {!iconOnly && children}
      {rightIcon && (
        <span className={cn(iconClasses, children && !iconOnly && 'ml-2')}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

Button.displayName = 'Button';