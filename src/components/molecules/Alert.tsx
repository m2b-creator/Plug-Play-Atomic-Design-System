import type { HTMLAttributes, ReactNode } from 'react';
import { Button, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Alert variant/type */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Size of the alert */
  size?: ComponentSize;
  /** Alert title */
  title?: ReactNode;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon to override default variant icon */
  icon?: ReactNode;
  /** Whether to show the default icon */
  showIcon?: boolean;
  /** Additional actions to show */
  actions?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const alertVariantClasses = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  danger: 'bg-red-50 border-red-200 text-red-800',
};

const alertIconClasses = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
};

const alertSizeClasses = {
  xs: 'p-2 text-xs',
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-5 text-lg',
  xl: 'p-6 text-xl',
};

const defaultIcons = {
  info: 'Info',
  success: 'CheckCircle',
  warning: 'AlertTriangle',
  danger: 'XCircle',
} as const;

export const Alert = ({
  variant = 'info',
  size = 'md',
  title,
  dismissible = false,
  onDismiss,
  icon,
  showIcon = true,
  actions,
  className,
  children,
  'data-test-id': testId,
  ...props
}: AlertProps) => {
  const baseClasses = cn(
    'border rounded-md',
    transitionClasses
  );

  const variantClasses = alertVariantClasses[variant];
  const sizeClasses = alertSizeClasses[size];

  const alertClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    alertIconClasses[variant],
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
        className={cn(
          'flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10',
          alertIconClasses[variant]
        )}
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

  return (
    <div
      className={alertClasses}
      role="alert"
      data-test-id={testId}
      {...props}
    >
      <div className="flex items-start space-x-3">
        {renderIcon()}
        
        <div className="flex-1 min-w-0">
          {hasHeader && (
            <div className="flex items-center justify-between mb-1">
              {title && (
                <h4 className="font-medium text-current">
                  {title}
                </h4>
              )}
              {dismissible && !title && renderDismissButton()}
            </div>
          )}
          
          {children && (
            <div className="text-current opacity-90">
              {children}
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

Alert.displayName = 'Alert';