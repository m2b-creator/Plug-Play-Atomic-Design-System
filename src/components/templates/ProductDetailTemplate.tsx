import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Icon, Text, Heading, Badge, Avatar } from '../atoms';
import { Card, Breadcrumb } from '../molecules';
import type { BreadcrumbItem } from '../molecules';
import { Header, Footer, ImageGallery } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface ProductVariant {
  /** Variant ID */
  id: string;
  /** Variant name */
  name: string;
  /** Variant options (size, color, etc.) */
  options: Record<string, string>;
  /** Variant price */
  price: number;
  /** Original price */
  originalPrice?: number;
  /** Whether variant is in stock */
  inStock: boolean;
  /** Stock quantity */
  stockQuantity?: number;
  /** Variant images */
  images?: string[];
}

export interface ProductReview {
  /** Review ID */
  id: string;
  /** Reviewer information */
  reviewer: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  /** Review rating (1-5) */
  rating: number;
  /** Review title */
  title?: string;
  /** Review content */
  content: string;
  /** Review date */
  date: string;
  /** Review images */
  images?: string[];
  /** Whether review was helpful */
  helpful?: number;
}

export interface RelatedProduct {
  /** Product ID */
  id: string;
  /** Product name */
  name: string;
  /** Product price */
  price: number;
  /** Original price */
  originalPrice?: number;
  /** Product image */
  image: string;
  /** Product URL */
  href: string;
  /** Product rating */
  rating?: number;
  /** Whether on sale */
  onSale?: boolean;
}

export interface ProductDetailTemplateProps {
  /** Product information */
  product: {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    brand?: string;
    category?: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    images: string[];
    tags?: string[];
    features?: string[];
    specifications?: Record<string, string>;
    variants?: ProductVariant[];
    inStock: boolean;
    stockQuantity?: number;
  };
  /** Product reviews */
  reviews?: ProductReview[];
  /** Related products */
  relatedProducts?: RelatedProduct[];
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
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** Add to cart callback */
  onAddToCart?: (product: ProductDetailTemplateProps['product'], variant?: ProductVariant, quantity?: number) => void;
  /** Add to wishlist callback */
  onAddToWishlist?: (product: ProductDetailTemplateProps['product']) => void;
  /** Share callback */
  onShare?: (platform: string) => void;
  /** Write review callback */
  onWriteReview?: () => void;
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

export const ProductDetailTemplate = ({
  product,
  reviews = [],
  relatedProducts = [],
  header,
  breadcrumbs,
  onAddToCart,
  onAddToWishlist,
  onShare,
  onWriteReview,
  footer,
  size = 'md',
  className,
  'data-test-id': testId,
}: ProductDetailTemplateProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'specifications'>('description');

  const containerClasses = cn(
    'min-h-screen flex flex-col bg-white',
    className
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCurrentPrice = () => {
    return selectedVariant?.price || product.price;
  };

  const getCurrentOriginalPrice = () => {
    return selectedVariant?.originalPrice || product.originalPrice;
  };

  const isInStock = () => {
    return selectedVariant ? selectedVariant.inStock : product.inStock;
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

  const renderBreadcrumbs = () => {
    if (!breadcrumbs?.length) return null;

    return (
      <div className="py-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
    );
  };

  const renderProductImages = () => (
    <div className="lg:col-span-1">
      <ImageGallery
        images={product.images.map((src, index) => ({
          id: `${product.id}-image-${index}`,
          src,
          alt: `${product.name} - Image ${index + 1}`,
        }))}
        selectedIndex={selectedImageIndex}
        onSelectionChange={setSelectedImageIndex}
        aspectRatio={1}
        showThumbnails={true}
        className="sticky top-24"
      />
    </div>
  );

  const renderProductInfo = () => (
    <div className="lg:col-span-1 space-y-6">
      {/* Brand and Title */}
      <div>
        {product.brand && (
          <Text className="text-sm text-gray-500 mb-2">
            {product.brand}
          </Text>
        )}
        <Heading as="h1" variant="h2" className="mb-4">
          {product.name}
        </Heading>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size="sm"
                  className={i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <Text className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <Text className="text-2xl font-bold text-gray-900">
          {formatPrice(getCurrentPrice())}
        </Text>
        {getCurrentOriginalPrice() && getCurrentOriginalPrice()! > getCurrentPrice() && (
          <>
            <Text className="text-lg text-gray-500 line-through">
              {formatPrice(getCurrentOriginalPrice()!)}
            </Text>
            <Badge variant="danger">
              {Math.round((1 - getCurrentPrice() / getCurrentOriginalPrice()!) * 100)}% OFF
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <Text className="text-gray-600 leading-relaxed">
        {product.description}
      </Text>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-4">
          <Text className="font-medium">Options:</Text>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={cn(
                  'p-3 border rounded-md text-sm transition-all',
                  selectedVariant?.id === variant.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400',
                  !variant.inStock && 'opacity-50 cursor-not-allowed'
                )}
                disabled={!variant.inStock}
              >
                <div className="font-medium">{variant.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatPrice(variant.price)}
                </div>
                {!variant.inStock && (
                  <div className="text-xs text-red-500 mt-1">Out of stock</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center space-x-4">
        <Text className="font-medium">Quantity:</Text>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-50 transition-colors"
            disabled={quantity <= 1}
          >
            <Icon name="Minus" size="sm" />
          </button>
          <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-50 transition-colors"
          >
            <Icon name="Plus" size="sm" />
          </button>
        </div>
        {!isInStock() && (
          <Badge variant="secondary">Out of Stock</Badge>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onAddToCart?.(product, selectedVariant || undefined, quantity)}
          disabled={!isInStock()}
          className="w-full"
        >
          {isInStock() ? `Add to Cart - ${formatPrice(getCurrentPrice() * quantity)}` : 'Out of Stock'}
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => onAddToWishlist?.(product)}
            className="flex-1"
          >
            <Icon name="Heart" size="sm" className="mr-2" />
            Wishlist
          </Button>
          
          <Button
            variant="ghost"
            size="md"
            onClick={() => onShare?.('native')}
          >
            <Icon name="Share" size="sm" />
          </Button>
        </div>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div>
          <Text className="font-medium mb-3">Key Features:</Text>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Icon name="Check" size="sm" className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <Text className="text-sm text-gray-600">{feature}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderProductTabs = () => (
    <div className="mt-16">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'description', label: 'Description' },
            { id: 'reviews', label: `Reviews (${reviews.length})` },
            { id: 'specifications', label: 'Specifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'description' | 'reviews' | 'specifications')}
              className={cn(
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <Text className="text-gray-700 leading-relaxed">
              {product.longDescription || product.description}
            </Text>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Heading as="h3" variant="h4">
                Customer Reviews
              </Heading>
              <Button variant="outline" onClick={onWriteReview}>
                Write a Review
              </Button>
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          size="md"
                          fallback={review.reviewer.name.charAt(0)}
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <Text className="font-medium">
                              {review.reviewer.name}
                            </Text>
                            {review.reviewer.verified && (
                              <Badge variant="success" size="sm">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <Text className="text-sm text-gray-500">
                            {review.date}
                          </Text>
                        </div>
                      </div>
                      
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {review.title && (
                      <Heading as="h4" variant="h6" className="mb-2">
                        {review.title}
                      </Heading>
                    )}
                    
                    <Text className="text-gray-700 mb-4">
                      {review.content}
                    </Text>
                    
                    {review.helpful !== undefined && (
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                          <Icon name="ThumbsUp" size="sm" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Text className="text-gray-600">
                  No reviews yet. Be the first to review this product!
                </Text>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            {product.specifications && Object.keys(product.specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <Text className="font-medium text-gray-900">{key}</Text>
                    <Text className="text-gray-600">{value}</Text>
                  </div>
                ))}
              </div>
            ) : (
              <Text className="text-gray-600">
                No specifications available for this product.
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderRelatedProducts = () => {
    if (!relatedProducts.length) return null;

    return (
      <div className="mt-16">
        <Heading as="h3" variant="h4" className="mb-8">
          Related Products
        </Heading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden group">
              <div className="aspect-square relative">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {relatedProduct.onSale && (
                  <Badge variant="danger" className="absolute top-2 left-2">
                    Sale
                  </Badge>
                )}
              </div>
              
              <div className="p-4">
                <Heading as="h4" variant="h6" className="mb-2 line-clamp-2">
                  {relatedProduct.name}
                </Heading>
                
                <div className="flex items-center space-x-2">
                  <Text className="font-semibold">
                    {formatPrice(relatedProduct.price)}
                  </Text>
                  {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                    <Text className="text-sm text-gray-500 line-through">
                      {formatPrice(relatedProduct.originalPrice)}
                    </Text>
                  )}
                </div>
                
                {relatedProduct.rating && (
                  <div className="flex text-yellow-400 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={i < Math.floor(relatedProduct.rating!) ? 'text-yellow-400' : 'text-gray-300'}
                        size="xs"
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
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
          {renderBreadcrumbs()}
          
          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {renderProductImages()}
            {renderProductInfo()}
          </div>

          {/* Product Details Tabs */}
          {renderProductTabs()}
          
          {/* Related Products */}
          {renderRelatedProducts()}
        </div>
      </main>

      {renderFooter()}
    </div>
  );
};

ProductDetailTemplate.displayName = 'ProductDetailTemplate';