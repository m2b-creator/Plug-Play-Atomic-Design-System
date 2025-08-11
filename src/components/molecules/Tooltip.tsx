'use client';

import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface TooltipProps {
  /** The trigger element */
  children: ReactNode;
  /** The tooltip content */
  content: ReactNode;
  /** Placement of the tooltip */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  /** Size of the tooltip */
  size?: ComponentSize;
  /** Trigger behavior */
  trigger?: 'hover' | 'click' | 'focus';
  /** Delay before showing tooltip (ms) */
  showDelay?: number;
  /** Delay before hiding tooltip (ms) */
  hideDelay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the tooltip */
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
  'top': 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900',
  'bottom': 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900',
  'left': 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900',
  'right': 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-900',
  'top-start': 'top-full left-4 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900',
  'top-end': 'top-full right-4 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900',
  'bottom-start': 'bottom-full left-4 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900',
  'bottom-end': 'bottom-full right-4 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900',
};

const tooltipSizeClasses = {
  xs: 'px-2 py-1 text-xs max-w-xs',
  sm: 'px-2 py-1 text-sm max-w-sm',
  md: 'px-3 py-2 text-sm max-w-md',
  lg: 'px-4 py-3 text-base max-w-lg',
  xl: 'px-6 py-4 text-lg max-w-xl',
};

export const Tooltip = ({
  children,
  content,
  placement = 'top',
  size = 'md',
  trigger = 'hover',
  showDelay = 500,
  hideDelay = 0,
  disabled = false,
  className,
  triggerClassName,
  'data-test-id': testId,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const hideTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const showTooltip = () => {
    if (disabled) return;
    
    // Clear hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = undefined;
    }
    
    // Set show timeout
    if (showDelay > 0) {
      showTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    // Clear show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = undefined;
    }
    
    // Set hide timeout
    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    } else {
      setIsVisible(false);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const tooltipClasses = cn(
    'absolute z-50 pointer-events-none',
    'bg-gray-900 text-white rounded-md shadow-lg',
    'opacity-0 transition-opacity duration-200',
    isVisible && 'opacity-100',
    tooltipSizeClasses[size],
    placementClasses[placement],
    className
  );

  const arrowElement = (
    <div
      className={cn(
        'absolute w-0 h-0',
        arrowClasses[placement]
      )}
    />
  );

  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
  
  const triggerProps = {
    'aria-describedby': isVisible ? tooltipId : undefined,
    ...(trigger === 'hover' && {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }),
    ...(trigger === 'click' && {
      onClick: handleClick,
      'aria-expanded': isVisible,
    }),
    ...(trigger === 'focus' && {
      onFocus: handleFocus,
      onBlur: handleBlur,
    }),
  };

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', triggerClassName)}
      data-test-id={testId}
      {...triggerProps}
    >
      {children}
      
      {content && (
        <div
          id={tooltipId}
          className={tooltipClasses}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          {arrowElement}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';