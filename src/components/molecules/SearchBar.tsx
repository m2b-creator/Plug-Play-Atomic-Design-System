import React, { InputHTMLAttributes, FormEvent } from 'react';
import { Button, Input, Icon } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the search bar */
  size?: ComponentSize;
  /** Search button variant */
  buttonVariant?: 'primary' | 'secondary' | 'ghost';
  /** Whether to show the search button */
  showButton?: boolean;
  /** Search button text */
  buttonText?: string;
  /** Whether search is loading */
  loading?: boolean;
  /** Callback when search is triggered */
  onSearch?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

export const SearchBar = ({
  size = 'md',
  buttonVariant = 'primary',
  showButton = true,
  buttonText = 'Search',
  loading = false,
  onSearch,
  placeholder = 'Search...',
  className,
  'data-test-id': testId,
  ...props
}: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get('search') as string;
    if (searchValue?.trim() && onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault(); // Prevent form submission if we handle it here
      const target = e.target as HTMLInputElement;
      if (target.value.trim()) {
        onSearch(target.value);
      }
    }
  };

  const containerClasses = cn(
    'flex items-center gap-2',
    className
  );

  return (
    <form
      className={containerClasses}
      onSubmit={handleSubmit}
      data-test-id={testId}
    >
      <div className="flex-1">
        <Input
          name="search"
          type="search"
          placeholder={placeholder}
          size={size}
          leftIcon={<Icon name="Search" size={size} />}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
      
      {showButton && (
        <Button
          type="submit"
          variant={buttonVariant}
          size={size}
          disabled={loading}
          leftIcon={loading ? <Icon name="Loader2" size={size} className="animate-spin" /> : undefined}
        >
          {loading ? 'Searching...' : buttonText}
        </Button>
      )}
    </form>
  );
};

SearchBar.displayName = 'SearchBar';