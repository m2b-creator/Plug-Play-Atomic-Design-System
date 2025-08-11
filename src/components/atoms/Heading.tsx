import type { ReactNode, HTMLAttributes, ElementType } from 'react';
import type { TypographyVariant } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual variant (can differ from semantic level) */
  variant?: TypographyVariant;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Text color */
  color?: 'inherit' | 'primary' | 'secondary' | 'muted' | 'danger';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Whether text should truncate */
  truncate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Heading content */
  children: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const headingVariantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold leading-tight',
  h2: 'text-3xl font-bold leading-tight',
  h3: 'text-2xl font-semibold leading-snug',
  h4: 'text-xl font-semibold leading-snug',
  h5: 'text-lg font-medium leading-normal',
  h6: 'text-base font-medium leading-normal',
  body: 'text-base font-normal leading-normal',
  caption: 'text-sm font-normal leading-normal',
  overline: 'text-xs font-medium uppercase tracking-wide leading-normal',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const colorClasses = {
  inherit: 'text-inherit',
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-500',
  danger: 'text-red-600',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Heading = ({
  as = 'h2',
  variant,
  align = 'left',
  color = 'primary',
  weight,
  truncate = false,
  className,
  children,
  'data-test-id': testId,
  ...props
}: HeadingProps) => {
  const Component = as as ElementType;
  
  // Use semantic level as visual variant by default
  const displayVariant = variant || as;

  const baseClasses = cn(
    'block',
    transitionClasses
  );

  const variantClasses = headingVariantClasses[displayVariant];
  const alignmentClasses = alignClasses[align];
  const textColorClasses = colorClasses[color];
  const fontWeightClasses = weight ? weightClasses[weight] : '';
  const truncateClasses = truncate ? 'truncate' : '';

  const headingClasses = cn(
    baseClasses,
    variantClasses,
    alignmentClasses,
    textColorClasses,
    fontWeightClasses,
    truncateClasses,
    className
  );

  return (
    <Component
      className={headingClasses}
      data-test-id={testId}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = 'Heading';