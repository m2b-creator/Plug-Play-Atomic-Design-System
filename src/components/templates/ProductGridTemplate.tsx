import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Icon, Text, Heading, Badge } from '../atoms';
import { Card, SearchBar, Select, Pagination } from '../molecules';
import { Header, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface Product {
  /** Product ID */
  id: string;
  /** Product name */
  name: string;
  /** Product description */
  description?: string;
  /** Product price */
  price: number;
  /** Original price (for sale items) */
  originalPrice?: number;
  /** Product image */
  image: string;
  /** Additional product images */
  images?: string[];
  /** Product category */
  category?: string;
  /** Product brand */
  brand?: string;
  /** Product rating (1-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Whether product is on sale */
  onSale?: boolean;
  /** Sale badge text */
  saleText?: string;
  /** Whether product is in stock */
  inStock?: boolean;
  /** Product URL */
  href: string;
  /** Product tags */
  tags?: string[];
}

export interface FilterOption {
  /** Filter key */
  key: string;
  /** Filter label */
  label: string;
  /** Filter type */
  type: 'select' | 'checkbox' | 'range' | 'color';
  /** Filter options */
  options?: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
  /** Range options (for range type) */
  range?: {
    min: number;
    max: number;
    step?: number;
  };
}

export interface ProductGridTemplateProps {
  /** Products to display */
  products: Product[];
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Header configuration */
  header?: {
    logo?: ReactNode;
    navigation?: NavigationItem[];
    user?: {
      name: string;
      email?: string;
      avatar?: string;
    };
    userMenuActions?: UserMenuAction[];
    actions?: ReactNode;
    size?: ComponentSize;
  };
  /** Filter options */
  filters?: FilterOption[];
  /** Sort options */
  sortOptions?: Array<{
    value: string;
    label: string;
  }>;
  /** Current search query */
  searchQuery?: string;
  /** Search callback */
  onSearch?: (query: string) => void;
  /** Filter callback */
  onFilter?: (filters: Record<string, unknown>) => void;
  /** Sort callback */
  onSort?: (sortBy: string) => void;
  /** Product click callback */
  onProductClick?: (product: Product) => void;
  /** Add to cart callback */
  onAddToCart?: (product: Product) => void;
  /** Add to wishlist callback */
  onAddToWishlist?: (product: Product) => void;
  /** Pagination configuration */
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  };
  /** Grid layout options */
  gridColumns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Whether to show filters sidebar */
  showFilters?: boolean;
  /** Layout variant */
  variant?: 'grid' | 'list' | 'compact';
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    copyright?: string;
  };
  /** Layout size */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const gridColumnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const defaultSortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest' },
];

export const ProductGridTemplate = ({
  products,
  title = 'Products',
  description,
  header,
  filters = [],
  sortOptions = defaultSortOptions,
  searchQuery = '',
  onSearch,
  onFilter,
  onSort,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  pagination,
  gridColumns = { sm: 1, md: 2, lg: 3, xl: 4 },
  showFilters = true,
  variant = 'grid',
  footer,
  size = 'md',
  className,
  'data-test-id': testId,
}: ProductGridTemplateProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, unknown>>({});
  const [currentSort, setCurrentSort] = useState(sortOptions[0]?.value || '');

  const containerClasses = cn(
    'min-h-screen flex flex-col bg-white',
    className
  );

  const gridClasses = cn(
    'grid gap-6',
    `sm:${gridColumnClasses[gridColumns.sm || 1]}`,
    `md:${gridColumnClasses[gridColumns.md || 2]}`,
    `lg:${gridColumnClasses[gridColumns.lg || 3]}`,
    `xl:${gridColumnClasses[gridColumns.xl || 4]}`
  );

  const handleFilterChange = (filterKey: string, value: unknown) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleSortChange = (sortValue: string) => {
    setCurrentSort(sortValue);
    onSort?.(sortValue);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderHeader = () => {
    if (!header) return null;

    return (
      <Header
        {...header}
        size={header.size || size}
        sticky={true}
      />
    );
  };

  const renderPageHeader = () => (
    <div className="mb-8">
      <Heading as="h1" variant="h2" className="mb-4">
        {title}
      </Heading>
      {description && (
        <Text className="text-lg text-gray-600">
          {description}
        </Text>
      )}
    </div>
  );

  const renderSearchAndSort = () => (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      {/* Search */}
      <div className="w-full lg:w-96">
        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onSearch={onSearch}
          size={size}
        />
      </div>

      {/* Sort and Results Count */}
      <div className="flex items-center gap-4">
        {pagination && (
          <Text className="text-sm text-gray-600 whitespace-nowrap">
            {pagination.totalItems} results
          </Text>
        )}
        
        <Select
          options={sortOptions.map(opt => ({ value: opt.value, label: opt.label }))}
          value={currentSort}
          onChange={handleSortChange}
          placeholder="Sort by"
          size={size}
        />
      </div>
    </div>
  );

  const renderFilters = () => {
    if (!showFilters || !filters.length) return null;

    return (
      <aside className="w-full lg:w-64 lg:flex-shrink-0 mb-8 lg:mb-0">
        <div className="lg:sticky lg:top-24">
          <Card className="p-6">
            <Heading as="h3" variant="h5" className="mb-6">
              Filters
            </Heading>
            
            <div className="space-y-6">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <Text className="font-medium mb-3">
                    {filter.label}
                  </Text>
                  
                  {filter.type === 'select' && filter.options && (
                    <Select
                      options={filter.options.map(opt => ({ 
                        value: opt.value, 
                        label: `${opt.label} ${opt.count ? `(${opt.count})` : ''}` 
                      }))}
                      value={activeFilters[filter.key] as string || ''}
                      onChange={(value) => handleFilterChange(filter.key, value)}
                      placeholder="Select..."
                      size="sm"
                    />
                  )}
                  
                  {filter.type === 'checkbox' && filter.options && (
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={Array.isArray(activeFilters[filter.key]) ? (activeFilters[filter.key] as string[]).includes(option.value) : false}
                            onChange={(e) => {
                              const current = (activeFilters[filter.key] as string[]) || [];
                              const newValue = e.target.checked
                                ? [...current, option.value]
                                : current.filter((v: string) => v !== option.value);
                              handleFilterChange(filter.key, newValue);
                            }}
                          />
                          <Text className="text-sm">
                            {option.label} {option.count && `(${option.count})`}
                          </Text>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {Object.keys(activeFilters).length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveFilters({});
                  onFilter?.({});
                }}
                className="w-full mt-6"
              >
                Clear Filters
              </Button>
            )}
          </Card>
        </div>
      </aside>
    );
  };

  const renderProduct = (product: Product) => (
    <Card key={product.id} className="overflow-hidden group cursor-pointer">
      <div 
        className="relative"
        onClick={() => onProductClick?.(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Sale Badge */}
        {product.onSale && (
          <Badge
            variant="danger"
            className="absolute top-2 left-2"
          >
            {product.saleText || 'Sale'}
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist?.(product);
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md"
        >
          <Icon name="Heart" size="sm" />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          {product.brand && (
            <Text className="text-sm text-gray-500 mb-1">
              {product.brand}
            </Text>
          )}
          <Heading
            as="h3"
            variant="h6"
            className="line-clamp-2 group-hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Heading>
        </div>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  className={i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}
                  size="xs"
                />
              ))}
            </div>
            {product.reviewCount && (
              <Text className="text-sm text-gray-500 ml-2">
                ({product.reviewCount})
              </Text>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Text className="text-lg font-semibold text-gray-900">
              {formatPrice(product.price)}
            </Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </div>
          
          {!product.inStock && (
            <Badge variant="secondary" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          disabled={!product.inStock}
          className="w-full"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );

  const renderProducts = () => {
    if (!products.length) {
      return (
        <div className="text-center py-12">
          <Icon name="Search" size="xl" className="mx-auto mb-4 text-gray-400 text-4xl" />
          <Heading as="h3" variant="h4" className="mb-2">
            No products found
          </Heading>
          <Text className="text-gray-600">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </Text>
        </div>
      );
    }

    if (variant === 'list') {
      return (
        <div className="space-y-6">
          {products.map(renderProduct)}
        </div>
      );
    }

    return (
      <div className={gridClasses}>
        {products.map(renderProduct)}
      </div>
    );
  };

  const renderPagination = () => {
    if (!pagination) return null;

    return (
      <div className="mt-12">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    return (
      <Footer
        {...footer}
        size={size}
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderHeader()}
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderPageHeader()}
          {renderSearchAndSort()}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {renderFilters()}
            
            <div className="flex-1 min-w-0">
              {renderProducts()}
              {renderPagination()}
            </div>
          </div>
        </div>
      </main>

      {renderFooter()}
    </div>
  );
};

ProductGridTemplate.displayName = 'ProductGridTemplate';