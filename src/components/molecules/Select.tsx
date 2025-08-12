'use client';

import React, { ReactNode } from 'react';
import { useState, useRef } from 'react';
import { Icon } from '../atoms';
import { Dropdown } from './Dropdown';
import { MenuItem } from './MenuItem';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses, transitionClasses } from '@/utils';

export interface SelectOption {
  /** The value of the option */
  value: string;
  /** The display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional description */
  description?: string;
}

export interface SelectProps {
  /** Array of select options */
  options: SelectOption[];
  /** Currently selected value(s) */
  value?: string | string[];
  /** Default selected value(s) for uncontrolled component */
  defaultValue?: string | string[];
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Size of the select */
  size?: ComponentSize;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select has an error state */
  error?: boolean;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const selectSizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
};

export const Select = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  size = 'md',
  disabled = false,
  error = false,
  multiple = false,
  searchable = false,
  className,
  'data-test-id': testId,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState(() => {
    if (multiple) {
      return Array.isArray(defaultValue) ? defaultValue : (defaultValue ? [defaultValue] : []);
    }
    return Array.isArray(defaultValue) ? defaultValue[0] || '' : (defaultValue || '');
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard navigation for multiple selection
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!multiple || !isOpen) return;
    
    if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'Enter' && event.target instanceof HTMLElement) {
      const menuItem = event.target.closest('[role="option"]');
      if (menuItem) {
        const optionValue = menuItem.getAttribute('data-value');
        if (optionValue) {
          handleSelect(optionValue);
        }
      }
    }
  };

  // Use controlled or uncontrolled value
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : (selectedValue ? [selectedValue] : []);
      const isSelected = currentValues.includes(optionValue);
      
      const newValue = isSelected
        ? currentValues.filter(value => value !== optionValue)
        : [...currentValues, optionValue];
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
      // Don't close dropdown for multiple selection
      setSearchTerm('');
    } else {
      const newValue = optionValue;
      
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      
      onChange?.(newValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Find selected option(s)
  const selectedValues = Array.isArray(selectedValue) ? selectedValue : (selectedValue ? [selectedValue] : []);
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));
  const selectedOption = multiple ? null : options.find(option => option.value === selectedValue);

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const baseClasses = cn(
    'w-full flex items-center justify-between',
    'bg-white border rounded-md shadow-sm',
    'text-left cursor-default',
    focusRingClasses,
    transitionClasses,
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50'
  );

  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  const triggerClasses = cn(
    baseClasses,
    stateClasses,
    selectSizeClasses[size],
    className
  );

  const renderTrigger = () => (
    <button
      ref={triggerRef}
      type="button"
      className={triggerClasses}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      data-test-id={testId}
      onKeyDown={handleKeyDown}
    >
      <span className="flex items-center min-w-0 flex-1">
        {multiple ? (
          selectedOptions.length > 0 ? (
            <span className="truncate">
              {selectedOptions.length === 1 
                ? selectedOptions[0].label
                : selectedOptions.length <= 3
                  ? selectedOptions.map(opt => opt.label).join(', ')
                  : `${selectedOptions.length} items selected`
              }
            </span>
          ) : (
            <span className="truncate text-gray-500">{placeholder}</span>
          )
        ) : (
          <>
            {selectedOption?.icon && (
              <span className="flex-shrink-0 mr-2">
                {selectedOption.icon}
              </span>
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </>
        )}
      </span>
      <Icon
        name="ChevronDown"
        size="sm"
        className={cn(
          'flex-shrink-0 ml-2 text-gray-400 transition-transform',
          isOpen && 'transform rotate-180'
        )}
      />
    </button>
  );

  const renderOptions = () => (
    <div className="py-1 max-h-60 overflow-auto">
      {searchable && (
        <div className="px-2 pb-2">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      )}
      
      {filteredOptions.length === 0 ? (
        <div className="px-3 py-2 text-sm text-gray-500">
          {searchTerm ? 'No options found' : 'No options available'}
        </div>
      ) : (
        filteredOptions.map((option) => (
          <MenuItem
            key={option.value}
            size={size}
            disabled={option.disabled}
            selected={selectedValues.includes(option.value)}
            leftIcon={option.icon}
            rightIcon={multiple && selectedValues.includes(option.value) ? <Icon name="Check" size="sm" /> : undefined}
            description={option.description}
            onClick={() => !option.disabled && handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))
      )}
    </div>
  );

  return (
    <Dropdown
      trigger={renderTrigger()}
      open={isOpen}
      onOpenChange={setIsOpen}
      closeOnClickOutside={true}
      closeOnItemClick={!multiple}
      className="min-w-full"
    >
      {renderOptions()}
    </Dropdown>
  );
};

Select.displayName = 'Select';