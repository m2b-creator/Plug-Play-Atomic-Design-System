'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Icon, Text, Input, Spinner } from '../atoms';
import { Checkbox, Pagination } from '../molecules';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface DataTableColumn<T = Record<string, unknown>> {
  /** Column identifier */
  key: string;
  /** Column header label */
  label: string;
  /** Column width */
  width?: string | number;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is resizable */
  resizable?: boolean;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom render function */
  render?: (value: unknown, row: T, index: number) => ReactNode;
  /** Custom header render function */
  renderHeader?: () => ReactNode;
  /** Whether column is sticky */
  sticky?: 'left' | 'right';
  /** Column minimum width */
  minWidth?: string | number;
  /** Whether column can be hidden */
  hideable?: boolean;
}

export interface DataTableFilter {
  /** Filter key */
  key: string;
  /** Filter label */
  label: string;
  /** Filter type */
  type: 'text' | 'select' | 'date' | 'number';
  /** Filter options for select type */
  options?: { label: string; value: unknown }[];
  /** Default filter value */
  defaultValue?: unknown;
}

export interface DataTableProps<T = Record<string, unknown>> {
  /** Table data */
  data: T[];
  /** Table columns configuration */
  columns: DataTableColumn<T>[];
  /** Whether table is loading */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Table size variant */
  size?: ComponentSize;
  /** Whether table has borders */
  bordered?: boolean;
  /** Whether table has striped rows */
  striped?: boolean;
  /** Whether table has hover effect */
  hoverable?: boolean;
  /** Whether rows are selectable */
  selectable?: boolean;
  /** Selected row keys */
  selectedRows?: (string | number)[];
  /** Callback when row selection changes */
  onRowSelectionChange?: (selectedRows: (string | number)[]) => void;
  /** Row key field name */
  rowKey?: string;
  /** Whether to show pagination */
  showPagination?: boolean;
  /** Current page */
  currentPage?: number;
  /** Items per page */
  pageSize?: number;
  /** Total items count */
  totalItems?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Whether to show search */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Callback when search changes */
  onSearchChange?: (value: string) => void;
  /** Whether to show filters */
  showFilters?: boolean;
  /** Available filters */
  filters?: DataTableFilter[];
  /** Applied filter values */
  filterValues?: Record<string, unknown>;
  /** Callback when filters change */
  onFilterChange?: (filters: Record<string, unknown>) => void;
  /** Sort configuration */
  sortBy?: string;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Callback when sort changes */
  onSortChange?: (sortBy: string, direction: 'asc' | 'desc') => void;
  /** Custom row props */
  getRowProps?: (row: T, index: number) => Record<string, unknown>;
  /** Custom cell props */
  getCellProps?: (column: DataTableColumn<T>, row: T, index: number) => Record<string, unknown>;
  /** Table caption */
  caption?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const tableSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const cellPaddingClasses = {
  xs: 'px-2 py-1',
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
  xl: 'px-8 py-5',
};

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  loadingText = 'Loading...',
  emptyMessage = 'No data available',
  size = 'md',
  bordered = true,
  striped = false,
  hoverable = true,
  selectable = false,
  selectedRows = [],
  onRowSelectionChange,
  rowKey = 'id',
  showPagination = true,
  currentPage = 1,
  pageSize = 10,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showSearch = true,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  showFilters = false,
  filters = [],
  filterValues = {},
  onFilterChange,
  sortBy,
  sortDirection,
  onSortChange,
  getRowProps,
  getCellProps,
  caption,
  className,
  'data-test-id': testId,
}: DataTableProps<T>) => {
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
  const [internalFilterValues, setInternalFilterValues] = useState(filterValues);

  // Use controlled or uncontrolled search
  const currentSearchValue = searchValue !== undefined ? searchValue : internalSearchValue;
  const setSearchValue = (value: string) => {
    if (searchValue === undefined) {
      setInternalSearchValue(value);
    }
    onSearchChange?.(value);
  };

  // Use controlled or uncontrolled filters
  const currentFilterValues = filterValues !== undefined ? filterValues : internalFilterValues;
  const setFilterValues = (values: Record<string, unknown>) => {
    if (filterValues === undefined) {
      setInternalFilterValues(values);
    }
    onFilterChange?.(values);
  };

  // Calculate total items if not provided
  const calculatedTotalItems = totalItems || data.length;

  // Pagination calculations
  const totalPages = Math.ceil(calculatedTotalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, calculatedTotalItems);

  // Selection handlers
  const isAllSelected = selectable && data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectable && selectedRows.length > 0 && selectedRows.length < data.length;

  const handleSelectAll = (checked: boolean) => {
    if (!selectable || !onRowSelectionChange) return;
    
    if (checked) {
      const allRowKeys = data.map(row => row[rowKey]).filter((key): key is string | number => 
        typeof key === 'string' || typeof key === 'number'
      );
      onRowSelectionChange(allRowKeys);
    } else {
      onRowSelectionChange([]);
    }
  };

  const handleRowSelect = (rowKey: string | number, checked: boolean) => {
    if (!selectable || !onRowSelectionChange) return;
    
    if (checked) {
      onRowSelectionChange([...selectedRows, rowKey]);
    } else {
      onRowSelectionChange(selectedRows.filter(key => key !== rowKey));
    }
  };

  // Sorting handler
  const handleSort = (columnKey: string) => {
    if (!onSortChange) return;
    
    if (sortBy === columnKey) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      onSortChange(columnKey, newDirection);
    } else {
      onSortChange(columnKey, 'asc');
    }
  };

  // Filter handler
  const handleFilterChange = (filterKey: string, value: unknown) => {
    const newFilters = { ...currentFilterValues, [filterKey]: value };
    setFilterValues(newFilters);
  };

  const tableClasses = cn(
    'w-full border-collapse',
    tableSizeClasses[size],
    bordered && 'border border-gray-200',
    className
  );

  const renderHeader = () => (
    <thead className="bg-gray-50">
      <tr>
        {selectable && (
          <th className={cn(
            'border-b border-gray-200 bg-gray-50',
            cellPaddingClasses[size],
            focusRingClasses
          )}>
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => handleSelectAll(e.target.checked)}
              aria-label="Select all rows"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              'border-b border-gray-200 bg-gray-50 font-medium text-gray-900',
              cellPaddingClasses[size],
              column.align === 'center' && 'text-center',
              column.align === 'right' && 'text-right',
              column.sticky === 'left' && 'sticky left-0 z-10',
              column.sticky === 'right' && 'sticky right-0 z-10'
            )}
            style={{ 
              width: column.width,
              minWidth: column.minWidth 
            }}
          >
            {column.sortable ? (
              <button
                type="button"
                className={cn(
                  'flex items-center justify-between w-full hover:text-gray-700',
                  'transition-colors duration-200',
                  focusRingClasses
                )}
                onClick={() => handleSort(column.key)}
              >
                <span>{column.renderHeader ? column.renderHeader() : column.label}</span>
                <Icon
                  name="ArrowUpDown"
                  size="sm"
                  className={cn(
                    'ml-2 opacity-50',
                    sortBy === column.key && 'opacity-100',
                    sortBy === column.key && sortDirection === 'desc' && 'rotate-180'
                  )}
                />
              </button>
            ) : (
              <span>{column.renderHeader ? column.renderHeader() : column.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderRow = (row: T, index: number) => {
    const rowKeyValue = row[rowKey];
    const isSelected = typeof rowKeyValue === 'string' || typeof rowKeyValue === 'number' 
      ? selectedRows.includes(rowKeyValue) 
      : false;
    const rowProps = getRowProps?.(row, index) || {};

    return (
      <tr
        key={String(rowKeyValue)}
        className={cn(
          striped && index % 2 === 0 && 'bg-gray-50',
          hoverable && 'hover:bg-gray-50',
          isSelected && 'bg-blue-50',
          transitionClasses
        )}
        {...rowProps}
      >
        {selectable && (
          <td className={cn(
            'border-b border-gray-200',
            cellPaddingClasses[size]
          )}>
            <Checkbox
              checked={isSelected}
              onChange={(e) => {
                if (typeof rowKeyValue === 'string' || typeof rowKeyValue === 'number') {
                  handleRowSelect(rowKeyValue, e.target.checked);
                }
              }}
              aria-label={`Select row ${index + 1}`}
            />
          </td>
        )}
        {columns.map((column) => {
          const cellValue = row[column.key];
          const cellProps = getCellProps?.(column, row, index) || {};
          
          return (
            <td
              key={column.key}
              className={cn(
                'border-b border-gray-200',
                cellPaddingClasses[size],
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right',
                column.sticky === 'left' && 'sticky left-0 z-10 bg-white',
                column.sticky === 'right' && 'sticky right-0 z-10 bg-white'
              )}
              {...cellProps}
            >
              {column.render ? column.render(cellValue, row, index) : String(cellValue)}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderEmptyState = () => (
    <tr>
      <td
        colSpan={columns.length + (selectable ? 1 : 0)}
        className={cn(
          'text-center text-gray-500 border-b border-gray-200',
          cellPaddingClasses[size]
        )}
      >
        <div className="py-8">
          <Icon name="Search" size="lg" className="mx-auto mb-4 opacity-50" />
          <Text>{emptyMessage}</Text>
        </div>
      </td>
    </tr>
  );

  const renderLoadingState = () => (
    <tr>
      <td
        colSpan={columns.length + (selectable ? 1 : 0)}
        className={cn(
          'text-center border-b border-gray-200',
          cellPaddingClasses[size]
        )}
      >
        <div className="py-8 flex items-center justify-center space-x-2">
          <Spinner size={size} />
          <Text>{loadingText}</Text>
        </div>
      </td>
    </tr>
  );

  const renderToolbar = () => {
    if (!showSearch && !showFilters) return null;

    return (
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {showSearch && (
          <div className="flex-1 max-w-sm">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={currentSearchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leftIcon={<Icon name="Search" size="sm" />}
            />
          </div>
        )}
        
        {showFilters && filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <div key={filter.key} className="flex items-center space-x-2">
                <Text className="text-sm font-medium">{filter.label}:</Text>
                {filter.type === 'select' ? (
                  <select
                    value={String(currentFilterValues[filter.key] || '')}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  >
                    <option value="">All</option>
                    {filter.options?.map((option) => (
                      <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={filter.type === 'date' ? 'text' : filter.type as 'text' | 'number'}
                    size="sm"
                    value={String(currentFilterValues[filter.key] || '')}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-32"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPagination = () => {
    if (!showPagination || calculatedTotalItems <= pageSize) return null;

    return (
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Text className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {calculatedTotalItems} results
          </Text>
          {onPageSizeChange && (
            <div className="flex items-center space-x-2">
              <Text className="text-sm">Show:</Text>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size}
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full" data-test-id={testId}>
      {renderToolbar()}
      
      <div className="overflow-x-auto">
        <table className={tableClasses}>
          {caption && <caption className="sr-only">{caption}</caption>}
          {renderHeader()}
          <tbody>
            {loading ? (
              renderLoadingState()
            ) : data.length === 0 ? (
              renderEmptyState()
            ) : (
              data.map((row, index) => renderRow(row, index))
            )}
          </tbody>
        </table>
      </div>
      
      {renderPagination()}
    </div>
  );
};

DataTable.displayName = 'DataTable';