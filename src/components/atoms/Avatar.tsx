'use client';

import type { ReactNode, ImgHTMLAttributes } from 'react';
import { useState } from 'react';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  /** Size of the avatar */
  size?: ComponentSize;
  /** Fallback content when image fails to load */
  fallback?: ReactNode;
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Whether to show status indicator */
  showStatus?: boolean;
  /** Shape of the avatar */
  shape?: 'circle' | 'square';
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const avatarSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const statusSizeClasses: Record<ComponentSize, string> = {
  xs: 'w-1.5 h-1.5 -bottom-0 -right-0',
  sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
  md: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
  lg: 'w-3 h-3 -bottom-0.5 -right-0.5',
  xl: 'w-4 h-4 -bottom-1 -right-1',
};

const fallbackTextSizes: Record<ComponentSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl',
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export const Avatar = ({
  size = 'md',
  fallback,
  status,
  showStatus = false,
  shape = 'circle',
  className,
  'data-test-id': testId,
  alt = '',
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const baseClasses = cn(
    'inline-flex items-center justify-center bg-gray-100 text-gray-600 font-medium select-none overflow-hidden',
    transitionClasses
  );

  const sizeClasses = avatarSizeClasses[size];
  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  const avatarClasses = cn(
    baseClasses,
    sizeClasses,
    shapeClasses,
    className
  );

  const handleImageError = () => {
    setImageError(true);
  };

  const renderFallback = () => {
    if (fallback) {
      return fallback;
    }

    // Generate initials from alt text
    const initials = alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();

    return (
      <span className={fallbackTextSizes[size]}>
        {initials || '?'}
      </span>
    );
  };

  const renderStatusIndicator = () => {
    if (!showStatus || !status) return null;

    const statusClasses = cn(
      'absolute rounded-full border-2 border-white',
      statusSizeClasses[size],
      statusColors[status]
    );

    return <span className={statusClasses} />;
  };

  return (
    <div className="relative inline-block">
      <div
        className={avatarClasses}
        data-test-id={testId}
      >
        {!imageError && props.src ? (
          <img
            className="w-full h-full object-cover"
            alt={alt}
            onError={handleImageError}
            {...props}
          />
        ) : (
          renderFallback()
        )}
      </div>
      {renderStatusIndicator()}
    </div>
  );
};

Avatar.displayName = 'Avatar';