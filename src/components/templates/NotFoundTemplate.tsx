import type { ReactNode } from 'react';
import { Button, Icon, Text, Heading, Link } from '../atoms';
import { Card, SearchBar } from '../molecules';
import { Header, Footer } from '../organisms';
import type { NavigationItem, UserMenuAction, FooterSection, SocialLink } from '../organisms';
import type { ComponentSize, ButtonVariant } from '@/types';
import { cn } from '@/utils';

export interface NotFoundTemplateProps {
  /** Custom error title */
  title?: string;
  /** Custom error message */
  message?: string;
  /** Custom error code */
  errorCode?: string;
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
  /** Primary action button */
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Secondary action button */
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: ButtonVariant;
  };
  /** Suggested links */
  suggestions?: Array<{
    text: string;
    href: string;
    description?: string;
  }>;
  /** Search functionality */
  search?: {
    placeholder?: string;
    onSearch?: (query: string) => void;
  };
  /** Custom illustration or image */
  illustration?: ReactNode;
  /** Footer configuration */
  footer?: {
    brand?: ReactNode;
    description?: string;
    sections?: FooterSection[];
    socialLinks?: SocialLink[];
    copyright?: string;
  };
  /** Template variant */
  variant?: 'default' | 'minimal' | 'illustrated';
  /** Background variant */
  background?: 'white' | 'gray' | 'gradient';
  /** Layout size */
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
};

const defaultSuggestions = [
  { text: 'Home', href: '/', description: 'Return to the homepage' },
  { text: 'Products', href: '/products', description: 'Browse our products' },
  { text: 'Support', href: '/support', description: 'Get help from our team' },
  { text: 'Contact', href: '/contact', description: 'Reach out to us' },
];

export const NotFoundTemplate = ({
  title = 'Page Not Found',
  message = 'Sorry, we couldn\'t find the page you\'re looking for.',
  errorCode = '404',
  header,
  primaryAction = {
    text: 'Go Home',
    href: '/',
    variant: 'primary',
  },
  secondaryAction = {
    text: 'Go Back',
    onClick: () => window.history.back(),
    variant: 'outline',
  },
  suggestions = defaultSuggestions,
  search,
  illustration,
  footer,
  variant = 'default',
  background = 'gray',
  size = 'md',
  className,
  'data-test-id': testId,
}: NotFoundTemplateProps) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col',
    backgroundClasses[background],
    className
  );

  const renderHeader = () => {
    if (!header) return null;

    return (
      <Header
        {...header}
        size={header.size || size}
        sticky={false}
      />
    );
  };

  const renderDefaultIllustration = () => (
    <div className="text-gray-300">
      <Icon name="FileQuestion" size="xl" className="mx-auto text-6xl" />
    </div>
  );

  const renderErrorContent = () => {
    if (variant === 'minimal') {
      return (
        <div className="text-center max-w-md mx-auto">
          <Text className="text-6xl font-bold text-gray-400 mb-4">
            {errorCode}
          </Text>
          <Heading as="h1" variant="h3" className="mb-4">
            {title}
          </Heading>
          <Text className="text-gray-600 mb-8">
            {message}
          </Text>
          {renderActions()}
        </div>
      );
    }

    return (
      <div className="text-center max-w-2xl mx-auto">
        {/* Illustration */}
        <div className="mb-8">
          {illustration || renderDefaultIllustration()}
        </div>

        {/* Error Code */}
        <Text className="text-8xl font-bold text-gray-400 mb-4">
          {errorCode}
        </Text>

        {/* Title and Message */}
        <Heading as="h1" variant="h2" className="mb-4">
          {title}
        </Heading>
        <Text className="text-xl text-gray-600 mb-8 leading-relaxed">
          {message}
        </Text>

        {/* Search */}
        {search && (
          <div className="mb-8">
            <SearchBar
              placeholder={search.placeholder || 'Search for what you need...'}
              onSearch={search.onSearch}
              size="lg"
              className="max-w-md mx-auto"
            />
          </div>
        )}

        {/* Actions */}
        {renderActions()}

        {/* Suggestions */}
        {renderSuggestions()}
      </div>
    );
  };

  const renderActions = () => (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      {primaryAction && (
        primaryAction.href ? (
          <Link href={primaryAction.href}>
            <Button
              variant={primaryAction.variant || 'primary'}
              size="lg"
              className="px-8"
            >
              {primaryAction.text}
            </Button>
          </Link>
        ) : (
          <Button
            variant={primaryAction.variant || 'primary'}
            size="lg"
            onClick={primaryAction.onClick}
            className="px-8"
          >
            {primaryAction.text}
          </Button>
        )
      )}
      
      {secondaryAction && (
        secondaryAction.href ? (
          <Link href={secondaryAction.href}>
            <Button
              variant={secondaryAction.variant || 'outline'}
              size="lg"
              className="px-8"
            >
              {secondaryAction.text}
            </Button>
          </Link>
        ) : (
          <Button
            variant={secondaryAction.variant || 'outline'}
            size="lg"
            onClick={secondaryAction.onClick}
            className="px-8"
          >
            {secondaryAction.text}
          </Button>
        )
      )}
    </div>
  );

  const renderSuggestions = () => {
    if (!suggestions.length || variant === 'minimal') return null;

    return (
      <div className="max-w-4xl mx-auto">
        <Heading as="h2" variant="h4" className="text-center mb-8">
          Try one of these helpful links:
        </Heading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
              <Link
                href={suggestion.href}
                className="block text-gray-900 hover:text-blue-600 transition-colors"
              >
                <Text className="font-medium mb-2">
                  {suggestion.text}
                </Text>
                {suggestion.description && (
                  <Text className="text-sm text-gray-600">
                    {suggestion.description}
                  </Text>
                )}
              </Link>
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
        variant="minimal"
      />
    );
  };

  return (
    <div className={containerClasses} data-test-id={testId}>
      {renderHeader()}
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        {renderErrorContent()}
      </main>

      {renderFooter()}
    </div>
  );
};

NotFoundTemplate.displayName = 'NotFoundTemplate';