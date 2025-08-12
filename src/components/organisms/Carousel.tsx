'use client';

import React, { ReactNode } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, transitionClasses } from '@/utils';

export interface CarouselItem {
  /** Item identifier */
  id: string | number;
  /** Item content */
  content: ReactNode;
  /** Alt text for accessibility */
  alt?: string;
}

export interface CarouselProps {
  /** Carousel items */
  items: CarouselItem[];
  /** Current active item index */
  activeIndex?: number;
  /** Callback when active item changes */
  onChange?: (index: number) => void;
  /** Whether to show navigation arrows */
  showArrows?: boolean;
  /** Whether to show dot indicators */
  showDots?: boolean;
  /** Whether to enable infinite loop */
  infinite?: boolean;
  /** Autoplay interval in milliseconds (0 to disable) */
  autoplay?: number;
  /** Whether to pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Number of items to show at once */
  itemsPerView?: number;
  /** Number of items to scroll at once */
  itemsPerScroll?: number;
  /** Gap between items */
  gap?: ComponentSize;
  /** Carousel size variant */
  size?: ComponentSize;
  /** Whether carousel is responsive */
  responsive?: boolean;
  /** Custom responsive breakpoints */
  breakpoints?: {
    [key: number]: {
      itemsPerView?: number;
      itemsPerScroll?: number;
    };
  };
  /** Whether to enable touch/swipe gestures */
  enableSwipe?: boolean;
  /** Custom arrow components */
  prevArrow?: ReactNode;
  nextArrow?: ReactNode;
  /** Arrow position */
  arrowPosition?: 'inside' | 'outside';
  /** Dot position */
  dotPosition?: 'bottom' | 'top';
  /** Transition duration in milliseconds */
  transitionDuration?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const arrowSizes = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
};

const dotSizes = {
  xs: 'w-2 h-2',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export const Carousel = ({
  items,
  activeIndex = 0,
  onChange,
  showArrows = true,
  showDots = true,
  infinite = true,
  autoplay = 0,
  pauseOnHover = true,
  itemsPerView = 1,
  itemsPerScroll = 1,
  gap = 'md',
  size = 'md',
  responsive = true,
  breakpoints = {},
  enableSwipe = true,
  prevArrow,
  nextArrow,
  arrowPosition = 'inside',
  dotPosition = 'bottom',
  transitionDuration = 300,
  className,
  'data-test-id': testId,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay > 0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const touchStartRef = useRef(0);

  // Use controlled or uncontrolled active index
  const activeIdx = activeIndex !== undefined ? activeIndex : currentIndex;
  const setActiveIndex = useCallback((index: number) => {
    if (activeIndex === undefined) {
      setCurrentIndex(index);
    }
    onChange?.(index);
  }, [activeIndex, onChange]);

  // Calculate responsive items per view
  useEffect(() => {
    if (!responsive) return;

    const updateItemsPerView = () => {
      const width = window.innerWidth;
      let newItemsPerView = itemsPerView;

      // Check breakpoints in descending order
      const sortedBreakpoints = Object.keys(breakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      for (const breakpoint of sortedBreakpoints) {
        if (width >= breakpoint && breakpoints[breakpoint].itemsPerView) {
          newItemsPerView = breakpoints[breakpoint].itemsPerView!;
          break;
        }
      }

      setCurrentItemsPerView(newItemsPerView);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [itemsPerView, breakpoints, responsive]);

  const goToPrevious = useCallback(() => {
    if (infinite || activeIdx > 0) {
      const newIndex = activeIdx === 0 ? items.length - currentItemsPerView : activeIdx - itemsPerScroll;
      setActiveIndex(Math.max(0, newIndex));
    }
  }, [activeIdx, items.length, currentItemsPerView, itemsPerScroll, infinite, setActiveIndex]);

  const goToNext = useCallback(() => {
    const maxIndex = items.length - currentItemsPerView;
    if (infinite || activeIdx < maxIndex) {
      const newIndex = activeIdx >= maxIndex ? 0 : activeIdx + itemsPerScroll;
      setActiveIndex(Math.min(newIndex, maxIndex));
    }
  }, [activeIdx, items.length, currentItemsPerView, itemsPerScroll, infinite, setActiveIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay > 0 && isAutoPlaying && !isDragging) {
      autoplayRef.current = setTimeout(() => {
        goToNext();
      }, autoplay);
    }

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [activeIdx, autoplay, isAutoPlaying, isDragging, goToNext]);

  const goToSlide = (index: number) => {
    const maxIndex = items.length - currentItemsPerView;
    setActiveIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    
    setIsDragging(true);
    setIsAutoPlaying(false);
    touchStartRef.current = e.touches[0].clientX;
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe || !isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  // Common handler for ending drag operations (touch and mouse)
  const handleDragEnd = () => {
    if (!enableSwipe || !isDragging) return;
    
    const threshold = 50;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    if (autoplay > 0) {
      setIsAutoPlaying(true);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enableSwipe) return;
    
    setIsDragging(true);
    setIsAutoPlaying(false);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableSwipe || !isDragging) return;
    
    const diff = dragStart - e.clientX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsAutoPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && autoplay > 0) {
      setIsAutoPlaying(true);
    }
  };

  const canGoPrevious = () => infinite || activeIdx > 0;
  const canGoNext = () => {
    const maxIndex = items.length - currentItemsPerView;
    return infinite || activeIdx < maxIndex;
  };

  const getTransform = () => {
    const itemWidth = 100 / currentItemsPerView;
    const translateX = -(activeIdx * itemWidth) + (isDragging ? -(dragOffset / 5) : 0);
    return `translateX(${translateX}%)`;
  };

  const renderArrow = (direction: 'prev' | 'next') => {
    const canMove = direction === 'prev' ? canGoPrevious() : canGoNext();
    const onClick = direction === 'prev' ? goToPrevious : goToNext;
    const customArrow = direction === 'prev' ? prevArrow : nextArrow;
    const isInside = arrowPosition === 'inside';

    if (customArrow) {
      return (
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 z-10',
            direction === 'prev' ? 'left-2' : 'right-2',
            !isInside && (direction === 'prev' ? '-left-12' : '-right-12')
          )}
        >
          {customArrow}
        </div>
      );
    }

    return (
      <Button
        variant="ghost"
        size={size}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-10',
          'bg-white/80 hover:bg-white shadow-md',
          arrowSizes[size],
          'rounded-full p-0 flex items-center justify-center',
          direction === 'prev' ? 'left-2' : 'right-2',
          !isInside && (direction === 'prev' ? '-left-12' : '-right-12'),
          !canMove && 'opacity-50 cursor-not-allowed'
        )}
        onClick={onClick}
        disabled={!canMove}
        aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      >
        <Icon
          name={direction === 'prev' ? 'ChevronLeft' : 'ChevronRight'}
          size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
        />
      </Button>
    );
  };

  const renderDots = () => {
    if (!showDots) return null;

    const totalDots = Math.ceil((items.length - currentItemsPerView + 1));
    
    return (
      <div className={cn(
        'flex items-center justify-center space-x-2',
        dotPosition === 'top' ? 'mb-4' : 'mt-4'
      )}>
        {Array.from({ length: totalDots }, (_, index) => {
          const isActive = index === activeIdx;
          
          return (
            <button
              key={index}
              type="button"
              className={cn(
                'rounded-full transition-all duration-200',
                dotSizes[size],
                isActive 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    );
  };

  const containerClasses = cn(
    'relative w-full',
    arrowPosition === 'outside' && 'px-12',
    className
  );

  const trackClasses = cn(
    'flex transition-transform ease-out',
    gapClasses[gap],
    transitionClasses
  );

  const itemClasses = cn(
    'flex-shrink-0',
    `w-${100 / currentItemsPerView}%` // This might need dynamic calculation
  );

  return (
    <div
      ref={carouselRef}
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-test-id={testId}
    >
      {dotPosition === 'top' && renderDots()}
      
      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={trackRef}
          className={trackClasses}
          style={{
            transform: getTransform(),
            transitionDuration: isDragging ? '0ms' : `${transitionDuration}ms`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={itemClasses}
              style={{ width: `${100 / currentItemsPerView}%` }}
            >
              <div className="w-full h-full">
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            {renderArrow('prev')}
            {renderArrow('next')}
          </>
        )}
      </div>

      {dotPosition === 'bottom' && renderDots()}
    </div>
  );
};

Carousel.displayName = 'Carousel';