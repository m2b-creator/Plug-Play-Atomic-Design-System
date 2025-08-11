import type { HTMLAttributes } from 'react';
import type { ComponentSize, ColorVariant } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size of the progress bar */
  size?: ComponentSize;
  /** Color variant of the progress bar */
  variant?: ColorVariant;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Whether to animate the progress */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const progressSizeClasses: Record<ComponentSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
  xl: 'h-6',
};

const progressColorClasses: Record<ColorVariant, string> = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  danger: 'bg-red-600',
  warning: 'bg-yellow-600',
  success: 'bg-green-600',
  neutral: 'bg-gray-600',
};

const labelSizeClasses: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export const ProgressBar = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  animated = false,
  className,
  'data-test-id': testId,
  ...props
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const containerClasses = cn(
    'w-full bg-gray-200 rounded-full overflow-hidden',
    progressSizeClasses[size],
    className
  );

  const barClasses = cn(
    'h-full rounded-full',
    progressColorClasses[variant],
    transitionClasses,
    animated && 'animate-pulse'
  );

  const labelClasses = cn(
    'text-gray-700 font-medium',
    labelSizeClasses[size]
  );

  return (
    <div data-test-id={testId} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className={labelClasses}>
            Progress
          </span>
          <span className={cn(labelClasses, 'text-gray-500')}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={containerClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';