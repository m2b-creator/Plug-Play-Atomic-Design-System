import type { ReactNode } from 'react';
import { Link, Text, Heading } from '../atoms';
import { Card } from '../molecules';
import type { ComponentSize } from '@/types';
import { cn } from '@/utils';

export interface AuthTemplateProps {
  /** Main form content */
  children: ReactNode;
  /** Page title */
  title: string;
  /** Page subtitle or description */
  subtitle?: string;
  /** Brand logo or name */
  brand?: ReactNode;
  /** Background variant */
  background?: 'white' | 'gray' | 'gradient' | 'image';
  /** Background image URL (when background is 'image') */
  backgroundImage?: string;
  /** Whether to show background overlay (for image background) */
  backgroundOverlay?: boolean;
  /** Form card variant */
  cardVariant?: 'elevated' | 'bordered' | 'minimal';
  /** Form width */
  formWidth?: 'sm' | 'md' | 'lg';
  /** Footer content (typically links like "Don't have an account?") */
  footer?: ReactNode;
  /** Additional links (privacy policy, terms, etc.) */
  links?: Array<{
    text: string;
    href: string;
    external?: boolean;
  }>;
  /** Layout size variant */
  size?: ComponentSize;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for automated testing */
  'data-test-id'?: string;
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  image: 'bg-cover bg-center bg-no-repeat',
};

const cardVariantClasses = {
  elevated: 'shadow-xl border border-gray-200',
  bordered: 'border border-gray-300',
  minimal: 'shadow-sm',
};

const formWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const AuthTemplate = ({
  children,
  title,
  subtitle,
  brand,
  background = 'gray',
  backgroundImage,
  backgroundOverlay = true,
  cardVariant = 'elevated',
  formWidth = 'md',
  footer,
  links = [],
  className,
  'data-test-id': testId,
}: AuthTemplateProps) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8',
    backgroundClasses[background],
    className
  );

  const cardClasses = cn(
    'w-full p-8 bg-white rounded-lg',
    cardVariantClasses[cardVariant],
    formWidthClasses[formWidth]
  );

  const renderBrand = () => {
    if (!brand) return null;

    return (
      <div className="text-center mb-8">
        {typeof brand === 'string' ? (
          <Link href="/" className="inline-block">
            <Heading as="h1" variant="h4" className="text-gray-900 font-bold">
              {brand}
            </Heading>
          </Link>
        ) : (
          <div className="flex justify-center mb-4">
            {brand}
          </div>
        )}
      </div>
    );
  };

  const renderHeader = () => (
    <div className="text-center mb-8">
      <Heading as="h2" variant="h3" className="text-gray-900 mb-2">
        {title}
      </Heading>
      {subtitle && (
        <Text className="text-gray-600">
          {subtitle}
        </Text>
      )}
    </div>
  );

  const renderFooter = () => {
    if (!footer && !links.length) return null;

    return (
      <div className="mt-8 space-y-4">
        {footer && (
          <div className="text-center text-sm text-gray-600">
            {footer}
          </div>
        )}
        
        {links.length > 0 && (
          <div className="text-center space-y-2">
            {links.map((link, index) => (
              <div key={index}>
                <Link
                  href={link.href}
                  external={link.external}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const content = (
    <div className="mx-auto w-full" style={{ maxWidth: '28rem' }}>
      <Card className={cardClasses}>
        {renderBrand()}
        {renderHeader()}
        {children}
        {renderFooter()}
      </Card>
    </div>
  );

  if (background === 'image' && backgroundImage) {
    return (
      <div
        className={containerClasses}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        data-test-id={testId}
      >
        {backgroundOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        )}
        <div className="relative z-10">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} data-test-id={testId}>
      {content}
    </div>
  );
};

AuthTemplate.displayName = 'AuthTemplate';