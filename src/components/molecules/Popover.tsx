'use client';

import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses, shadowClasses } from '@/utils';

export interface PopoverProps {
  /** The trigger element */
  trigger: ReactNode;
  /** The popover content */
  children: ReactNode;
  /** Title for the popover */
  title?: string;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Whether the popover is open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement of the popover */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  /** Size of the popover */
  size?: ComponentSize;
  /** Trigger behavior */
  triggerOn?: 'click' | 'hover';
  /** Whether to close on click outside */
  closeOnClickOutside?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Additional CSS classes for the popover */
  className?: string;
  /** Additional CSS classes for the trigger wrapper */
  triggerClassName?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const placementClasses = {
  'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  'left': 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  'right': 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
};

const arrowClasses = {
  'top': 'top-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm',
  'bottom': 'bottom-full left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-sm',
  'left': 'left-full top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white drop-shadow-sm',
  'right': 'right-full top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white drop-shadow-sm',
  'top-start': 'top-full left-6 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm',
  'top-end': 'top-full right-6 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm',
  'bottom-start': 'bottom-full left-6 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-sm',
  'bottom-end': 'bottom-full right-6 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-sm',
};

const popoverSizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Popover = ({
  trigger,
  children,
  title,
  showCloseButton = false,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  size = 'md',
  triggerOn = 'click',
  closeOnClickOutside = true,
  closeOnEscape = true,
  className,
  triggerClassName,
  'data-test-id': testId,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, setIsOpen]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, setIsOpen]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (triggerOn === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOn === 'hover') {
      setIsOpen(false);
    }
  };

  const popoverClasses = cn(
    'absolute z-50 pointer-events-auto',
    'bg-white border border-gray-200 rounded-lg',
    shadowClasses.lg,
    transitionClasses,
    'opacity-0 scale-95',
    isOpen && 'opacity-100 scale-100',
    !isOpen && 'pointer-events-none',
    popoverSizeClasses[size],
    placementClasses[placement],
    className
  );

  const triggerProps = {
    ...(triggerOn === 'click' && {
      onClick: togglePopover,
    }),
    ...(triggerOn === 'hover' && {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }),
  };

  const popoverHoverProps = triggerOn === 'hover' ? {
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  } : {};

  return (
    <div
      className={cn('relative inline-block', triggerClassName)}
      data-test-id={testId}
    >
      <div
        ref={triggerRef}
        className="inline-block"
        {...triggerProps}
      >
        {trigger}
      </div>

      <div
        ref={popoverRef}
        className={popoverClasses}
        role="dialog"
        aria-hidden={!isOpen}
        {...popoverHoverProps}
      >
        {/* Arrow */}
        <div
          className={cn(
            'absolute w-0 h-0 z-10',
            arrowClasses[placement]
          )}
        />

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100"
              >
                <Icon name="X" size="sm" />
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Popover.displayName = 'Popover';