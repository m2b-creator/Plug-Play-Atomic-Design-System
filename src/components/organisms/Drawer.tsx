'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button, Icon, Heading } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when drawer should close */
  onClose?: () => void;
  /** Drawer title */
  title?: string;
  /** Drawer content */
  children: ReactNode;
  /** Drawer footer content */
  footer?: ReactNode;
  /** Drawer position */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer size variant */
  size?: ComponentSize | '2xl' | '3xl' | 'full';
  /** Whether clicking backdrop closes drawer */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes drawer */
  closeOnEsc?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether drawer can be closed */
  closeable?: boolean;
  /** Custom close button */
  closeButton?: ReactNode;
  /** Whether drawer has backdrop */
  hasBackdrop?: boolean;
  /** Drawer z-index */
  zIndex?: number;
  /** Additional CSS classes for drawer content */
  className?: string;
  /** Additional CSS classes for drawer backdrop */
  backdropClassName?: string;
  /** Portal container element */
  container?: Element | null;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const drawerSizeClasses = {
  // Horizontal drawers (left/right)
  horizontal: {
    xs: 'w-64',
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-1/3',
    xl: 'w-2/5',
    '2xl': 'w-1/2',
    '3xl': 'w-2/3',
    full: 'w-full',
  },
  // Vertical drawers (top/bottom)
  vertical: {
    xs: 'h-32',
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-1/3',
    xl: 'h-2/5',
    '2xl': 'h-1/2',
    '3xl': 'h-2/3',
    full: 'h-full',
  },
};

const drawerTransforms = {
  left: {
    closed: '-translate-x-full',
    open: 'translate-x-0',
  },
  right: {
    closed: 'translate-x-full',
    open: 'translate-x-0',
  },
  top: {
    closed: '-translate-y-full',
    open: 'translate-y-0',
  },
  bottom: {
    closed: 'translate-y-full',
    open: 'translate-y-0',
  },
};

export const Drawer = ({
  open,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeable = true,
  closeButton,
  hasBackdrop = true,
  zIndex = 40,
  className,
  backdropClassName,
  container,
  'data-test-id': testId,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const isHorizontal = position === 'left' || position === 'right';
  const sizeClasses = isHorizontal ? drawerSizeClasses.horizontal : drawerSizeClasses.vertical;

  // Handle focus management
  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      // Focus the drawer content
      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements?.[0] as HTMLElement;
      firstFocusableElement?.focus();
    } else {
      // Return focus to previously focused element
      previouslyFocusedElement.current?.focus();
    }
  }, [open]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === 'Escape' && closeOnEsc && closeable && onClose) {
        event.preventDefault();
        onClose();
        return;
      }

      // Trap focus within drawer
      if (event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEsc, closeable, onClose]);

  // Prevent body scroll when drawer is open (for full-screen drawers)
  useEffect(() => {
    if (open && (size === 'full' || size === '3xl')) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open, size]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (
      event.target === event.currentTarget &&
      closeOnBackdropClick &&
      closeable &&
      onClose
    ) {
      onClose();
    }
  };

  const handleClose = () => {
    if (closeable && onClose) {
      onClose();
    }
  };

  const getDrawerPosition = () => {
    switch (position) {
      case 'left':
        return 'inset-y-0 left-0';
      case 'right':
        return 'inset-y-0 right-0';
      case 'top':
        return 'inset-x-0 top-0';
      case 'bottom':
        return 'inset-x-0 bottom-0';
      default:
        return 'inset-y-0 right-0';
    }
  };

  const backdropClasses = cn(
    'fixed inset-0 z-40',
    hasBackdrop && 'bg-black/50 backdrop-blur-sm',
    transitionClasses,
    backdropClassName
  );

  const drawerClasses = cn(
    'fixed bg-white shadow-xl flex flex-col',
    'transform transition-transform duration-300 ease-in-out',
    getDrawerPosition(),
    sizeClasses[size],
    open ? drawerTransforms[position].open : drawerTransforms[position].closed,
    // Rounded corners based on position
    position === 'left' && 'rounded-r-lg',
    position === 'right' && 'rounded-l-lg',
    position === 'top' && 'rounded-b-lg',
    position === 'bottom' && 'rounded-t-lg',
    className
  );

  const drawerContent = (
    <div
      className={backdropClasses}
      style={{ zIndex }}
      onClick={hasBackdrop ? handleBackdropClick : undefined}
      data-test-id={testId}
    >
      <div
        ref={drawerRef}
        className={drawerClasses}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            {title && (
              <Heading
                id="drawer-title"
                as="h2"
                variant="h4"
                className="text-gray-900"
              >
                {title}
              </Heading>
            )}
            {showCloseButton && closeable && (
              <div className="ml-auto">
                {closeButton || (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className={cn("p-2", focusRingClasses)}
                    aria-label="Close drawer"
                  >
                    <Icon name="X" size="sm" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Don't render if not open
  if (!open) return null;

  // Use portal to render drawer
  const portalContainer = container || (typeof document !== 'undefined' ? document.body : null);
  
  return portalContainer ? createPortal(drawerContent, portalContainer) : null;
};

Drawer.displayName = 'Drawer';