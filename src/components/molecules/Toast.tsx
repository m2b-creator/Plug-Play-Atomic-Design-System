'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Button, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses, shadowClasses } from '@/utils';

export interface ToastProps {
  /** Toast variant/type */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Size of the toast */
  size?: ComponentSize;
  /** Toast title */
  title?: ReactNode;
  /** Toast description/content */
  description?: ReactNode;
  /** Whether the toast is dismissible */
  dismissible?: boolean;
  /** Auto dismiss duration in milliseconds (0 to disable) */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom icon to override default variant icon */
  icon?: ReactNode;
  /** Whether to show the default icon */
  showIcon?: boolean;
  /** Additional actions to show */
  actions?: ReactNode;
  /** Position of the toast */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Whether the toast is visible */
  visible?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const toastVariantClasses = {
  info: 'bg-white border-blue-200 text-gray-900 shadow-lg',
  success: 'bg-white border-green-200 text-gray-900 shadow-lg',
  warning: 'bg-white border-yellow-200 text-gray-900 shadow-lg',
  danger: 'bg-white border-red-200 text-gray-900 shadow-lg',
};

const toastIconClasses = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

const toastSizeClasses = {
  xs: 'p-3 text-xs max-w-xs',
  sm: 'p-3 text-sm max-w-sm',
  md: 'p-4 text-base max-w-md',
  lg: 'p-5 text-lg max-w-lg',
  xl: 'p-6 text-xl max-w-xl',
};

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
};

const defaultIcons = {
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  danger: 'XCircle',
} as const;

export const Toast = ({
  variant = 'info',
  size = 'md',
  title,
  description,
  dismissible = true,
  duration = 5000,
  onDismiss,
  icon,
  showIcon = true,
  actions,
  position = 'top-right',
  visible = true,
  className,
  'data-test-id': testId,
}: ToastProps) => {
  // Auto dismiss
  useEffect(() => {
    if (!visible || duration === 0) return;

    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  const baseClasses = cn(
    'fixed z-50 border rounded-md',
    'pointer-events-auto',
    transitionClasses,
    shadowClasses.lg
  );

  const variantClasses = toastVariantClasses[variant];
  const sizeClasses = toastSizeClasses[size];
  const positionClass = positionClasses[position];

  const toastClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    positionClass,
    visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    toastIconClasses[variant],
    size === 'xs' ? 'w-4 h-4' : size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
  );

  const renderIcon = () => {
    if (!showIcon) return null;

    if (icon) {
      return <span className={iconClasses}>{icon}</span>;
    }

    const iconName = defaultIcons[variant];
    return (
      <Icon 
        name={iconName} 
        className={iconClasses}
        size={size === 'xs' ? 'sm' : size === 'sm' ? 'md' : 'lg'}
      />
    );
  };

  const renderDismissButton = () => {
    if (!dismissible) return null;

    return (
      <Button
        variant="ghost"
        size={size === 'xs' ? 'xs' : 'sm'}
        onClick={onDismiss}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      >
        <Icon 
          name="X" 
          size={size === 'xs' ? 'xs' : 'sm'}
        />
      </Button>
    );
  };

  const hasHeader = !!(title || dismissible);
  const hasActions = !!actions;

  if (!visible) return null;

  return (
    <div
      className={toastClasses}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-test-id={testId}
    >
      <div className="flex items-start space-x-3">
        {renderIcon()}
        
        <div className="flex-1 min-w-0">
          {hasHeader && (
            <div className="flex items-center justify-between mb-1">
              {title && (
                <h4 className="font-semibold text-gray-900">
                  {title}
                </h4>
              )}
              {dismissible && !title && renderDismissButton()}
            </div>
          )}
          
          {description && (
            <div className="text-gray-700">
              {description}
            </div>
          )}
          
          {hasActions && (
            <div className="mt-3 flex space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {dismissible && title && renderDismissButton()}
      </div>
    </div>
  );
};

Toast.displayName = 'Toast';