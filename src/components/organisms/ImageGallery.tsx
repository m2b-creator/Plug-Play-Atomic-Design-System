'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button, Icon, Text } from '../atoms';
import type { ComponentSize } from '@/types';
import { cn, focusRingClasses } from '@/utils';

export interface GalleryImage {
  /** Image identifier */
  id: string | number;
  /** Image source URL */
  src: string;
  /** Thumbnail source URL (optional, falls back to src) */
  thumbnailSrc?: string;
  /** Image alt text */
  alt: string;
  /** Image caption */
  caption?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
}

export interface ImageGalleryProps {
  /** Gallery images */
  images: GalleryImage[];
  /** Current selected image index */
  selectedIndex?: number;
  /** Callback when selected image changes */
  onSelectionChange?: (index: number) => void;
  /** Gallery layout */
  layout?: 'grid' | 'masonry' | 'carousel';
  /** Grid columns (for grid layout) */
  columns?: number;
  /** Responsive columns configuration */
  responsiveColumns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap between images */
  gap?: ComponentSize;
  /** Gallery size variant */
  size?: ComponentSize;
  /** Whether to show lightbox on image click */
  enableLightbox?: boolean;
  /** Whether to show thumbnails in lightbox */
  showThumbnails?: boolean;
  /** Whether to show image counter in lightbox */
  showCounter?: boolean;
  /** Whether to show captions */
  showCaptions?: boolean;
  /** Whether to enable keyboard navigation in lightbox */
  enableKeyboardNav?: boolean;
  /** Whether to enable infinite loop in lightbox */
  infiniteLoop?: boolean;
  /** Custom loading placeholder */
  loadingPlaceholder?: ReactNode;
  /** Custom error placeholder */
  errorPlaceholder?: ReactNode;
  /** Whether images should maintain aspect ratio */
  maintainAspectRatio?: boolean;
  /** Custom aspect ratio (width/height) */
  aspectRatio?: number;
  /** Whether to lazy load images */
  lazyLoad?: boolean;
  /** Custom image render function */
  renderImage?: (image: GalleryImage, index: number) => ReactNode;
  /** Custom thumbnail render function */
  renderThumbnail?: (image: GalleryImage, index: number) => ReactNode;
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

const gridColumns = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export const ImageGallery = ({
  images,
  selectedIndex,
  layout = 'grid',
  columns = 3,
  responsiveColumns = {},
  gap = 'md',
  enableLightbox = true,
  showThumbnails = true,
  showCounter = true,
  showCaptions = true,
  enableKeyboardNav = true,
  infiniteLoop = true,
  loadingPlaceholder,
  errorPlaceholder,
  maintainAspectRatio = true,
  aspectRatio = 1,
  lazyLoad = true,
  renderImage,
  className,
  'data-test-id': testId,
}: ImageGalleryProps) => {
  // const [currentIndex, setCurrentIndex] = useState(selectedIndex || 0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Use controlled or uncontrolled selection (for future use)
  // const activeIndex = selectedIndex !== undefined ? selectedIndex : currentIndex;
  // const setActiveIndex = (index: number) => {
  //   if (selectedIndex === undefined) {
  //     setCurrentIndex(index);
  //   }
  //   onSelectionChange?.(index);
  // };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen || !enableKeyboardNav) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex, enableKeyboardNav]);

  // Handle focus management for lightbox
  useEffect(() => {
    if (lightboxOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      
      // Focus the lightbox
      const focusableElements = lightboxRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements?.[0] as HTMLElement;
      firstFocusableElement?.focus();
    } else {
      // Return focus to previously focused element
      previouslyFocusedElement.current?.focus();
    }
  }, [lightboxOpen]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    if (infiniteLoop) {
      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (lightboxIndex > 0) {
      setLightboxIndex((prev) => prev - 1);
    }
  }, [lightboxIndex, images.length, infiniteLoop]);

  const goToNext = useCallback(() => {
    if (infiniteLoop) {
      setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (lightboxIndex < images.length - 1) {
      setLightboxIndex((prev) => prev + 1);
    }
  }, [lightboxIndex, images.length, infiniteLoop]);

  const handleImageLoad = (imageId: string | number) => {
    setImageLoadStates(prev => ({ ...prev, [String(imageId)]: 'loaded' as const }));
  };

  const handleImageError = (imageId: string | number) => {
    setImageLoadStates(prev => ({ ...prev, [String(imageId)]: 'error' as const }));
  };

  const canGoPrevious = () => infiniteLoop || lightboxIndex > 0;
  const canGoNext = () => infiniteLoop || lightboxIndex < images.length - 1;

  const getGridClasses = () => {
    const baseColumns = gridColumns[Math.min(columns, 6) as keyof typeof gridColumns] || 'grid-cols-3';
    
    const responsiveClasses = [
      responsiveColumns.sm && `sm:grid-cols-${responsiveColumns.sm}`,
      responsiveColumns.md && `md:grid-cols-${responsiveColumns.md}`,
      responsiveColumns.lg && `lg:grid-cols-${responsiveColumns.lg}`,
      responsiveColumns.xl && `xl:grid-cols-${responsiveColumns.xl}`,
    ].filter(Boolean).join(' ');

    return cn(baseColumns, responsiveClasses);
  };

  const renderImageItem = (image: GalleryImage, index: number) => {
    const loadState = imageLoadStates[image.id] || 'loading';
    const thumbnailSrc = image.thumbnailSrc || image.src;

    if (renderImage) {
      return renderImage(image, index);
    }

    return (
      <div
        className={cn(
          'relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100',
          'hover:shadow-lg transition-all duration-200',
          focusRingClasses,
          maintainAspectRatio && 'aspect-square'
        )}
        style={maintainAspectRatio ? { aspectRatio } : undefined}
        onClick={() => openLightbox(index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${image.alt}`}
      >
        {loadState === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {loadingPlaceholder || (
              <div className="animate-pulse bg-gray-200 w-full h-full" />
            )}
          </div>
        )}

        {loadState === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {errorPlaceholder || (
              <div className="text-gray-400 text-center">
                <Icon name="ImageOff" size="lg" className="mx-auto mb-2" />
                <Text>Failed to load</Text>
              </div>
            )}
          </div>
        )}

        <img
          src={thumbnailSrc}
          alt={image.alt}
          loading={lazyLoad ? 'lazy' : 'eager'}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300',
            'group-hover:scale-105',
            loadState !== 'loaded' && 'opacity-0'
          )}
          onLoad={() => handleImageLoad(image.id)}
          onError={() => handleImageError(image.id)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />

        {/* Caption */}
        {showCaptions && image.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <Text className="text-white text-sm line-clamp-2">
              {image.caption}
            </Text>
          </div>
        )}
      </div>
    );
  };

  const renderThumbnailStrip = () => {
    if (!showThumbnails) return null;

    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 max-w-xs overflow-x-auto">
          {images.map((image, index) => {
            const isActive = index === lightboxIndex;
            const thumbnailSrc = image.thumbnailSrc || image.src;

            return (
              <button
                key={image.id}
                type="button"
                className={cn(
                  'flex-shrink-0 w-12 h-12 rounded-md overflow-hidden transition-all duration-200',
                  'hover:ring-2 hover:ring-white/50',
                  isActive ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80',
                  focusRingClasses
                )}
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={thumbnailSrc}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLightbox = () => {
    if (!lightboxOpen) return null;

    const currentImage = images[lightboxIndex];
    
    const lightboxContent = (
      <div
        ref={lightboxRef}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-image"
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-30 text-white hover:bg-white/10"
          onClick={closeLightbox}
          aria-label="Close lightbox"
        >
          <Icon name="X" size="md" />
        </Button>

        {/* Counter */}
        {showCounter && (
          <div className="absolute top-4 left-4 z-30 text-white">
            <Text className="text-sm">
              {lightboxIndex + 1} of {images.length}
            </Text>
          </div>
        )}

        {/* Navigation arrows */}
        {canGoPrevious() && (
          <Button
            variant="ghost"
            size="lg"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size="lg" />
          </Button>
        )}

        {canGoNext() && (
          <Button
            variant="ghost"
            size="lg"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size="lg" />
          </Button>
        )}

        {/* Main image */}
        <div
          className="relative max-w-full max-h-full p-8 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            id="lightbox-image"
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          />
          
          {/* Caption in lightbox */}
          {currentImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <Text className="text-white text-center">
                {currentImage.caption}
              </Text>
            </div>
          )}
        </div>

        {renderThumbnailStrip()}
      </div>
    );

    return createPortal(lightboxContent, document.body);
  };

  const galleryClasses = cn(
    'w-full',
    layout === 'grid' && cn('grid', getGridClasses(), gapClasses[gap]),
    layout === 'masonry' && 'columns-3 gap-4', // Simplified masonry
    className
  );

  return (
    <div ref={galleryRef} className={galleryClasses} data-test-id={testId}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            layout === 'masonry' && 'break-inside-avoid mb-4'
          )}
        >
          {renderImageItem(image, index)}
        </div>
      ))}
      
      {renderLightbox()}
    </div>
  );
};

ImageGallery.displayName = 'ImageGallery';