'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Icon, Link, Text, Divider } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface SidebarItem {
  /** Item label */
  label: string;
  /** Item URL or identifier */
  href?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether the item is active */
  active?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Badge text or number */
  badge?: string | number;
  /** Sub-items for nested navigation */
  children?: SidebarItem[];
  /** Click handler for items without href */
  onClick?: () => void;
}

export interface SidebarSection {
  /** Section title */
  title?: string;
  /** Section items */
  items: SidebarItem[];
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Whether section is initially collapsed */
  defaultCollapsed?: boolean;
}

export interface SidebarProps {
  /** Sidebar sections */
  sections: SidebarSection[];
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;
  /** Whether the sidebar can be collapsed */
  collapsible?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Sidebar header content */
  header?: ReactNode;
  /** Sidebar footer content */
  footer?: ReactNode;
  /** Sidebar width when expanded */
  width?: 'sm' | 'md' | 'lg' | 'xl';
  /** Sidebar size variant */
  size?: ComponentSize;
  /** Whether sidebar has border */
  bordered?: boolean;
  /** Whether sidebar has shadow */
  shadow?: boolean;
  /** Position of the sidebar */
  position?: 'left' | 'right';
  /** Whether sidebar is overlay on mobile */
  overlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const sidebarWidthClasses = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-72',
  xl: 'w-80',
};

const collapsedWidthClasses = {
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-16',
  xl: 'w-20',
};

const sidebarSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const itemPaddingClasses = {
  xs: 'px-2 py-1',
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5',
  xl: 'px-6 py-3',
};

export const Sidebar = ({
  sections,
  collapsed = false,
  collapsible = true,
  onCollapseChange,
  header,
  footer,
  width = 'md',
  size = 'md',
  bordered = true,
  shadow = false,
  position = 'left',
  className,
  'data-test-id': testId,
}: SidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  const [sectionCollapsed, setSectionCollapsed] = useState<Record<number, boolean>>({});

  // Use controlled or uncontrolled collapse state
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
  const setCollapsed = (newCollapsed: boolean) => {
    if (collapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapseChange?.(newCollapsed);
  };

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!isCollapsed);
    }
  };

  const toggleSection = (sectionIndex: number) => {
    setSectionCollapsed(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const baseClasses = cn(
    'flex flex-col h-full bg-white',
    bordered && 'border-r border-gray-200',
    shadow && 'shadow-lg',
    position === 'right' && 'border-r-0 border-l',
    sidebarSizeClasses[size],
    transitionClasses
  );

  const widthClasses = cn(
    isCollapsed ? collapsedWidthClasses[width] : sidebarWidthClasses[width]
  );

  const containerClasses = cn(
    baseClasses,
    widthClasses,
    className
  );

  const renderCollapseButton = () => {
    if (!collapsible) return null;

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCollapse}
        className={cn(
          'p-2 rounded-md',
          isCollapsed && 'mx-auto'
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        data-test-id="sidebar-collapse-toggle"
      >
        <Icon
          name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
          size="sm"
          className={cn(
            transitionClasses,
            position === 'right' && 'rotate-180'
          )}
        />
      </Button>
    );
  };

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemKey = `${item.label}-${level}`;
    const itemExpanded = expandedItems[itemKey] ?? !item.children;

    const itemClasses = cn(
      'group flex items-center w-full text-left rounded-md hover:bg-gray-50',
      'transition-colors duration-200',
      item.active && 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      item.disabled && 'opacity-50 cursor-not-allowed',
      !item.disabled && focusRingClasses,
      itemPaddingClasses[size],
      level > 0 && 'ml-4'
    );

    const content = (
      <div className="flex items-center w-full">
        {item.icon && (
          <span className={cn(
            'flex-shrink-0',
            !isCollapsed && 'mr-3',
            isCollapsed && 'mx-auto'
          )}>
            {item.icon}
          </span>
        )}
        {!isCollapsed && (
          <>
            <Text className="flex-1 truncate">{item.label}</Text>
            {item.badge && (
              <span className={cn(
                'ml-auto text-xs px-2 py-0.5 rounded-full',
                item.active ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
              )}>
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <Icon
                name="ChevronDown"
                size="sm"
                className={cn(
                  'ml-2 transition-transform',
                  itemExpanded && 'rotate-180'
                )}
              />
            )}
          </>
        )}
      </div>
    );

    const handleClick = () => {
      if (item.disabled) return;
      
      if (hasChildren) {
        setExpandedItems(prev => ({
          ...prev,
          [itemKey]: !itemExpanded
        }));
      } else if (item.onClick) {
        item.onClick();
      }
    };

    if (item.href && !hasChildren) {
      return (
        <div key={`${item.label}-${level}`}>
          <Link
            href={item.href}
            className={itemClasses}
            aria-current={item.active ? 'page' : undefined}
            title={isCollapsed ? item.label : undefined}
          >
            {content}
          </Link>
        </div>
      );
    }

    return (
      <div key={`${item.label}-${level}`}>
        <button
          type="button"
          className={itemClasses}
          onClick={handleClick}
          disabled={item.disabled}
          title={isCollapsed ? item.label : undefined}
          aria-expanded={hasChildren ? itemExpanded : undefined}
        >
          {content}
        </button>
        {hasChildren && !isCollapsed && itemExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (section: SidebarSection, index: number) => {
    const isSectionCollapsed = section.collapsible && (
      sectionCollapsed[index] !== undefined 
        ? sectionCollapsed[index] 
        : section.defaultCollapsed
    );

    return (
      <div key={index} className="space-y-1">
        {section.title && !isCollapsed && (
          <div className="flex items-center justify-between px-4 py-2">
            <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {section.title}
            </Text>
            {section.collapsible && (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => toggleSection(index)}
                className="p-1"
                aria-expanded={!isSectionCollapsed}
              >
                <Icon
                  name="ChevronDown"
                  size="xs"
                  className={cn(
                    'transition-transform',
                    isSectionCollapsed && '-rotate-90'
                  )}
                />
              </Button>
            )}
          </div>
        )}
        {!isSectionCollapsed && (
          <div className="space-y-1">
            {section.items.map((item) => renderSidebarItem(item))}
          </div>
        )}
        {index < sections.length - 1 && !isCollapsed && (
          <Divider className="my-4" />
        )}
      </div>
    );
  };

  return (
    <aside
      className={containerClasses}
      data-test-id={testId}
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      {header && (
        <div className={cn(
          'flex-shrink-0 p-4 border-b border-gray-200',
          isCollapsed && 'px-2'
        )}>
          {isCollapsed && typeof header === 'string' ? (
            <div className="text-center font-bold text-lg" title={header}>
              {header.charAt(0)}
            </div>
          ) : (
            header
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {sections.map((section, index) => renderSection(section, index))}
      </nav>

      {/* Footer */}
      {footer && (
        <div className={cn(
          'flex-shrink-0 p-4 border-t border-gray-200',
          isCollapsed && 'px-2'
        )}>
          {footer}
        </div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <div className={cn(
          'flex-shrink-0 p-2 border-t border-gray-200',
          !isCollapsed && 'text-right'
        )}>
          {renderCollapseButton()}
        </div>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';