'use client';

import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface DropdownProps {
  /** Trigger element */
  trigger: ReactNode;
  /** Dropdown content */
  children: ReactNode;
  /** Whether the dropdown is open by default */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Size of the dropdown */
  size?: ComponentSize;
  /** Placement of the dropdown */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Whether to close on click outside */
  closeOnClickOutside?: boolean;
  /** Whether to close when an item is clicked */
  closeOnItemClick?: boolean;
  /** Additional CSS classes for the dropdown panel */
  className?: string;
  /** Additional CSS classes for the trigger container */
  triggerClassName?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const placementClasses = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

export const Dropdown = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  // size = 'md',
  placement = 'bottom-start',
  closeOnClickOutside = true,
  closeOnItemClick = true,
  className,
  triggerClassName,
  'data-test-id': testId,
}: DropdownProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
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
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  // Handle item click
  const handleContentClick = (event: React.MouseEvent) => {
    if (closeOnItemClick) {
      // Check if the clicked element is a button or has role="menuitem"
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.getAttribute('role') === 'menuitem' ||
        target.closest('[role="menuitem"]')
      ) {
        setIsOpen(false);
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const panelClasses = cn(
    'absolute z-50 min-w-max',
    'bg-white border border-gray-200 rounded-md shadow-lg',
    'py-1',
    transitionClasses,
    placementClasses[placement],
    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
    className
  );

  const triggerWrapperClasses = cn(
    'relative inline-block',
    triggerClassName
  );

  return (
    <div
      className={triggerWrapperClasses}
      data-test-id={testId}
    >
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className="inline-block"
      >
        {trigger}
      </div>

      <div
        ref={dropdownRef}
        className={panelClasses}
        role="menu"
        aria-hidden={!isOpen}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';