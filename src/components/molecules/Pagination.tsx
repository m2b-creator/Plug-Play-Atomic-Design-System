import type { ButtonHTMLAttributes } from 'react';
import { Button, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface PaginationProps {
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Size of pagination controls */
  size?: ComponentSize;
  /** Number of page buttons to show around current page */
  siblingCount?: number;
  /** Whether to show first/last buttons */
  showFirstLast?: boolean;
  /** Whether to show previous/next buttons */
  showPrevNext?: boolean;
  /** Whether pagination is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: ComponentSize;
}

const PaginationButton = ({ 
  active = false, 
  size = 'md',
  className,
  ...props 
}: PaginationButtonProps) => {
  return (
    <Button
      variant={active ? 'primary' : 'ghost'}
      size={size}
      className={cn(
        'min-w-0 px-3',
        active && 'pointer-events-none',
        className
      )}
      {...props}
    />
  );
};

const DOTS = '...';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  disabled = false,
  className,
  'data-test-id': testId,
}: PaginationProps) => {
  // Calculate the range of pages to show
  const generatePaginationRange = () => {
    const range: (number | string)[] = [];
    
    // Total number of page numbers to show
    const totalPageNumbersToShow = siblingCount + 5; // +5 accounts for first, last, current, and two DOTS
    
    // If total pages is less than the total numbers we want to show, show all pages
    if (totalPages <= totalPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }
    
    // Calculate left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    // We do not want to show dots when there is just one page number to be inserted
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    
    // No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }
    
    // No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    
    // Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    
    return range;
  };
  
  const paginationRange = generatePaginationRange();
  
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }
  
  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const onFirst = () => {
    onPageChange(1);
  };
  
  const onLast = () => {
    onPageChange(totalPages);
  };
  
  const containerClasses = cn(
    'flex items-center justify-center space-x-1',
    className
  );
  
  return (
    <nav
      className={containerClasses}
      role="navigation"
      aria-label="Pagination"
      data-test-id={testId}
    >
      {/* First page button */}
      {showFirstLast && (
        <PaginationButton
          size={size}
          disabled={disabled || currentPage === 1}
          onClick={onFirst}
          aria-label="Go to first page"
        >
          <Icon name="ChevronsLeft" size="sm" />
        </PaginationButton>
      )}
      
      {/* Previous page button */}
      {showPrevNext && (
        <PaginationButton
          size={size}
          disabled={disabled || currentPage === 1}
          onClick={onPrevious}
          aria-label="Go to previous page"
        >
          <Icon name="ChevronLeft" size="sm" />
        </PaginationButton>
      )}
      
      {/* Page number buttons */}
      {paginationRange.map((pageNumber, index) => {
        // If the page item is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <span
              key={`dots-${index}`}
              className="px-3 py-2 text-gray-500 select-none"
            >
              &#8230;
            </span>
          );
        }
        
        // Render page number button
        const page = pageNumber as number;
        return (
          <PaginationButton
            key={page}
            size={size}
            active={page === currentPage}
            disabled={disabled}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PaginationButton>
        );
      })}
      
      {/* Next page button */}
      {showPrevNext && (
        <PaginationButton
          size={size}
          disabled={disabled || currentPage === totalPages}
          onClick={onNext}
          aria-label="Go to next page"
        >
          <Icon name="ChevronRight" size="sm" />
        </PaginationButton>
      )}
      
      {/* Last page button */}
      {showFirstLast && (
        <PaginationButton
          size={size}
          disabled={disabled || currentPage === totalPages}
          onClick={onLast}
          aria-label="Go to last page"
        >
          <Icon name="ChevronsRight" size="sm" />
        </PaginationButton>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';