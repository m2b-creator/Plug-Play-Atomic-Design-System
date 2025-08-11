import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size of the menu item */
  size?: ComponentSize;
  /** Icon to display before the text */
  leftIcon?: ReactNode;
  /** Icon to display after the text */
  rightIcon?: ReactNode;
  /** Whether the item is selected/active */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Description text below the main text */
  description?: string;
  /** Keyboard shortcut to display */
  shortcut?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const menuItemSizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
};

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export const MenuItem = ({
  size = 'md',
  leftIcon,
  rightIcon,
  selected = false,
  disabled = false,
  description,
  shortcut,
  className,
  children,
  'data-test-id': testId,
  ...props
}: MenuItemProps) => {
  const baseClasses = cn(
    'w-full flex items-center justify-between',
    'text-left rounded-md',
    'hover:bg-gray-50 active:bg-gray-100',
    focusRingClasses,
    transitionClasses,
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
  );

  const selectedClasses = selected 
    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
    : 'text-gray-700';

  const sizeClasses = menuItemSizeClasses[size];

  const menuItemClasses = cn(
    baseClasses,
    selectedClasses,
    sizeClasses,
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    iconSizeClasses[size],
    selected ? 'text-blue-600' : 'text-gray-400'
  );

  const shortcutClasses = cn(
    'text-xs text-gray-400 ml-auto pl-4',
    'font-mono tracking-wider'
  );

  const renderLeftContent = () => (
    <div className="flex items-center min-w-0 flex-1">
      {leftIcon && (
        <span className={cn(iconClasses, 'mr-3')}>
          {leftIcon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate">
          {children}
        </div>
        {description && (
          <div className="text-xs text-gray-500 mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
    </div>
  );

  const renderRightContent = () => {
    if (!rightIcon && !shortcut) return null;

    return (
      <div className="flex items-center space-x-2 flex-shrink-0">
        {shortcut && (
          <kbd className={shortcutClasses}>
            {shortcut}
          </kbd>
        )}
        {rightIcon && (
          <span className={iconClasses}>
            {rightIcon}
          </span>
        )}
      </div>
    );
  };

  return (
    <button
      type="button"
      className={menuItemClasses}
      disabled={disabled}
      data-test-id={testId}
      role="menuitem"
      // aria-selected={selected} - not supported by menuitem role
      {...props}
    >
      {renderLeftContent()}
      {renderRightContent()}
    </button>
  );
};

MenuItem.displayName = 'MenuItem';