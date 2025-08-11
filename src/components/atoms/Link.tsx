import type { ReactNode, AnchorHTMLAttributes } from 'react';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses, focusRingClasses } from '@/utils';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link size */
  size?: ComponentSize;
  /** Link variant */
  variant?: 'default' | 'subtle' | 'button';
  /** Link color */
  color?: 'primary' | 'secondary' | 'danger' | 'inherit';
  /** Whether link should be underlined */
  underline?: 'none' | 'hover' | 'always';
  /** Whether link opens in new tab */
  external?: boolean;
  /** Whether link is disabled */
  disabled?: boolean;
  /** Icon to display before the text */
  leftIcon?: ReactNode;
  /** Icon to display after the text */
  rightIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Link content */
  children: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const linkSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const linkColorClasses = {
  primary: 'text-blue-600 hover:text-blue-800',
  secondary: 'text-gray-600 hover:text-gray-800',
  danger: 'text-red-600 hover:text-red-800',
  inherit: 'text-inherit hover:opacity-80',
};

const linkVariantClasses = {
  default: '',
  subtle: 'text-gray-700 hover:text-gray-900',
  button: 'inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700',
};

const underlineClasses = {
  none: 'no-underline',
  hover: 'no-underline hover:underline',
  always: 'underline',
};

const iconSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export const Link = ({
  size = 'md',
  variant = 'default',
  color = 'primary',
  underline = 'hover',
  external = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  'data-test-id': testId,
  href,
  target,
  rel,
  ...props
}: LinkProps) => {
  const baseClasses = cn(
    'inline-flex items-center gap-1 font-medium',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    transitionClasses,
    focusRingClasses
  );

  const sizeClasses = linkSizeClasses[size];
  const colorVariantClasses = variant === 'button' ? '' : linkColorClasses[color];
  const variantClasses = linkVariantClasses[variant];
  const underlineVariantClasses = variant === 'button' ? '' : underlineClasses[underline];

  const linkClasses = cn(
    baseClasses,
    sizeClasses,
    colorVariantClasses,
    variantClasses,
    underlineVariantClasses,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const iconClasses = iconSizeClasses[size];

  // Handle external links
  const linkTarget = external ? '_blank' : target;
  const linkRel = external ? 'noopener noreferrer' : rel;

  return (
    <a
      className={linkClasses}
      href={disabled ? undefined : href}
      target={linkTarget}
      rel={linkRel}
      aria-disabled={disabled}
      data-test-id={testId}
      {...props}
    >
      {leftIcon && (
        <span className={iconClasses}>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className={iconClasses}>
          {rightIcon}
        </span>
      )}
      {external && !rightIcon && (
        <svg
          className={iconClasses}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
};

Link.displayName = 'Link';