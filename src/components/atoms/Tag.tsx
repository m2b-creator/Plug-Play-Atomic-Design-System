import type { ReactNode, HTMLAttributes, MouseEvent } from 'react';
import type { ColorVariant, ComponentSize } from '@/types';
import { cn, colorVariantClasses, transitionClasses } from '@/utils';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant of the tag */
  variant?: ColorVariant;
  /** Size of the tag */
  size?: ComponentSize;
  /** Whether the tag can be removed */
  removable?: boolean;
  /** Callback when tag is removed */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Icon to display before the text */
  leftIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Tag content */
  children?: ReactNode;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const tagSizeClasses: Record<ComponentSize, string> = {
  xs: 'px-2 py-0.5 text-xs gap-1',
  sm: 'px-2.5 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-3.5 py-1 text-sm gap-1.5',
  xl: 'px-4 py-1.5 text-base gap-2',
};

const iconSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
};

const removeButtonSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-4 h-4',
  xl: 'w-5 h-5',
};

export const Tag = ({
  variant = 'neutral',
  size = 'sm',
  removable = false,
  onRemove,
  leftIcon,
  className,
  children,
  'data-test-id': testId,
  ...props
}: TagProps) => {
  const baseClasses = cn(
    'inline-flex items-center font-medium rounded-md border',
    transitionClasses
  );

  const variantClasses = colorVariantClasses[variant];
  const sizeClasses = tagSizeClasses[size];

  const tagClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  const iconClasses = iconSizeClasses[size];
  const removeButtonClasses = cn(
    'inline-flex items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors',
    removeButtonSizeClasses[size]
  );

  return (
    <span
      className={tagClasses}
      data-test-id={testId}
      {...props}
    >
      {leftIcon && (
        <span className={iconClasses}>
          {leftIcon}
        </span>
      )}
      {children}
      {removable && (
        <button
          type="button"
          className={removeButtonClasses}
          onClick={onRemove}
          aria-label="Remove tag"
        >
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

Tag.displayName = 'Tag';