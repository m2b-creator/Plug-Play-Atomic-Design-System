'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button, Icon, Heading, Text } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose?: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: ReactNode;
  /** Modal footer content */
  footer?: ReactNode;
  /** Modal size variant */
  size?: ComponentSize | '2xl' | '3xl' | '4xl' | 'full';
  /** Whether the modal is centered vertically */
  centered?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes modal */
  closeOnEsc?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether modal can be closed */
  closeable?: boolean;
  /** Custom close button */
  closeButton?: ReactNode;
  /** Modal z-index */
  zIndex?: number;
  /** Additional CSS classes for modal content */
  className?: string;
  /** Additional CSS classes for modal backdrop */
  backdropClassName?: string;
  /** Portal container element */
  container?: Element | null;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const modalSizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeable = true,
  closeButton,
  zIndex = 50,
  className,
  backdropClassName,
  container,
  'data-test-id': testId,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Handle focus management
  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal content
      const focusableElements = modalRef.current?.querySelectorAll(
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

      // Trap focus within modal
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

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

  const backdropClasses = cn(
    'fixed inset-0 bg-black/50 backdrop-blur-sm',
    'flex items-center justify-center p-4',
    centered ? 'items-center' : 'items-start pt-16',
    transitionClasses,
    backdropClassName
  );

  const modalClasses = cn(
    'bg-white rounded-lg shadow-xl w-full relative',
    'transform transition-all duration-300',
    open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
    modalSizeClasses[size],
    className
  );

  const modalContent = (
    <div
      className={backdropClasses}
      style={{ zIndex }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      data-test-id={testId}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <Heading
                id="modal-title"
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
                    aria-label="Close modal"
                  >
                    <Icon name="X" size="sm" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Don't render if not open
  if (!open) return null;

  // Use portal to render modal
  const portalContainer = container || (typeof document !== 'undefined' ? document.body : null);
  
  return portalContainer ? createPortal(modalContent, portalContainer) : null;
};

Modal.displayName = 'Modal';


// Dialog component as a specialized Modal
export interface DialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  /** Dialog description */
  description?: string;
  /** Dialog type */
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
    disabled?: boolean;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  };
  /** Custom content */
  children?: ReactNode;
}

const dialogTypeIcons = {
  info: <Icon name="Info" size="lg" className="text-blue-500" />,
  success: <Icon name="CheckCircle" size="lg" className="text-green-500" />,
  warning: <Icon name="AlertTriangle" size="lg" className="text-yellow-500" />,
  error: <Icon name="XCircle" size="lg" className="text-red-500" />,
  confirm: <Icon name="HelpCircle" size="lg" className="text-blue-500" />,
};

export const Dialog = ({
  type = 'info',
  description,
  primaryAction,
  secondaryAction,
  children,
  ...modalProps
}: DialogProps) => {
  const icon = dialogTypeIcons[type];

  const footer = (primaryAction || secondaryAction) ? (
    <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
      {secondaryAction && (
        <Button
          variant={secondaryAction.variant || 'ghost'}
          onClick={secondaryAction.onClick}
        >
          {secondaryAction.label}
        </Button>
      )}
      {primaryAction && (
        <Button
          variant={primaryAction.variant || (type === 'error' ? 'danger' : 'primary')}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
        >
          {primaryAction.label}
        </Button>
      )}
    </div>
  ) : undefined;

  return (
    <Modal
      {...modalProps}
      size={modalProps.size || 'sm'}
      footer={footer}
    >
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1 space-y-3">
            {description && (
              <Text className="text-gray-600">
                {description}
              </Text>
            )}
            {children}
          </div>
        </div>
      </div>
    </Modal>
  );
};

Dialog.displayName = 'Dialog';