import type { HTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape of the skeleton */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** Whether to animate the skeleton */
  animated?: boolean;
  /** Number of lines for text skeleton */
  lines?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const skeletonVariantClasses = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: '',
  rounded: 'rounded-lg',
};

const defaultHeights = {
  text: '1rem',
  circular: '2.5rem',
  rectangular: '2.5rem',
  rounded: '2.5rem',
};

const defaultWidths = {
  text: '100%',
  circular: '2.5rem',
  rectangular: '100%',
  rounded: '100%',
};

export const Skeleton = ({
  width,
  height,
  variant = 'text',
  animated = true,
  lines = 1,
  className,
  'data-test-id': testId,
  style,
  ...props
}: SkeletonProps) => {
  const baseClasses = cn(
    'bg-gray-200',
    animated && 'animate-pulse',
    skeletonVariantClasses[variant]
  );

  const finalWidth = width || defaultWidths[variant];
  const finalHeight = height || defaultHeights[variant];

  const skeletonStyle = {
    width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
    height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
    ...style,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" data-test-id={testId} {...props}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              index === lines - 1 && 'w-3/4', // Last line is shorter
              className
            )}
            style={{
              height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, className)}
      style={skeletonStyle}
      data-test-id={testId}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';