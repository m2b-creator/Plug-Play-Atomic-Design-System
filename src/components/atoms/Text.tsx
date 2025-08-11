import type { ReactNode, HTMLAttributes, ElementType } from 'react';
import type { TypographyVariant, ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
  /** Typography variant */
  variant?: TypographyVariant;
  /** Text size */
  size?: ComponentSize;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Text color */
  color?: 'inherit' | 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Whether text should truncate */
  truncate?: boolean;
  /** Line height */
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /** Additional CSS classes */
  className?: string;
  /** Text content */
  children: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const textVariantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body: 'text-base font-normal',
  caption: 'text-sm font-normal',
  overline: 'text-xs font-medium uppercase tracking-wide',
};

const sizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const colorClasses = {
  inherit: 'text-inherit',
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-500',
  danger: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const leadingClasses = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

export const Text = ({
  as = 'p',
  variant = 'body',
  size,
  align = 'left',
  color = 'primary',
  weight,
  truncate = false,
  leading = 'normal',
  className,
  children,
  'data-test-id': testId,
  ...props
}: TextProps) => {
  const Component = as as ElementType;

  const baseClasses = cn(
    'block',
    transitionClasses
  );

  const variantClasses = variant ? textVariantClasses[variant] : '';
  const sizeVariantClasses = size ? sizeClasses[size] : '';
  const alignmentClasses = alignClasses[align];
  const textColorClasses = colorClasses[color];
  const fontWeightClasses = weight ? weightClasses[weight] : '';
  const leadingVariantClasses = leadingClasses[leading];
  const truncateClasses = truncate ? 'truncate' : '';

  const textClasses = cn(
    baseClasses,
    // Size takes precedence over variant for font size
    size ? sizeVariantClasses : variantClasses,
    alignmentClasses,
    textColorClasses,
    fontWeightClasses,
    leadingVariantClasses,
    truncateClasses,
    className
  );

  return (
    <Component
      className={textClasses}
      data-test-id={testId}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';