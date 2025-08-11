import type { HTMLAttributes, ReactNode } from 'react';
import { Divider } from '../atoms';
import { cn, transitionClasses } from '@/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: 'elevated' | 'outlined' | 'filled';
  /** Card padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Whether to show dividers between sections */
  showDividers?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const cardVariantClasses = {
  elevated: 'bg-white border border-gray-200 shadow-md',
  outlined: 'bg-white border border-gray-300',
  filled: 'bg-gray-50 border border-gray-200',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const sectionPaddingClasses = {
  none: '',
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-6',
};

const sectionVerticalPaddingClasses = {
  none: '',
  sm: 'py-2',
  md: 'py-3',
  lg: 'py-4',
};

export const Card = ({
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  header,
  footer,
  showDividers = false,
  className,
  children,
  'data-test-id': testId,
  ...props
}: CardProps) => {
  const baseClasses = cn(
    'rounded-lg overflow-hidden',
    transitionClasses
  );

  const variantClasses = cardVariantClasses[variant];
  
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
    : '';

  const cardClasses = cn(
    baseClasses,
    variantClasses,
    interactiveClasses,
    className
  );

  const hasHeader = !!header;
  const hasFooter = !!footer;
  const hasContent = !!children;

  const renderHeader = () => {
    if (!hasHeader) return null;

    const headerPadding = padding === 'none' 
      ? '' 
      : cn(sectionPaddingClasses[padding], sectionVerticalPaddingClasses[padding]);

    return (
      <>
        <div className={cn('card-header', headerPadding)}>
          {header}
        </div>
        {showDividers && hasContent && <Divider />}
      </>
    );
  };

  const renderContent = () => {
    if (!hasContent) return null;

    const contentPadding = padding === 'none' 
      ? '' 
      : hasHeader || hasFooter 
        ? sectionPaddingClasses[padding] + ' py-4'
        : paddingClasses[padding];

    return (
      <div className={cn('card-body', contentPadding)}>
        {children}
      </div>
    );
  };

  const renderFooter = () => {
    if (!hasFooter) return null;

    const footerPadding = padding === 'none' 
      ? '' 
      : cn(sectionPaddingClasses[padding], sectionVerticalPaddingClasses[padding]);

    return (
      <>
        {showDividers && hasContent && <Divider />}
        <div className={cn('card-footer', footerPadding)}>
          {footer}
        </div>
      </>
    );
  };

  return (
    <div
      className={cardClasses}
      data-test-id={testId}
      {...props}
    >
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </div>
  );
};

Card.displayName = 'Card';