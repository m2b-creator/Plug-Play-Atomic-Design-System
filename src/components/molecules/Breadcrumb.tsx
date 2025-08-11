import type { ReactNode } from 'react';
import { Link, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface BreadcrumbItem {
  /** Text to display */
  label: string;
  /** URL to navigate to (optional for current page) */
  href?: string;
  /** Custom icon for the item */
  icon?: ReactNode;
  /** Whether this item is the current page */
  current?: boolean;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Size of the breadcrumb */
  size?: ComponentSize;
  /** Separator between items */
  separator?: ReactNode | 'arrow' | 'slash' | 'chevron';
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
  /** Whether to show home icon for the first item */
  showHomeIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const breadcrumbSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const separatorComponents = {
  arrow: <Icon name="ArrowRight" size="xs" className="text-gray-400" />,
  slash: <span className="text-gray-400">/</span>,
  chevron: <Icon name="ChevronRight" size="xs" className="text-gray-400" />,
};

export const Breadcrumb = ({
  items,
  size = 'md',
  separator = 'chevron',
  maxItems,
  showHomeIcon = false,
  className,
  'data-test-id': testId,
}: BreadcrumbProps) => {
  // Handle collapsed items if maxItems is specified
  const displayItems = maxItems && items.length > maxItems 
    ? [
        items[0],
        { label: '...', current: false },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  const renderSeparator = () => {
    if (typeof separator === 'string' && separator in separatorComponents) {
      return separatorComponents[separator as keyof typeof separatorComponents];
    }
    return separator;
  };

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const isCurrentPage = item.current || isLast;
    const isCollapsedIndicator = item.label === '...';

    const itemClasses = cn(
      'flex items-center space-x-1',
      isCurrentPage ? 'text-gray-900 font-medium' : 'text-gray-500'
    );

    const linkClasses = cn(
      'hover:text-gray-700 transition-colors',
      isCurrentPage && 'cursor-default hover:text-gray-900'
    );

    // Handle collapsed indicator
    if (isCollapsedIndicator) {
      return (
        <span key={index} className="text-gray-400 px-1">
          {item.label}
        </span>
      );
    }

    // Render home icon for first item if enabled
    const displayIcon = showHomeIcon && index === 0 
      ? <Icon name="Home" size="xs" />
      : item.icon;

    const content = (
      <span className={itemClasses}>
        {displayIcon}
        <span>{item.label}</span>
      </span>
    );

    // If it's the current page or has no href, render as plain text
    if (isCurrentPage || !item.href) {
      return (
        <span key={index} className={linkClasses} aria-current={isCurrentPage ? 'page' : undefined}>
          {content}
        </span>
      );
    }

    // Render as link
    return (
      <Link
        key={index}
        href={item.href}
        variant="subtle"
        className={linkClasses}
      >
        {content}
      </Link>
    );
  };

  const breadcrumbClasses = cn(
    'flex items-center space-x-2',
    breadcrumbSizeClasses[size],
    className
  );

  return (
    <nav
      className={breadcrumbClasses}
      aria-label="Breadcrumb"
      data-test-id={testId}
    >
      <ol className="flex items-center space-x-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          
          return (
            <li key={index} className="flex items-center space-x-2">
              {renderItem(item, index, isLast)}
              {!isLast && (
                <span className="flex-shrink-0" aria-hidden="true">
                  {renderSeparator()}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';