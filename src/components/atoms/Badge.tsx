import type { ReactNode, HTMLAttributes } from 'react';
import type { ColorVariant, ComponentSize } from '@/types';
import { cn, colorVariantClasses, transitionClasses } from '@/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant of the badge */
  variant?: ColorVariant;
  /** Size of the badge */
  size?: ComponentSize;
  /** Whether the badge has a dot indicator */
  dot?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Badge content */
  children?: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const badgeSizeClasses: Record<ComponentSize, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1 text-sm',
  xl: 'px-4 py-1.5 text-base',
};

const dotSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
  xl: 'w-3 h-3',
};

export const Badge = ({
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
  children,
  'data-test-id': testId,
  ...props
}: BadgeProps) => {
  const baseClasses = cn(
    'inline-flex items-center font-medium rounded-full border',
    transitionClasses
  );

  const variantClasses = colorVariantClasses[variant];
  const sizeClasses = badgeSizeClasses[size];

  const badgeClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  if (dot) {
    const dotClasses = cn(
      'rounded-full',
      dotSizeClasses[size],
      children && 'mr-1.5'
    );

    const dotColorClasses = variant === 'primary' ? 'bg-blue-600' :
      variant === 'secondary' ? 'bg-gray-600' :
      variant === 'danger' ? 'bg-red-600' :
      variant === 'warning' ? 'bg-yellow-600' :
      variant === 'success' ? 'bg-green-600' :
      'bg-gray-600';

    return (
      <span
        className={badgeClasses}
        data-test-id={testId}
        {...props}
      >
        <span className={cn(dotClasses, dotColorClasses)} />
        {children}
      </span>
    );
  }

  return (
    <span
      className={badgeClasses}
      data-test-id={testId}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';